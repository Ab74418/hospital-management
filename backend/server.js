console.log("SERVER FILE RUNNING");
import express from 'express';
import cors from 'cors';

import db from './config/db.js';
import medicalRoutes from './routes/medicalRecords.js';

import patientsRoutes from './routes/patients.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientsRoutes);
app.use("/medical-records", medicalRoutes);

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});