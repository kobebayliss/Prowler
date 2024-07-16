import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const totalResults = await prisma.games.count();
        const url = new URL(req.url);
        const pageNumber = parseInt(url.searchParams.get('pageNumber') || '0', 10);

        if (isNaN(pageNumber) || pageNumber < 1) {
            return NextResponse.json({ error: 'Invalid page number' }, { status: 400 });
        }

        const games = await prisma.games.findMany({
            take: 30,
            skip: 30 * (pageNumber-1),
        });

        return NextResponse.json({ games: games, totalResults });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
