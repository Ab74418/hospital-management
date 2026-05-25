import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Nurses route working"
    });
});

export default router;