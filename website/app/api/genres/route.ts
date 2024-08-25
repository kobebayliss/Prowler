import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const genres = await prisma.genres.findMany();
        return NextResponse.json(genres);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
    }
}
