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
        const specializations = await prisma.specializations.findMany();

        res.json(specializations);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së specializations",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const specialization = await prisma.specializations.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!specialization) {
            return res.status(404).json({
                message: "Specialization nuk u gjet!",
            });
        }

        res.json(specialization);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së specialization",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { emri, pershkrimi } = req.body;

        const specialization = await prisma.specializations.create({
            data: {
                emri,
                pershkrimi,
            },
        });

        res.json(specialization);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë shtimit të specialization",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { emri, pershkrimi } = req.body;

        const updated = await prisma.specializations.update({
            where: {
                id: Number(id),
            },
            data: {
                emri,
                pershkrimi,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë editimit të specialization",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.specializations.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            message: "Specialization u fshi!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes së specialization",
            error: error.message,
        });
    }
});

export default router;