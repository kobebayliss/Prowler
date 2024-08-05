// pages/api/genres.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const genres = await prisma.genres.findMany();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch genres" });
    }
}
