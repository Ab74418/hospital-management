import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
        SELECT 
            p.*,
            d.emri AS doctor_emri,
            d.mbiemri AS doctor_mbiemri
        FROM patients p
        LEFT JOIN doctors d
        ON p.doctor_id = d.id
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log("GET PATIENTS ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

router.get("/doctor/:doctor_id", (req, res) => {

    const { doctor_id } = req.params;

    const sql = `
        SELECT 
            p.*,
            d.emri AS doctor_emri,
            d.mbiemri AS doctor_mbiemri
        FROM patients p
        LEFT JOIN doctors d
        ON p.doctor_id = d.id
        WHERE p.doctor_id = ?
    `;

    db.query(sql, [doctor_id], (err, results) => {

        if (err) {
            console.log("GET PATIENTS BY DOCTOR ERROR:", err);
            return res.status(500).json(err);
        }

        res.json(results);
    });
});

router.get("/:id/details", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT 
            p.*,
            d.emri AS doctor_emri,
            d.mbiemri AS doctor_mbiemri
        FROM patients p
        LEFT JOIN doctors d
        ON p.doctor_id = d.id
        WHERE p.id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log("GET PATIENT DETAILS ERROR:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Patient not found",
            });
        }

        res.json(results[0]);
    });
});

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT 
            p.*,
            d.emri AS doctor_emri,
            d.mbiemri AS doctor_mbiemri
        FROM patients p
        LEFT JOIN doctors d
        ON p.doctor_id = d.id
        WHERE p.id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.log("GET PATIENT ERROR:", err);
            return res.status(500).json(err);
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Patient not found",
            });
        }

        res.json(results[0]);
    });
});

router.post("/", (req, res) => {

    const {
        emri,
        mbiemri,
        data_lindjes,
        gjinia,
        telefoni,
        adresa,
        grupa_gjakut,
        doctor_id
    } = req.body;

    const sql = `
        INSERT INTO patients
        (
            emri,
            mbiemri,
            data_lindjes,
            gjinia,
            telefoni,
            adresa,
            grupa_gjakut,
            doctor_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            emri,
            mbiemri,
            data_lindjes,
            gjinia,
            telefoni,
            adresa,
            grupa_gjakut,
            doctor_id || null
        ],
        (err, result) => {

            if (err) {
                console.log("ADD PATIENT ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Patient added successfully",
                id: result.insertId
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        emri,
        mbiemri,
        data_lindjes,
        gjinia,
        telefoni,
        adresa,
        grupa_gjakut,
        doctor_id
    } = req.body;

    const sql = `
        UPDATE patients
        SET
            emri = ?,
            mbiemri = ?,
            data_lindjes = ?,
            gjinia = ?,
            telefoni = ?,
            adresa = ?,
            grupa_gjakut = ?,
            doctor_id = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            emri,
            mbiemri,
            data_lindjes,
            gjinia,
            telefoni,
            adresa,
            grupa_gjakut,
            doctor_id || null,
            id
        ],
        (err) => {

            if (err) {
                console.log("UPDATE PATIENT ERROR:", err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Patient updated successfully"
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM patients
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {
            console.log("DELETE PATIENT ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Patient deleted successfully"
        });
    });
});

export default router;