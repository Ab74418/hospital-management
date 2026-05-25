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
        const schedules = await prisma.schedules.findMany({
            include: {
                doctors: true,
            },
        });

        res.json(schedules);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së schedules",
            error: error.message,
        });
    }
});

router.get("/doctor/:doctor_id", async (req, res) => {
    try {
        const { doctor_id } = req.params;

        const schedules = await prisma.schedules.findMany({
            where: {
                doctor_id: Number(doctor_id),
            },
            include: {
                doctors: true,
            },
        });

        res.json(schedules);
    } catch (error) {
        res.status(500).json({
            message: "Gabim",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { doctor_id, dita, ora_fillimit, ora_mbarimit } = req.body;

        const schedule = await prisma.schedules.create({
            data: {
                doctor_id: Number(doctor_id),
                dita,
                ora_fillimit: new Date(`1970-01-01T${ora_fillimit}`),
                ora_mbarimit: new Date(`1970-01-01T${ora_mbarimit}`),
            },
        });

        res.json(schedule);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë shtimit",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { doctor_id, dita, ora_fillimit, ora_mbarimit } = req.body;

        const updated = await prisma.schedules.update({
            where: {
                id: Number(id),
            },
            data: {
                doctor_id: Number(doctor_id),
                dita,
                ora_fillimit: new Date(`1970-01-01T${ora_fillimit}`),
                ora_mbarimit: new Date(`1970-01-01T${ora_mbarimit}`),
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë editimit",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.schedules.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({ message: "Schedule u fshi!" });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes",
            error: error.message,
        });
    }
});

export default router;