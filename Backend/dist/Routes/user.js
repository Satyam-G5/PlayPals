"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const pool = require("../Database/db");
const bcrypt = require("bcryptjs"); // hashing
const jwt = require("jsonwebtoken"); // sending JWT tokens 
const secretKey = process.env.JWT_SECRET_PARENT;
router.post('/newuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone_no, email, child_name, child_age, gender, password } = req.body;
        // hashing the password 
        const salt = yield bcrypt.genSalt(8); // generating salt 
        const hashpass = yield bcrypt.hash(password, salt); // generation of hash 
        const newUser = yield pool.query("INSERT INTO Parents (name, address, phone_no, email, child_name, child_age, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [name, address, phone_no, email, child_name, child_age, gender, hashpass]);
        // Generate a JWT token
        const payload = { userId: newUser.rows[0].user_id };
        const token = jwt.sign(payload, secretKey);
        res.json({ user: newUser.rows[0], token }); // Send the user and token as a response
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
}));
router.post("/user_log", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email in the database
        const user = yield pool.query("SELECT * FROM Parents WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }
        try {
            // Compare the provided password with the hashed password from the database
            // console.log('Hashpass from database:', user.rows[0].password);
            const isPasswordMatch = yield bcrypt.compare(password, user.rows[0].password);
            if (!isPasswordMatch) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            }
            // If email and password match, generate a JWT token
            const payload = { userId: user.rows[0].user_id };
            const token = jwt.sign(payload, secretKey);
            res.json({ success: true, token });
        }
        catch (error) {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ success: false, message: 'An error occurred while comparing passwords.' });
        }
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the user.' });
    }
}));
router.get("/user_details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. Token missing." });
        }
        try {
            const decoded = jwt.verify(token, secretKey);
            const user = yield pool.query("SELECT * FROM Parents WHERE user_id = $1", [decoded.userId]);
            if (user.rows.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.json({ success: true, user: user.rows[0] });
        }
        catch (error) {
            return res.status(401).json({ success: false, message: "Access denied. Invalid token." });
        }
    }
    catch (error) {
        console.error('Error retrieving user details:', error);
        res.status(500).json({ success: false, message: 'An error occurred while retrieving user details.' });
    }
}));
router.get("/get_user/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = req.params.UserID;
    try {
        if (!UserID) {
            return res.status(404).json({ success: false, message: "User ID not found." });
        }
        const all_employee = yield pool.query("SELECT * FROM Parents WHERE email = $1", [UserID]);
        if (all_employee.rows.length === 0) {
            return res.status(404).json({ success: false, message: "No user found with that ID." });
        }
        res.status(200).json({ success: true, all_employee: all_employee.rows[0] });
        console.log("Email data provided:", all_employee.rows[0]);
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred while fetching user data." });
    }
}));
module.exports = router;
// {
//     "user": {
//       "user_id": 3,
//       "name": "Krishna Yadav",
//       "address": "Gokul , UP",
//       "phone_no": 1234567890,
//       "email": "krishna@gmail.com",
//       "child_name": "Kiya",
//       "child_age": 5,
//       "gender": "Female",
//       "password": "$2a$08$XCD4M.hT7MBbyPR0Ii7YJus3N0cLyCSiVq8emD3j5DOq9iqLMQiOa"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY5MzIzODMyNn0.NJFmHrzegNQnoEcjAdSn0Fu27R1g1leEvdv2Kh7GKK0"
//   }
