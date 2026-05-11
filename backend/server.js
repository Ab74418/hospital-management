import "dotenv/config";
<<<<<<< HEAD
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("SERVER FILE RUNNING");
=======
import express from "express";
import cors from "cors";
>>>>>>> 807a199fa289bdff42b4632e950f7dd03a806dff

import db from "./config/db.js";

import patientsRoutes from "./routes/patients.js";
import medicalRoutes from "./routes/medicalRecords.js";
import appointmentsRoutes from "./routes/appointments.js";
import roomsRoutes from "./routes/rooms.js";
import admissionsRoutes from "./routes/admissions.js";
<<<<<<< HEAD
import invoicesRoutes from "./routes/invoice.js";
import paymentsRoutes from "./routes/payments.js";
=======
import invoicesRoutes from "./routes/invoices.js";
import prescriptionRoutes from "./routes/prescriptions.js";
import authRoutes from "./routes/auth.js";
import allergiesRoutes from "./routes/allergies.js";
>>>>>>> 807a199fa289bdff42b4632e950f7dd03a806dff

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
807a199fa289bdff42b4632e950f7dd03a806dff

app.get("/", (req, res) => {
    res.send("API is working");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});