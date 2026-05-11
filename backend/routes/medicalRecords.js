import express from "express";
import db from "../config/db.js";

const router = express.Router();


router.get("/", (req, res) => {
    db.query("SELECT * FROM medicalrecords", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { patient_id, doctor_id, diagnoza, trajtimi, data } = req.body;

    const sql = `
        INSERT INTO medicalrecords 
        (patient_id, doctor_id, diagnoza, trajtimi, data)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [patient_id, doctor_id, diagnoza, trajtimi, data], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Medical record added" });
    });
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM medicalrecords WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});
router.put("/:id", (req, res) => {
    const { patient_id, doctor_id, diagnoza, trajtimi, data } = req.body;

    const sql = `
    UPDATE medicalrecords
    SET patient_id = ?, doctor_id = ?, diagnoza = ?, trajtimi = ?, data = ?
    WHERE id = ?
  `;

    db.query(
        sql,
        [patient_id, doctor_id, diagnoza, trajtimi, data, req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Updated " });
        }
    );
});

export default router;