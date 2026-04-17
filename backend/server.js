console.log("SERVER FILE RUNNING");
const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});