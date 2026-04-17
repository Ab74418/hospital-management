console.log("SERVER FILE RUNNING");
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const medicalRoutes = require("./routes/medicalRecords");

const patientsRoutes = require("./routes/patients");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientsRoutes);
app.use("/api/medical-records", medicalRoutes);

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});