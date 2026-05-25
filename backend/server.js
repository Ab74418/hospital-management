import "dotenv/config";
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("SERVER FILE RUNNING");
import express from "express";
import cors from "cors";

import db from "./config/db.js";

import patientsRoutes from "./routes/patients.js";
import medicalRoutes from "./routes/medicalRecords.js";
import appointmentsRoutes from "./routes/appointments.js";
import roomsRoutes from "./routes/rooms.js";
import admissionsRoutes from "./routes/admissions.js";
import invoicesRoutes from "./routes/invoices.js";
import paymentsRoutes from "./routes/payments.js";
import prescriptionRoutes from "./routes/prescriptions.js";
import authRoutes from "./routes/auth.js";
import allergiesRoutes from "./routes/allergies.js";
import vitalsRoutes from "./routes/vitals.js";
import doctorsRoutes from "./routes/doctors.js";
import departmentsRoutes from "./routes/departments.js";
import schedulesRoutes from "./routes/schedules.js";
import specializationsRoutes from "./routes/specializations.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/patients", patientsRoutes);
app.use("/api/medical-records", medicalRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/invoices", invoicesRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/allergies", allergiesRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/schedules", schedulesRoutes);
app.use("/api/specializations", specializationsRoutes);

app.get("/", (req, res) => {
    res.send("API is working");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});