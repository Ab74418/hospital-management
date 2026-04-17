const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/", (req, res) => {
    db.query("SELECT * FROM Patients", (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM Patients WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});


router.post("/", (req, res) => {
    const { emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut } = req.body;

    const sql = `
    INSERT INTO Patients (emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(sql, [emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient added successfully ✅" });
    });
});


router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { emri, mbiemri, data_lindjes, gjinia, telefoni, adresa, grupa_gjakut } = req.body;

    const sql = `
    UPDATE Patients 
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

    db.query("DELETE FROM Patients WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Patient deleted ❌" });
    });
});


module.exports = router;