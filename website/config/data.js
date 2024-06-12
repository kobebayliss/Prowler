import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/games", (req, res) => {
    const sql = "SELECT * FROM games";
    db.query(sql)
        .then(data => res.json(data.rows))
        .catch(err => {
            console.error("Error ", err);
            res.status(500).json({ error: "Server Error" });
        });
});

app.listen(8081, () => {
    console.log("Listening via port 8081...");
});
