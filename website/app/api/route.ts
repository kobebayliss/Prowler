import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    // Assigning variables to each of the values passed through api request on browse page, also splitting some into lists
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
    // Set orderBy based on the value of 'order', using index for ordering ie 1 = popularity 2 = alphabetical etc.
    if (order === 1) {
        orderBy = { game_id: 'asc' };
    } else if (order === 2) {
        orderBy = { name: 'asc' };
    } else if (order === 3) {
        orderBy = { steam_price: 'asc' };
    } else if (order === 4) {
        orderBy = { steam_price: 'desc' };
    }

    // Apply discount filter if discount is true, checks if either 'steam_on_sale' or 'epic_on_sale' is set to "1" (being on sale)
    if (discount) {
        whereClause.OR = [
            { steam_on_sale: "1" },
            { epic_on_sale: "1" },
        ];
    }

    // If genreArray is not empty, then filters games by matching any genres in the 'genreArray'
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

    // Filters games by checking if the 'name' contains the search query, case-insensitive
    if (searchQuery) {
        whereClause.AND = whereClause.AND || [];
        whereClause.AND.push({
            name: {
                contains: searchQuery.toLowerCase(),
                mode: "insensitive"
            }
        });
    }

    // Apply price range filters if 'priceRangesArray' is not empty, each case corresponds to different price ranges, 
    // filtering based on 'steam_price' or 'epic_price'
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
        }).filter(Boolean); // Filter out null values
        whereClause.AND.push({ OR: priceConditions });
    }

    // Try to fetch games data from the database using the Prisma client
    // It applies filters, pagination, and sorting as defined above
    try {
        const games = await prisma.games.findMany({
            where: whereClause,
            // Paginating based on how many games I want per page (48 now)
            skip: (pageNumber - 1) * itemsPerPage,
            take: itemsPerPage,
            include: {
                game_genre: {
                    include: {
                        genres: true, // Include genres related to each game
                    },
                },
            },
            orderBy: orderBy, 
        });

        // Count total results for 'x Results' on browse page
        const totalResults = await prisma.games.count({
            where: whereClause,
        });
        // Return the games and total results as a JSON response
        return NextResponse.json({ games, totalResults });
    } catch (error) {
        // Log any errors that occur during the database operation
        console.error(error);
        return NextResponse.error();
    } finally {
        // Ensure the Prisma client disconnects after the query
        await prisma.$disconnect();
    }
}
