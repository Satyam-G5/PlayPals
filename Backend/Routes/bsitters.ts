import express from "express";

const router = express.Router()
const pool = require("../Database/db")


router.post('/newBsitter', async (req, res) => {
    try {
        const { name, age , gender , phone_no, exp_hrs, email } = req.body;
        const newBsitter = await pool.query(
            "INSERT INTO Parents (name, age , gender , phone_no, exp_hrs, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, age , gender , phone_no, exp_hrs, email]
        );
        res.json(newBsitter.rows[0]);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
});



module.exports = router ;