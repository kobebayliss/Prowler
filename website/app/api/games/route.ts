import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    try {
        const game = await prisma.games.findUnique({
            where: { game_id: parseInt(id, 10) },
            include: {
                game_genre: {
                    include: {
                        genres: true,
                    },
                },
            },
        });

        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        const formattedGame = {
            ...game,
            genres: game.game_genre.map((gg) => gg.genres.genre),
        };

        return NextResponse.json(formattedGame);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
