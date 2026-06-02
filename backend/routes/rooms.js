import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {

    try {

        const rooms = await prisma.rooms.findMany({

            include: {
                departments: true,
                roomtypes: true,
            },

        });

        res.json(rooms);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

});

router.post("/", async (req, res) => {

    try {

        const {
            numri_dhomes,
            department_id,
            roomtype_id,
            statusi,
            kapaciteti,
        } = req.body;

        const room = await prisma.rooms.create({

            data: {

                numri_dhomes,

                department_id:
                    Number(department_id),

                roomtype_id:
                    Number(roomtype_id),

                statusi,

                kapaciteti:
                    Number(kapaciteti),

            },

        });

        res.status(201).json(room);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

});

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            numri_dhomes,
            department_id,
            roomtype_id,
            statusi,
            kapaciteti,
        } = req.body;

        const room = await prisma.rooms.update({

            where: {
                id: Number(id),
            },

            data: {

                numri_dhomes,

                department_id:
                    Number(department_id),

                roomtype_id:
                    Number(roomtype_id),

                statusi,

                kapaciteti:
                    Number(kapaciteti),

            },

        });

        res.json(room);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

});

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.rooms.delete({

            where: {
                id: Number(id),
            },

        });

        res.json({
            message: "Room deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

});

export default router;