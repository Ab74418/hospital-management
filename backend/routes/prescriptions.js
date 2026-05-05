import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const data = await prisma.prescriptions.findMany({
            include: {
                medicalrecords: true,
            },
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { medical_record_id, bari, dozimi, kohezgjatja, udhezime } = req.body;

        const prescription = await prisma.prescriptions.create({
            data: {
                medical_record_id: Number(medical_record_id),
                bari,
                dozimi,
                kohezgjatja,
                udhezime,
            },
        });

        res.json(prescription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const { medical_record_id, bari, dozimi, kohezgjatja, udhezime } = req.body;

        const updated = await prisma.prescriptions.update({
            where: { id: Number(req.params.id) },
            data: {
                medical_record_id: Number(medical_record_id),
                bari,
                dozimi,
                kohezgjatja,
                udhezime,
            },
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await prisma.prescriptions.delete({
            where: { id: Number(req.params.id) },
        });

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;