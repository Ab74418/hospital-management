import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = "SELECT * FROM allergies";

    db.query(sql, (err, result) => {

        if (err) {

            return res
                .status(500)
                .json(err);
        }

        res.json(result);
    });
});

router.get("/:id", (req, res) => {

    const sql =
        "SELECT * FROM allergies WHERE id = ?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            if (result.length === 0) {

                return res.status(404).json({
                    message:
                        "Allergy not found",
                });
            }

            res.json(result[0]);
        }
    );
});

router.post("/", (req, res) => {

    const {
        patient_id,
        pershkrimi,
    } = req.body;

    if (!patient_id || !pershkrimi) {

        return res.status(400).json({
            message:
                "All fields are required",
        });
    }

    const sql = `
        INSERT INTO allergies
        (
            patient_id,
            pershkrimi
        )
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            pershkrimi,
        ],
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.status(201).json({
                message:
                    "Allergy added successfully",
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const {
        patient_id,
        pershkrimi,
    } = req.body;

    const sql = `
        UPDATE allergies
        SET
            patient_id = ?,
            pershkrimi = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            patient_id,
            pershkrimi,
            req.params.id,
        ],
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Allergy updated successfully",
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const sql =
        "DELETE FROM allergies WHERE id = ?";

    db.query(
        sql,
        [req.params.id],
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Allergy deleted successfully",
            });
        }
    );
});

export default router; 