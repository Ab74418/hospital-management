import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET vitals + patient + nurse
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
            console.log("GET /vitals ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

// ADD vital
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
            patient_id,
            nurse_id || null,
            temperatura,
            tensioni,
            data,
        ],
        (err) => {
            if (err) {
                console.log("POST /vitals ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Vital added successfully",
            });
        }
    );
});

// UPDATE vital
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
            patient_id,
            nurse_id || null,
            temperatura,
            tensioni,
            data,
            req.params.id,
        ],
        (err) => {
            if (err) {
                console.log("PUT /vitals ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Vital updated successfully",
            });
        }
    );
});

// DELETE vital
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM vitals WHERE id = ?";

    db.query(sql, [req.params.id], (err) => {
        if (err) {
            console.log("DELETE /vitals ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Vital deleted successfully",
        });
    });
});

export default router;