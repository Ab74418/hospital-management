import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const payments = await prisma.payments.findMany({
            include: {
                invoices: true
            }
        });

        res.json(payments);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë marrjes së payments",
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            invoice_id,
            amount,
            payment_method,
            statusi
        } = req.body;

        const payment = await prisma.payments.create({
            data: {
                invoice_id: Number(invoice_id),
                amount: Number(amount),
                payment_method,
                statusi
            }
        });

        res.status(201).json(payment);

    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë krijimit të payment",
            error: error.message
        });
    }
});

export default router;