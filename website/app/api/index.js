const express = require("express");
const app = express();
const gamesHandler = require("./games");

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/api/games", gamesHandler);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;