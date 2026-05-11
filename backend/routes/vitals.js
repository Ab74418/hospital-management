import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = "SELECT * FROM vitals";

    db.query(sql, (err, results) => {

        if (err) {

            return res
                .status(500)
                .json(err);
        }

        res.json(results);
    });
});

router.post("/", (req, res) => {

    const {
        patient_id,
        temperatura,
        tensioni,
        data,
    } = req.body;

    const sql = `
    
        INSERT INTO vitals
        (
            patient_id,
            temperatura,
            tensioni,
            data
        )

        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            temperatura,
            tensioni,
            data,
        ],
        (err, result) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Vital added successfully",
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const {
        patient_id,
        temperatura,
        tensioni,
        data,
    } = req.body;

    const sql = `
    
        UPDATE vitals

        SET
            patient_id = ?,
            temperatura = ?,
            tensioni = ?,
            data = ?

        WHERE id = ?
    `;

    db.query(
        sql,
        [
            patient_id,
            temperatura,
            tensioni,
            data,
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
                    "Vital updated successfully",
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const sql =
        "DELETE FROM vitals WHERE id = ?";

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
                    "Vital deleted successfully",
            });
        }
    );
});

export default router;