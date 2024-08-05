import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const deletePosts = prisma.games.deleteMany();
        const deleteProfile = prisma.game_genre.deleteMany();
        const deleteUsers = prisma.genres.deleteMany();
        
        await prisma.$transaction([deleteProfile, deletePosts, deleteUsers]);
        
        // Return a success response
        return NextResponse.json({ message: 'All data deleted successfully' });
    } catch (error) {
        console.error(error);
        // Return an error response
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}
