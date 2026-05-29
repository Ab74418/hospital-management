import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
        SELECT
            medicalrecords.id,
            medicalrecords.patient_id,
            medicalrecords.doctor_id,
            medicalrecords.diagnoza,
            medicalrecords.trajtimi,
            medicalrecords.prescriptions,
            medicalrecords.notes,
            medicalrecords.data,

            patients.emri AS patient_name,

            doctors.emri AS doctor_name,
            doctors.specializimi

        FROM medicalrecords

        JOIN patients
        ON medicalrecords.patient_id = patients.id

        JOIN doctors
        ON medicalrecords.doctor_id = doctors.id
    `;

    db.query(sql, (err, results) => {

        if (err) {

            return res
                .status(500)
                .json(err);
        }

        res.json(results);
    });
});

router.post("/", (req, res) => {

    const {
        patient_id,
        doctor_id,
        diagnoza,
        trajtimi,
        prescriptions,
        notes,
        data
    } = req.body;

    const sql = `
        INSERT INTO medicalrecords 
        (
            patient_id,
            doctor_id,
            diagnoza,
            trajtimi,
            prescriptions,
            notes,
            data
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            diagnoza,
            trajtimi,
            prescriptions,
            notes,
            data
        ],
        (err) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Medical record added",
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const {
        patient_id,
        doctor_id,
        diagnoza,
        trajtimi,
        prescriptions,
        notes,
        data
    } = req.body;

    const sql = `
        UPDATE medicalrecords
        SET
            patient_id = ?,
            doctor_id = ?,
            diagnoza = ?,
            trajtimi = ?,
            prescriptions = ?,
            notes = ?,
            data = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            patient_id,
            doctor_id,
            diagnoza,
            trajtimi,
            prescriptions,
            notes,
            data,
            req.params.id
        ],
        (err) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Updated successfully",
            });
        }
    );
});

router.delete("/:id", (req, res) => {

    const sql =
        "DELETE FROM medicalrecords WHERE id = ?";

    db.query(
        sql,
        [req.params.id],
        (err) => {

            if (err) {

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                message:
                    "Deleted successfully",
            });
        }
    );
});

export default router;