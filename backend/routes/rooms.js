import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const rooms = await prisma.rooms.findMany({
            include: { departments: true, beds: true, admissions: true },
        });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë marrjes së dhomave", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { numri_dhomes, department_id, lloji, statusi, kapaciteti } = req.body;

        const room = await prisma.rooms.create({
            data: {
                numri_dhomes,
                department_id: department_id ? Number(department_id) : null,
                lloji,
                statusi,
                kapaciteti: kapaciteti ? Number(kapaciteti) : null,
            },
        });

        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë krijimit të dhomës", error: error.message });
    }
});

export default router;