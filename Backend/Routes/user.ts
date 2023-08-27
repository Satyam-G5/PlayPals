import express from "express" 
const router = express.Router() ;
const pool = require("../Database/db")

router.post('/newuser', async (req, res) => {
    try {
        const { name, address, phone_no, email, child_name, child_age, gender } = req.body;
        const newUser = await pool.query(
            "INSERT INTO Parents (name, address, phone_no, email, child_name, child_age, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, address, phone_no, email, child_name, child_age, gender]
        );
        res.json(newUser.rows[0]);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
});

module.exports = router;