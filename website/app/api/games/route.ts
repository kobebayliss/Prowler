import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    // Extract the 'searchParams' from the request URL to get the query parameters.
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the 'id' parameter from the query.

    // Check if 'id' is provided in the request, return an error response if not.
    if (!id) {
        return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }

    try {
        // Query the database to find a game by its unique 'game_id'.
        // Also include the related 'game_genre' and 'genres' in the response.
        const game = await prisma.games.findUnique({
            where: { game_id: parseInt(id, 10) }, // Parse 'id' to an integer for the query.
            include: {
                game_genre: {
                    include: {
                        genres: true, // Include the genres related to the game.
                    },
                },
            },
        });

        // If no game is found, return a '404 Not Found' response.
        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        // Format the 'game' object to include a simplified 'genres' array.
        // Map over 'game_genre' to extract the 'genre' names.
        const formattedGame = {
            ...game,
            genres: game.game_genre.map(({ genres }) => genres.genre),
        };        

        // Return the formatted game data as a JSON response.
        return NextResponse.json(formattedGame);
    } catch (error) {
        // Log any errors that occur during the database query.
        console.error(error);
        return NextResponse.error(); // Return a generic error response.
    } finally {
        // Ensure the Prisma client disconnects after the query is complete.
        await prisma.$disconnect();
    }
}