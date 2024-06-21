import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const games = await prisma.games.findMany();
        return Response.json(games)
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}