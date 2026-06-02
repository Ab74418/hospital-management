import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
        SELECT
            nurses.id,
            nurses.emri,
            nurses.mbiemri,
            nurses.department_id,
            nurses.turni,
            departments.emri AS department_name
        FROM nurses
        LEFT JOIN departments
        ON nurses.department_id = departments.id
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "GET NURSES ERROR:",
                err
            );

            return res
                .status(500)
                .json(err);
        }

        res.json(results);
    });
});

router.get("/:id", (req, res) => {

    const sql = `
        SELECT
            nurses.id,
            nurses.emri,
            nurses.mbiemri,
            nurses.department_id,
            nurses.turni,
            departments.emri AS department_name
        FROM nurses
        LEFT JOIN departments
        ON nurses.department_id = departments.id
        WHERE nurses.id = ?
    `;

    db.query(
        sql,
        [req.params.id],
        (err, results) => {

            if (err) {

                console.log(
                    "GET NURSE ERROR:",
                    err
                );

                return res
                    .status(500)
                    .json(err);
            }

            res.json(results[0]);
        }
    );
});

router.post("/", (req, res) => {

    const {
        emri,
        mbiemri,
        department_id,
        turni
    } = req.body;

    const sql = `
        INSERT INTO nurses
        (
            emri,
            mbiemri,
            department_id,
            turni
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            emri,
            mbiemri,
            department_id,
            turni
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "ADD NURSE ERROR:",
                    err
                );

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Nurse added",
                id:
                    result.insertId,
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const {
        emri,
        mbiemri,
        department_id,
        turni
    } = req.body;

    const sql = `
        UPDATE nurses
        SET
            emri = ?,
            mbiemri = ?,
            department_id = ?,
            turni = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            emri,
            mbiemri,
            department_id,
            turni,
            req.params.id
        ],
        (err) => {

            if (err) {

                console.log(
                    "UPDATE NURSE ERROR:",
                    err
                );

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Nurse updated",
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const sql = `
        DELETE FROM nurses
        WHERE id = ?
    `;

    db.query(
        sql,
        [req.params.id],
        (err) => {

            if (err) {

                console.log(
                    "DELETE NURSE ERROR:",
                    err
                );

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Nurse deleted",
            });
        }
    );
});

export default router;