import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const pageNumber = parseInt(url.searchParams.get('pageNumber') || '1', 10);
    const itemsPerPage = 48;
    const searchQuery = url.searchParams.get('search');
    const discountParam = url.searchParams.get('discount');
    const discount = discountParam === 'true';
    const genresParam = url.searchParams.get('genres') || '';
    const genreArray = genresParam.split(',').filter(Boolean);
    const priceRangesParam = url.searchParams.get('priceranges') || "1, 2, 3, 4, 5";
    const priceRangesArray = priceRangesParam.split(',').map(Number);
    const order = parseInt(url.searchParams.get('order') || '0', 10);

    const whereClause: any = {};

    let orderBy: any = {};

    if (order === 1) {
        orderBy = { game_id: 'asc' };
    } else if (order === 2) {
        orderBy = { name: 'asc' };
    } else if (order === 3) {
        orderBy = { steam_price: 'asc' };
    } else if (order === 4) {
        orderBy = { steam_price: 'desc' };
    }

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

    if (searchQuery) {
        whereClause.AND = whereClause.AND || [];
        whereClause.AND.push({
            name: {
                contains: searchQuery.toLowerCase(),
                mode: "insensitive"
            }
        });
    }

    if (priceRangesArray.length > 0) {
        whereClause.AND = whereClause.AND || [];
        const priceConditions = priceRangesArray.map((range) => {
            switch (range) {
                case 1: return { OR: [{ steam_price: { gte: 0, lte: 15 } }, { epic_price: { gte: 0, lte: 15 } }] };
                case 2: return { OR: [{ steam_price: { gte: 15, lte: 40 } }, { epic_price: { gte: 15, lte: 40 } }] };
                case 3: return { OR: [{ steam_price: { gte: 40, lte: 70 } }, { epic_price: { gte: 40, lte: 70 } }] };
                case 4: return { OR: [{ steam_price: { gte: 70, lte: 100 } }, { epic_price: { gte: 70, lte: 100 } }] };
                case 5: return { OR: [{ steam_price: { gte: 100 } }, { epic_price: { gte: 100 } }] };
                default: return null;
            }
        }).filter(Boolean);
        whereClause.AND.push({ OR: priceConditions });
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
            orderBy: orderBy, 
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
