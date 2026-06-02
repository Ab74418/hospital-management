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

        const doctors =
            await prisma.doctors.findMany();

        res.json(doctors);

    } catch (error) {

        console.log(
            "GET DOCTORS ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë marrjes së doctors",

            error:
                error.message,
        });
    }
});

router.get("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const doctor =
            await prisma.doctors.findUnique({

                where: {
                    id: Number(id),
                },
            });

        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor nuk u gjet!",
            });
        }

        res.json(doctor);

    } catch (error) {

        console.log(
            "GET DOCTOR ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë marrjes së doctor",

            error:
                error.message,
        });
    }
});

router.post("/", async (req, res) => {

    try {

        const {
            emri,
            mbiemri,
            specializimi,
            department_id,
            telefoni,
        } = req.body;

        const doctor =
            await prisma.doctors.create({

                data: {

                    emri,

                    mbiemri,

                    specializimi,

                    department_id:
                        department_id
                            ? Number(department_id)
                            : null,

                    telefoni,
                },
            });

        res.json(doctor);

    } catch (error) {

        console.log(
            "POST DOCTOR ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë shtimit të doctor",

            error:
                error.message,
        });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {
            emri,
            mbiemri,
            specializimi,
            department_id,
            telefoni,
        } = req.body;

        const updatedDoctor =
            await prisma.doctors.update({

                where: {
                    id: Number(id),
                },

                data: {

                    emri,

                    mbiemri,

                    specializimi,

                    department_id:
                        department_id
                            ? Number(department_id)
                            : null,

                    telefoni,
                },
            });

        res.json(updatedDoctor);

    } catch (error) {

        console.log(
            "PUT DOCTOR ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Gabim gjatë editimit të doctor",

            error:
                error.message,
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

            message:
                "Doctor u fshi!",
        });

    } catch (error) {

        console.log(
            "DELETE DOCTOR ERROR:",
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