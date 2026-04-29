import express from 'express';
import db from '../config/db.js';

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
        res.json({ message: "Medical record added ✅" });
    });
});

export default router;