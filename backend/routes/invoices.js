import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const invoices = await prisma.invoices.findMany({
            include: { patients: true, payments: true },
        });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë marrjes së faturave", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { patient_id, shuma, data, statusi, pershkrimi } = req.body;

        const invoice = await prisma.invoices.create({
            data: {
                patient_id: patient_id ? Number(patient_id) : null,
                shuma: shuma ? Number(shuma) : null,
                data: data ? new Date(data) : null,
                statusi,
                pershkrimi,
            },
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Gabim gjatë krijimit të faturës", error: error.message });
    }
});

export default router;