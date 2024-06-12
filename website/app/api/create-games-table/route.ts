import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE games (
        game_id SERIAL PRIMARY KEY,
        game_name varchar(100),
        steam_on_sale varchar(40),
        steam_price varchar(40),
        steam_normal_price varchar(40),
        epic_on_sale varchar(40),
        epic_price varchar(40),
        epic_normal_price varchar(40),
        game_developer varchar(100),
        game_description text,
        game_image varchar(300)
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
