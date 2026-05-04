import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const data = await prisma.appointment.findMany({
            include: {
                patient: true,
                doctor: true
            }
        });

        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const { patient_id, doctor_id, data, ora, statusi, shenime } = req.body;

        const newAppointment = await prisma.appointment.create({
            data: {
                patient_id: Number(patient_id),
                doctor_id: Number(doctor_id),
                data: new Date(data),
                ora,
                statusi,
                shenime
            }
        });

        res.json(newAppointment);
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;