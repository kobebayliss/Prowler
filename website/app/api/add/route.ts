import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const newGenre = await prisma.genres.create({
            data: {
                genre: 'Free To Play'
            }
        });
        
        // Return a success response
        return NextResponse.json({ message: 'New genre added successfully', newGenre });
    } catch (error) {
        console.error(error);
        // Return an error response
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
