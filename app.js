const path = require("path");

const express = require("express");
const pool = require("./db");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "welcome.html");
  res.sendFile(filePath);
});

app.get("/comment", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100) )"
    );
    res.send("DB Created");
  } catch (error) {
    res.status(500).send("Error occurs");
  }
});
app.listen(80);
