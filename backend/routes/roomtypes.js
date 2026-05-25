import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM roomtypes", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { emri, cmimi } = req.body;
    db.query(
        "INSERT INTO roomtypes (emri, cmimi) VALUES (?, ?)",
        [emri, cmimi],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Room type added", id: result.insertId });
        }
    );
});

router.put("/:id", (req, res) => {
    const { emri, cmimi } = req.body;
    db.query(
        "UPDATE roomtypes SET emri=?, cmimi=? WHERE id=?",
        [emri, cmimi, req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Room type updated" });
        }
    );
});

router.delete("/:id", (req, res) => {
    db.query("DELETE FROM roomtypes WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Room type deleted" });
    });
});

export default router;