import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber') || '0', 10);
    const itemsPerPage = 48;
    const discountParam = url.searchParams.get('discount');
    const discount = discountParam === 'true';
    const genresParam = url.searchParams.get('genres') || '';
    const genreArray = genresParam.split(',').filter(Boolean);

    const whereClause: any = {};

    if (discount) {
        whereClause.OR = [
            { steam_on_sale: "1" },
            { epic_on_sale: "1" },
        ];
    }

    if (genreArray.length > 0) {
        whereClause.game_genre = {
            some: {
                genres: {
                    genre: {
                        in: genreArray,
                    },
                },
            },
        };
    }

    try {
        const games = await prisma.games.findMany({
            where: whereClause,
            skip: (pageNumber - 1) * itemsPerPage,
            take: itemsPerPage,
            include: {
                game_genre: {
                    include: {
                        genres: true,
                    },
                },
            },
        });

        const totalResults = await prisma.games.count({
            where: whereClause,
        });

        return NextResponse.json({ games, totalResults });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
