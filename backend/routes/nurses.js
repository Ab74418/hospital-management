import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM nurses", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { emri, mbiemri, department_id, turni } = req.body;
    db.query(
        "INSERT INTO nurses (emri, mbiemri, department_id, turni) VALUES (?, ?, ?, ?)",
        [emri, mbiemri, department_id, turni],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Nurse added", id: result.insertId });
        }
    );
});

router.put("/:id", (req, res) => {
    const { emri, mbiemri, department_id, turni } = req.body;
    db.query(
        "UPDATE nurses SET emri=?, mbiemri=?, department_id=?, turni=? WHERE id=?",
        [emri, mbiemri, department_id, turni, req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Nurse updated" });
        }
    );
});

router.delete("/:id", (req, res) => {
    db.query("DELETE FROM nurses WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Nurse deleted" });
    });
});

export default router;