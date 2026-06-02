
import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const prisma = new PrismaClient();

const SECRET = "mysecretkey";

router.post("/register", async (req, res) => {

    try {

        const {
            username,
            password,
            role,
            secretCode
        } = req.body;

        const existingUser =
            await prisma.users.findUnique({
                where: {
                    username,
                },
            });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists",
            });
        }

        if (
            role === "admin" &&
            secretCode !== "ADMIN2026"
        ) {

            return res.status(403).json({
                message: "Admin code gabim",
            });
        }

        if (
            role === "doctor" &&
            secretCode !== "MED2026"
        ) {

            return res.status(403).json({
                message: "Doctor code gabim",
            });
        }

        if (
            role === "receptionist" &&
            secretCode !== "REC2026"
        ) {

            return res.status(403).json({
                message: "Receptionist code gabim",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await prisma.users.create({
                data: {
                    username,
                    password: hashedPassword,
                },
            });

        const roleData =
            await prisma.roles.findFirst({
                where: {
                    emri: role,
                },
            });

        if (!roleData) {

            return res.status(404).json({
                message: "Role not found",
            });
        }

        await prisma.userroles.create({
            data: {
                user_id: user.id,
                role_id: roleData.id,
            },
        });

        res.status(201).json({
            message: "Registered successfully",
            user,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/login", async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const user =
            await prisma.users.findUnique({
                where: {
                    username,
                },

                include: {
                    userroles: {
                        include: {
                            roles: true,
                        },
                    },
                },
            });

        if (!user) {

            return res.status(400).json({
                message: "User not found",
            });
        }

        const valid =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!valid) {

            return res.status(400).json({
                message: "Wrong password",
            });
        }

        const role =
            user.userroles[0]?.roles?.emri;

        const token = jwt.sign(
            {
                id: user.id,
                role,
            },
            SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.json({
            token,
            role,
            username: user.username,
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message,
        });
    }
});

export default router;
