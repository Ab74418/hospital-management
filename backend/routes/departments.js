import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
        SELECT 
            id,
            emri,
            pershkrimi,
            lokacioni
        FROM departments
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log("GET DEPARTMENTS ERROR:", err);

            return res.status(500).json({
                message: "Error getting departments",
                error: err,
            });
        }

        res.json(results);
    });
});

router.get("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT 
            id,
            emri,
            pershkrimi,
            lokacioni
        FROM departments
        WHERE id = ?
    `;

    db.query(sql, [id], (err, results) => {

        if (err) {

            console.log("GET DEPARTMENT ERROR:", err);

            return res.status(500).json({
                message: "Error getting department",
                error: err,
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Department not found",
            });
        }

        res.json(results[0]);
    });
});

router.post("/", (req, res) => {

    const {
        emri,
        pershkrimi,
        lokacioni
    } = req.body;

    const sql = `
        INSERT INTO departments
        (
            emri,
            pershkrimi,
            lokacioni
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            emri,
            pershkrimi,
            lokacioni
        ],
        (err, result) => {

            if (err) {

                console.log("ADD DEPARTMENT ERROR:", err);

                return res.status(500).json({
                    message: "Error adding department",
                    error: err,
                });
            }

            res.json({
                message: "Department added successfully",
                id: result.insertId,
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const { id } = req.params;

    const {
        emri,
        pershkrimi,
        lokacioni
    } = req.body;

    const sql = `
        UPDATE departments
        SET
            emri = ?,
            pershkrimi = ?,
            lokacioni = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            emri
            pershkrimi,
            lokacioni,
            id
        ],
        (err) => {

            if (err) {

                console.log("UPDATE DEPARTMENT ERROR:", err);

                return res.status(500).json({
                    message: "Error updating department",
                    error: err,
                });
            }

            res.json({
                message: "Department updated successfully",
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM departments
        WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

        if (err) {

            console.log("DELETE DEPARTMENT ERROR:", err);

            return res.status(500).json({
                message: "Error deleting department",
                error: err,
            });
        }

        res.json({
            message: "Department deleted successfully",
        });
    });
});

export default router;