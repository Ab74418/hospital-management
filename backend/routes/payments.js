import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all payments
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

// POST create payment
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

// PUT update payment
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            invoice_id,
            amount,
            payment_method,
            statusi
        } = req.body;

        const payment = await prisma.payments.update({
            where: {
                id: Number(id)
            },
            data: {
                invoice_id: Number(invoice_id),
                amount: Number(amount),
                payment_method,
                statusi
            }
        });

        res.json(payment);
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë përditësimit të payment",
            error: error.message
        });
    }
});

// DELETE payment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.payments.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            message: "Payment u fshi me sukses"
        });
    } catch (error) {
        res.status(500).json({
            message: "Gabim gjatë fshirjes së payment",
            error: error.message
        });
    }
});

export default router;