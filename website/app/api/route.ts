import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const games = await prisma.games.findMany();
        return NextResponse.json(games);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}