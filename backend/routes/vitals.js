import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
        SELECT
            v.*,
            p.emri AS patient_emri,
            p.mbiemri AS patient_mbiemri,
            n.emri AS nurse_emri,
            n.mbiemri AS nurse_mbiemri
        FROM vitals v
        LEFT JOIN patients p
        ON v.patient_id = p.id
        LEFT JOIN nurses n
        ON v.nurse_id = n.id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                error: err.message,
            });
        }

        res.json(results);
    });
});

router.post("/", (req, res) => {

    const {
        patient_id,
        nurse_id,
        temperatura,
        tensioni,
        data,
    } = req.body;

    const sql = `
        INSERT INTO vitals
        (
            patient_id,
            nurse_id,
            temperatura,
            tensioni,
            data
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            Number(patient_id),

            nurse_id
                ? Number(nurse_id)
                : null,

            Number(temperatura),

            tensioni,

            data,
        ],

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }

            res.json({
                message: "Vital added successfully",
                result,
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const {
        patient_id,
        nurse_id,
        temperatura,
        tensioni,
        data,
    } = req.body;

    const sql = `
        UPDATE vitals
        SET
            patient_id = ?,
            nurse_id = ?,
            temperatura = ?,
            tensioni = ?,
            data = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            Number(patient_id),

            nurse_id
                ? Number(nurse_id)
                : null,

            Number(temperatura),

            tensioni,

            data,

            req.params.id,
        ],

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }

            res.json({
                message: "Vital updated successfully",
                result,
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const sql = `
        DELETE FROM vitals
        WHERE id = ?
    `;

    db.query(
        sql,
        [req.params.id],

        (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }

            res.json({
                message: "Vital deleted successfully",
                result,
            });
        }
    );
});

export default router;