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
        const departments = await prisma.departments.findMany();

        res.json(departments);
    } catch (error) {
        console.log("GET DEPARTMENTS ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë marrjes së departments",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const department = await prisma.departments.findUnique({
            where: { id: Number(id) },
        });

        if (!department) {
            return res.status(404).json({
                message: "Department nuk u gjet!",
            });
        }

        res.json(department);
    } catch (error) {
        res.status(500).json({
            message: "Gabim",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { emri } = req.body;

        const department = await prisma.departments.create({
            data: {
                emri,
            },
        });

        res.json(department);
    } catch (error) {
        console.log("POST DEPARTMENT ERROR:", error);

        res.status(500).json({
            message: "Gabim gjatë shtimit të department",
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { emri } = req.body;

        const updated = await prisma.departments.update({
            where: { id: Number(id) },
            data: {
                emri,
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

        await prisma.departments.delete({
            where: { id: Number(id) },
        });

        res.json({ message: "Department u fshi!" });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes",
            error: error.message,
        });
    }
});

export default router;