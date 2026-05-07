import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const sql = "SELECT * FROM allergies";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { patient_id, pershkrimi } = req.body;

    const sql =
        "INSERT INTO allergies (patient_id, pershkrimi) VALUES (?, ?)";

    db.query(
        sql,
        [patient_id, pershkrimi],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Allergy added successfully",
            });
        }
    );
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM allergies WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Allergy deleted successfully",
        });
    });
});

export default router;