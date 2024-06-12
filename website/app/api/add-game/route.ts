import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameName = searchParams.get('gameName');
  const steamOnSale = searchParams.get('steamOnSale');
  const steamPrice = searchParams.get('steamPrice');
  const steamNormalPrice = searchParams.get('steamNormalPrice');
  const epicOnSale = searchParams.get('epicOnSale');
  const epicPrice = searchParams.get('epicPrice');
  const epicNormalPrice = searchParams.get('epicNormalPrice');
  const gameDeveloper = searchParams.get('gameDeveloper');
  const gameDescription = searchParams.get('gameDescription');
  const gameImage = searchParams.get('gameImage');

  try {
    if (!gameName || !steamOnSale || !steamPrice || !steamNormalPrice || !epicOnSale || !epicPrice || !epicNormalPrice || !gameDeveloper || !gameDescription || !gameImage) {
      throw new Error('All game fields are required');
    }

    await sql`
      INSERT INTO games (
        game_name, 
        steam_on_sale, 
        steam_price, 
        steam_normal_price, 
        epic_on_sale, 
        epic_price, 
        epic_normal_price, 
        game_developer, 
        game_description, 
        game_image
      ) VALUES (
        ${gameName}, 
        ${steamOnSale}, 
        ${steamPrice}, 
        ${steamNormalPrice}, 
        ${epicOnSale}, 
        ${epicPrice}, 
        ${epicNormalPrice}, 
        ${gameDeveloper}, 
        ${gameDescription}, 
        ${gameImage}
      );
    `;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const games = await sql`SELECT * FROM games;`;
  return NextResponse.json({ games }, { status: 200 });
}
