const express = require("express");
const router = express.Router();
const db = require("../config/db");


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

module.exports = router;