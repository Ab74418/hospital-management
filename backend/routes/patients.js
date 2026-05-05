import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM patients", (err, results) => {
        if (err) {
            console.log("GET /patients ERROR:", err); 
            return res.status(500).json(err);
        }
        res.json(results);
    });
});
router.get("/:id/details", (req, res) => {
    const id = req.params.id;

    const sql = `
    SELECT 
        p.id AS patient_id,
        p.emri,
        p.mbiemri,
        p.data_lindjes,
        p.gjinia,
        p.telefoni,
        p.adresa,
        p.grupa_gjakut,

        mr.id AS record_id,
        mr.diagnoza,
        mr.trajtimi,
        mr.data,
        mr.doctor_id,

        pr.id AS prescription_id,
        pr.bari,
        pr.dozimi,
        pr.kohezgjatja,
        pr.udhezime

    FROM patients p
    LEFT JOIN medicalrecords mr 
        ON p.id = mr.patient_id
    LEFT JOIN prescriptions pr 
        ON mr.id = pr.medical_record_id
    WHERE p.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log("GET /patients/:id/details ERROR:", err); 
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM patients WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log("GET /patients/:id ERROR:", err);
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(result[0]);
    });
});

router.post("/", (req, res) => {
    const { emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut } = req.body;

    if (!emri || !mbiemri) {
        return res.status(400).json({ message: "Missing data" });
    }

    const sql = `
    INSERT INTO patients (emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut], (err, result) => {
        if (err) {
            console.log("POST /patients ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({ message: "Patient added successfully", id: result.insertId });
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut } = req.body;

    const sql = `
    UPDATE patients 
    SET emri=?, mbiemri=?, data_lindjes=?, gjinia=?, telefoni=?, adresa=?, grupa_gjakut=?
    WHERE id=?
    `;

    db.query(sql, [emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut, id], (err) => {
        if (err) {
            console.log("PUT /patients ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({ message: "Patient updated" });
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM patients WHERE id = ?", [id], (err) => {
        if (err) {
            console.log("DELETE /patients ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({ message: "Patient deleted" });
    });
});

export default router;