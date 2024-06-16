import { Client } from 'pg';

export default async function handler(req, res) {
    const db = new Client({
        user: 'default',
        host: 'ep-hidden-night-a7qy5ttw-pooler.ap-southeast-2.aws.neon.tech',
        database: 'verceldb',
        password: '7vnKeSWk3yog',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await db.connect();
        const result = await db.query("SELECT * FROM games");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Database connection failed:', err.stack);
        res.status(500).json({ error: 'Server Error' });
    } finally {
        await db.end();
    }
}