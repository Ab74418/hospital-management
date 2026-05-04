import "dotenv/config";
console.log("SERVER FILE RUNNING");

import express from 'express';
import cors from 'cors';

import db from './config/db.js';
import medicalRoutes from './routes/medicalRecords.js';
import patientsRoutes from './routes/patients.js';
import appointmentsRoutes from "./routes/appointments.js";
import roomsRoutes from "./routes/rooms.js";
import admissionsRoutes from "./routes/admissions.js";
import invoicesRoutes from "./routes/invoices.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/patients", patientsRoutes);
app.use("/medical-records", medicalRoutes);
app.use("/appointments", appointmentsRoutes); 
app.use("/api/rooms", roomsRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/invoices", invoicesRoutes);

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});