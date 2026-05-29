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
        const visits = await prisma.patient_visits.findMany({
            include: {
                patients: true,
                doctors: true,
            },
        });

        res.json(visits);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së vizitave",
            error: error.message,
        });
    }
});

router.get("/patient/:patient_id", async (req, res) => {
    try {
        const { patient_id } = req.params;

        const visits = await prisma.patient_visits.findMany({
            where: {
                patient_id: Number(patient_id),
            },
            include: {
                patients: true,
                doctors: true,
            },
        });

        res.json(visits);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë kërkimit sipas pacientit",
            error: error.message,
        });
    }
});

router.get("/doctor/:doctor_id", async (req, res) => {
    try {
        const { doctor_id } = req.params;

        const visits = await prisma.patient_visits.findMany({
            where: {
                doctor_id: Number(doctor_id),
            },
            include: {
                patients: true,
                doctors: true,
            },
        });

        res.json(visits);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë kërkimit sipas doktorit",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { patient_id, doctor_id, diagnoza, trajtimi, data_vizites, ora_vizites } = req.body;

        const visit = await prisma.patient_visits.create({
            data: {
                patient_id: Number(patient_id),
                doctor_id: Number(doctor_id),
                diagnoza,
                trajtimi,
                data_vizites: new Date(data_vizites),
                ora_vizites,
            },
        });

        res.json(visit);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë shtimit të vizitës",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, doctor_id, diagnoza, trajtimi, data_vizites, ora_vizites } = req.body;

        const updated = await prisma.patient_visits.update({
            where: {
                id: Number(id),
            },
            data: {
                patient_id: Number(patient_id),
                doctor_id: Number(doctor_id),
                diagnoza,
                trajtimi,
                data_vizites: new Date(data_vizites),
                ora_vizites,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë editimit të vizitës",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.patient_visits.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            message: "Vizita u fshi!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes së vizitës",
            error: error.message,
        });
    }
});

export default router;