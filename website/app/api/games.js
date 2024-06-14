import db from "../config/db";

export default function handler(req, res) {
    const sql = "SELECT * FROM games";
    db.query(sql)
        .then(data => res.json(data.rows))
        .catch(err => {
            console.error("Error ", err);
            res.status(500).json({ error: "Server Error" });
        });
}