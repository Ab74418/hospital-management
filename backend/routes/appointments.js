import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mysql://root:@127.0.0.1:3306/hospital_management",
        },
    },
});

router.get("/", async (req, res) => {
    console.log("ROUTE APPOINTMENTS NEW CODE");
    try {
        const appointments = await prisma.appointments.findMany({
            include: {
                patients: true,
                doctors: true,
            },
        });

        res.json(appointments);
    } catch (error) {
        console.log("APPOINTMENTS ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë marrjes së appointments",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { patient_id, doctor_id, data, ora, statusi, shenime } = req.body;

        const appointment = await prisma.appointments.create({
            data: {
                patient_id: Number(patient_id),
                doctor_id: Number(doctor_id),
                data: new Date(data),
                ora: new Date(`1970-01-01T${ora}`),
                statusi,
                shenime,
            },
        });

        res.json(appointment);
    } catch (error) {
        console.log("POST APPOINTMENT ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë shtimit të appointment",
            error: error.message,
        });
    }
});

export default router;