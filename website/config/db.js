import pkg from 'pg';
const { Client } = pkg;

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

db.connect()
    .then(() => console.log('Connected to the database.'))
    .catch(err => console.error('Database connection failed:', err.stack));

export default db;
