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
const secretKey = process.env.JWT_SECRET_BSITTER;
router.post('/newBsitter', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, gender, image, phone_no, exp_hrs, description, email, password } = req.body;
        // hashing the password 
        const salt = yield bcrypt.genSalt(8); // generating salt 
        const hashpass = yield bcrypt.hash(password, salt); // generation of hash
        const newBsitter = yield pool.query("INSERT INTO Bsitters (name, age , gender, image , phone_no, exp_hrs, description , email, password) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8, $9) RETURNING *", [name, age, gender, image, phone_no, exp_hrs, description, email, hashpass]);
        const payload = { userId: newBsitter.rows[0].user_id };
        const token = jwt.sign(payload, secretKey);
        res.json({ user: newBsitter.rows[0], token });
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An error occurred while adding the bsitter.' });
    }
}));
router.post("/bsitter_log", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email in the database
        const user = yield pool.query("SELECT * FROM Bsitters WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email not found" });
        }
        try {
            const isPasswordMatch = yield bcrypt.compare(password, user.rows[0].password);
            if (!isPasswordMatch) {
                return res.status(401).json({ success: false, message: "Invalid password" });
            }
            // If email and password match, generate a JWT token
            const payload = { userId: user.rows[0].b_id };
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
router.get("/bsitter_details", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. Token missing." });
        }
        try {
            const decoded = jwt.verify(token, secretKey);
            // Retrieve user details from the database based on the decoded user_id
            const user = yield pool.query("SELECT * FROM Bsitters WHERE b_id = $1", [decoded.userId]);
            if (user.rows.length === 0) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.json({ success: true, user: user.rows[0] }); // Send success and user details as response
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
router.get("/get_all_bsitter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const all_employee = yield pool.query("SELECT * FROM Bsitters");
        res.status(200).json({ success: true, all_employee_details: all_employee.rows });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "All b_sitters were not fetched " });
    }
}));
router.get("/get_bsitter/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = req.params.UserID;
        const all_employee = yield pool.query("SELECT * FROM Bsitters WHERE email = $1 ", [UserID]);
        res.status(200).json({ success: true, all_employee_details: all_employee.rows });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "B_sitter with ID not fetched " });
    }
}));
module.exports = router;
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
