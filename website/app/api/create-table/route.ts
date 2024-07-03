import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE game_genre (
        id       SERIAL PRIMARY KEY,
        game_id  INT NOT NULL,
        genre_id INT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES games(game_id),
        FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
