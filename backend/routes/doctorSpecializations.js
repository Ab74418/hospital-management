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
    try {
        const data = await prisma.doctorSpecializations.findMany({
            include: {
                doctors: true,
                specializations: true,
            },
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së doctor specializations",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { doctor_id, specialization_id } = req.body;

        const exists = await prisma.doctorSpecializations.findFirst({
            where: {
                doctor_id: Number(doctor_id),
                specialization_id: Number(specialization_id),
            },
        });

        if (exists) {
            return res.status(400).json({
                message: "Ky doktor e ka tashmë këtë specializim!",
            });
        }

        const created = await prisma.doctorSpecializations.create({
            data: {
                doctor_id: Number(doctor_id),
                specialization_id: Number(specialization_id),
            },
        });

        res.json(created);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë shtimit",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.doctorSpecializations.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({ message: "Doctor specialization u fshi!" });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes",
            error: error.message,
        });
    }
});

export default router;