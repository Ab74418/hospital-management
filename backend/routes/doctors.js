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
        const doctors = await prisma.doctors.findMany({
            include: {
                departments: true,
            },
        });

        res.json(doctors);
    } catch (error) {
        console.log("GET DOCTORS ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë marrjes së doctors",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await prisma.doctors.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                departments: true,
            },
        });

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor nuk u gjet!",
            });
        }

        res.json(doctor);
    } catch (error) {
        res.status(500).json({
            message: "Gabim",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            name,
            surname,
            specialization,
            department_id,
            number,
        } = req.body;

        const doctor = await prisma.doctors.create({
            data: {
                name,
                surname,
                specialization,
                department_id: department_id ? Number(department_id) : null,
                number,
            },
        });

        res.json(doctor);
    } catch (error) {
        console.log("POST DOCTOR ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë shtimit të doctor",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            surname,
            specialization,
            department_id,
            number,
        } = req.body;

        const updatedDoctor = await prisma.doctors.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                surname,
                specialization,
                department_id: department_id ? Number(department_id) : null,
                number,
            },
        });

        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë editimit të doctor",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.doctors.delete({
            where: {
                id: Number(id),
            },
        });

        res.json({
            message: "Doctor u fshi!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes",
            error: error.message,
        });
    }
});

export default router;