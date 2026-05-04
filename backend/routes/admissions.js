import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const admissions = await prisma.admissions.findMany({
            include: { patients: true, rooms: true, beds: true },
        });
        res.json(admissions);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë marrjes së pranimeve", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { patient_id, room_id, data_pranimit, data_lirimit, statusi, bed_id } = req.body;

        const admission = await prisma.admissions.create({
            data: {
                patient_id: patient_id ? Number(patient_id) : null,
                room_id: room_id ? Number(room_id) : null,
                data_pranimit: data_pranimit ? new Date(data_pranimit) : null,
                data_lirimit: data_lirimit ? new Date(data_lirimit) : null,
                statusi,
                bed_id: bed_id ? Number(bed_id) : null,
            },
        });

        res.status(201).json(admission);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë krijimit të pranimit", error: error.message });
    }
});

export default router;