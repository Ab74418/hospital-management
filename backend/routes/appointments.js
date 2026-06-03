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

        const appointments =
            await prisma.appointments.findMany({

                include: {
                    patients: true,
                    doctors: true,
                },

            });

        res.json(appointments);

    } catch (error) {

        console.log(
            "GET APPOINTMENTS ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Gabim gjatë marrjes së appointments",

            error:
                error.message,
        });
    }
});

router.get("/my/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const appointments =
            await prisma.appointments.findMany({

                where: {
                    patient_id:
                        Number(id),
                },

                include: {
                    doctors: true,
                },
            });

        res.json(appointments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Gabim gjatë marrjes së appointments",
        });
    }
});

router.get("/doctor/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const appointments =
            await prisma.appointments.findMany({

                where: {
                    doctor_id:
                        Number(id),
                },

                include: {
                    patients: true,
                    doctors: true,
                },
            });

        res.json(appointments);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message:
                "Gabim gjatë marrjes së appointments",
        });
    }
});

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const appointment =
            await prisma.appointments.findUnique({

                where: {
                    id: Number(id),
                },

                include: {
                    patients: true,
                    doctors: true,
                },

            });

        if (!appointment) {

            return res.status(404).json({
                message:
                    "Appointment nuk u gjet!",
            });
        }

        res.json(appointment);

    } catch (error) {

        console.log(
            "GET APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({
            message:
                "Gabim gjatë marrjes së appointment",

            error:
                error.message,
        });
    }
});

router.post("/", async (req, res) => {

    try {

        const {
            patient_id,
            doctor_id,
            data,
            ora,
            statusi,
            shenime
        } = req.body;

        const existingAppointment =
            await prisma.appointments.findFirst({

                where: {

                    doctor_id:
                        Number(doctor_id),

                    data:
                        new Date(data),

                    ora:
                        new Date(
                            `1970-01-01T${ora}`
                        ),
                },
            });

        if (existingAppointment) {

            return res.status(400).json({

                message:
                    "Ky doktor ka termin në këtë datë dhe orë!",

            });
        }

        const appointment =
            await prisma.appointments.create({

                data: {

                    patient_id:
                        Number(patient_id),

                    doctor_id:
                        Number(doctor_id),

                    data:
                        new Date(data),

                    ora:
                        new Date(
                            `1970-01-01T${ora}`
                        ),

                    statusi,

                    shenime,
                },
            });

        res.json(appointment);

    } catch (error) {

        console.log(
            "POST APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë shtimit të appointment",

            error:
                error.message,
        });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            patient_id,
            doctor_id,
            data,
            ora,
            statusi,
            shenime
        } = req.body;

        const existingAppointment =
            await prisma.appointments.findFirst({

                where: {

                    doctor_id:
                        Number(doctor_id),

                    data:
                        new Date(data),

                    ora:
                        new Date(
                            `1970-01-01T${ora}`
                        ),

                    NOT: {
                        id:
                            Number(id),
                    },
                },
            });

        if (existingAppointment) {

            return res.status(400).json({

                message:
                    "Ky doktor ka termin në këtë datë dhe orë!",

            });
        }

        const updatedAppointment =
            await prisma.appointments.update({

                where: {
                    id:
                        Number(id),
                },

                data: {

                    patient_id:
                        Number(patient_id),

                    doctor_id:
                        Number(doctor_id),

                    data:
                        new Date(data),

                    ora:
                        new Date(
                            `1970-01-01T${ora}`
                        ),

                    statusi,

                    shenime,
                },
            });

        res.json(updatedAppointment);

    } catch (error) {

        console.log(
            "PUT APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë editimit të appointment",

            error:
                error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.appointments.delete({

            where: {
                id:
                    Number(id),
            },
        });

        res.json({
            message:
                "Appointment u fshi!",
        });

    } catch (error) {

        console.log(
            "DELETE APPOINTMENT ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë fshirjes",

            error:
                error.message,
        });
    }
});

export default router;