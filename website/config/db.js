import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2WS8YL8hqh988NxaPVP2iufPv",
    database: "prowler_games",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection is failed: " + err.stack);
        return;
    }
    console.log("Connected to the database.");
});

export default db;