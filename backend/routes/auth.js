import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const prisma = new PrismaClient();

const SECRET = "mysecretkey";

router.post("/register", async (req, res) => {

    try {

        const { username, password } = req.body;

        const existingUser =
            await prisma.user.findUnique({
                where: { username },
            });

        if (existingUser) {

            return res.status(400).json({
                message: "Username already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        res.json({
            message:
                "User registered successfully",
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

        const { username, password } = req.body;

        const user =
            await prisma.user.findUnique({
                where: { username },
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

        const token = jwt.sign(
            { id: user.id },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message,
        });
    }
});

export default router;