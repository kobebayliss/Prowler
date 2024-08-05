import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Reset the auto-increment value for the 'games' table
    await sql`SELECT SETVAL(pg_get_serial_sequence('games', 'game_id'), 1, false);`;

    // Reset the auto-increment value for the 'genres' table
    await sql`SELECT SETVAL(pg_get_serial_sequence('genres', 'genre_id'), 1, false);`;

    // Reset the auto-increment value for the 'game_genre' table
    await sql`SELECT SETVAL(pg_get_serial_sequence('game_genre', 'id'), 1, false);`;

    return NextResponse.json({ message: 'Auto-increment values reset successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
