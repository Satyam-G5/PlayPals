import express from "express";
const router = express.Router()
const pool = require("../Database/db")
const bcrypt = require("bcryptjs"); // hashing
const jwt = require("jsonwebtoken"); // sending JWT tokens 
const secretKey = 'users_data-bsitters'; 



router.post('/newBsitter', async (req, res) => {
    try {
        const { name, age , gender , image , phone_no, exp_hrs, description , email , password} = req.body;

        // hashing the password 
        const salt = await bcrypt.genSalt(8);  // generating salt 
        const hashpass = await bcrypt.hash(password, salt);  // generation of hash

        const newBsitter = await pool.query(
            "INSERT INTO Bsitters (name, age , gender, image , phone_no, exp_hrs, description , email, password) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9) RETURNING *",
            [name, age , gender, image , phone_no, exp_hrs, description , email, hashpass]
        );
        const payload = { userId: newBsitter.rows[0].user_id };
        const token = jwt.sign(payload, secretKey);

        res.json({user : newBsitter.rows[0] , token});
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the bsitter.' });
    }
});

router.post("/bsitter_log" ,async (req, res) => {

    try {
        const {email , password} = req.body ;
        // Find the user by email in the database
        const user = await pool.query("SELECT * FROM Bsitters WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }
        try {
            const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
        
            if (!isPasswordMatch) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            }
        
            // If email and password match, generate a JWT token
            const payload = { userId: user.rows[0].b_id };
            const token = jwt.sign(payload, secretKey);
        
            res.json({ success: true, token }); 
        } catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ success: false, message: 'An error occurred while comparing passwords.' });
        }
        

    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
});
router.get("/bsitter_details", async (req, res) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. Token missing." });
        }

        try {
            const decoded = jwt.verify(token, secretKey);

            // Retrieve user details from the database based on the decoded user_id
            const user = await pool.query("SELECT * FROM Bsitters WHERE b_id = $1", [decoded.userId]);

            if (user.rows.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.json({ success: true, user: user.rows[0] }); // Send success and user details as response
        } catch (error) {
            return res.status(401).json({ success: false, message: "Access denied. Invalid token." });
        }
    } catch (error) {
        console.error('Error retrieving user details:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving user details.' });
    }
});



module.exports = router ;

// {
//     "user": {
//       "b_id": 1,
//       "name": "Jane Foster",
//       "age": 20,
//       "gender": "Female",
//       "phone_no": 1234567890,
//       "exp_hrs": 20,
//       "email": "jane@gmail.com",
//       "password": "$2a$08$tZK5edfJrzTzpIEyqEe/J.6F2P7l2Upv40mhmzJhvBlyAyhC3AkP."
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTMyOTYxNDh9.dghP6GTp9-VvjeA4lyEcJvSXyP7eMVB8sVZYLwOUmjM"
//   }