import express from 'express';
import db from '../config/db.js';

const router = express.Router();


router.get("/", (req, res) => {
    db.query("SELECT * FROM patients", (err, results) => {
        if (err) return res.status(500).json(err);
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
        m.id AS record_id,
        m.diagnoza,
        m.trajtimi,
        m.data,
        m.doctor_id
    FROM patients p
    LEFT JOIN medicalrecords m 
    ON p.id = m.patient_id
    WHERE p.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const patient = {
            id: results[0].patient_id,
            emri: results[0].emri,
            mbiemri: results[0].mbiemri,
            data_lindjes: results[0].data_lindjes,
            gjinia: results[0].gjinia,
            telefoni: results[0].telefoni,
            adresa: results[0].adresa,
            grupa_gjakut: results[0].grupa_gjakut,
            medical_records: []
        };

        results.forEach(row => {
            if (row.record_id) {
                patient.medical_records.push({
                    id: row.record_id,
                    diagnoza: row.diagnoza,
                    trajtimi: row.trajtimi,
                    data: row.data,
                    doctor_id: row.doctor_id
                });
            }
        });

        res.json(patient);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM patients WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);

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
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient added successfully ✅", id: result.insertId });
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
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient updated ✅" });
    });
});



router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM patients WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient deleted ✅" });
    });
});


export default router;