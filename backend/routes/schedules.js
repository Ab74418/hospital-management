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

router.post("/", async (req, res) => {
    try {
        const { doctor_id, dita, ora_fillimit, ora_mbarimit } = req.body;

        const schedule = await prisma.schedules.create({
            data: {
                doctor_id: Number(doctor_id),
                dita: dita,
                ora_fillimit: ora_fillimit,
                ora_mbarimit: ora_mbarimit,
            },
        });

        res.json(schedule);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë shtimit të schedule",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { doctor_id, dita, ora_fillimit, ora_mbarimit } = req.body;

        const updatedSchedule = await prisma.schedules.update({
            where: {
                id: Number(id),
            },
            data: {
                doctor_id: Number(doctor_id),
                dita: dita,
                ora_fillimit: ora_fillimit,
                ora_mbarimit: ora_mbarimit,
            },
        });

        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë editimit të schedule",
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
            message: "Gabim gjatë fshirjes së schedule",
            error: error.message,
        });
    }
});

export default router;