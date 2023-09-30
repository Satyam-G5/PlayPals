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
const { sendMessage } = require('../controllers/sendMessage');
const router = express_1.default.Router();
const pool = require("../Database/db");
router.post("/conversation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { SenderID, RecieverID } = req.body;
        const recipientEmail = RecieverID;
        const newConversation = yield pool.query("INSERT INTO Conversation (SenderID , RecieverID) values ($1 , $2) RETURNING * ", [SenderID, RecieverID]);
        sendMessage(recipientEmail)
            .then(() => {
            console.log('Message sent successfully');
        })
            .catch((error) => {
            console.error('Error sending message:', error);
        });
        console.log("Connection made successfully ");
        res.status(200).json(newConversation.rows[0]);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json("connection was not made (Post Request Error)");
    }
}));
router.get("/conversations/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = req.params.UserID;
    try {
        if (!UserID) {
            return res.status(401).json({ success: false, message: "Access denied. UserID missing." });
        }
        const ConversationMember = yield pool.query("SELECT * FROM Conversation WHERE RecieverID = $1 OR SenderID = $1", [UserID]);
        console.log("Database Results:", ConversationMember.rows);
        if (ConversationMember.rows.length === 0) {
            console.log("Conversation member not fetched from database (Get Request Error)");
            return res.status(404).json({ success: false, message: "Member of conversation not found " });
        }
        res.status(200).json({ success: true, ConversationMember: ConversationMember.rows[0] });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(404).json({ success: false, message: "Members not found " });
    }
}));
router.delete("/delete_conver/:UserID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserID = req.params.UserID;
    try {
        if (!UserID) {
            return res.status(401).json({ success: false, message: "Access denied. UserID missing." });
        }
        // Use a DELETE query to delete rows with matching SenderID or RecieverID
        const deleteQuery = "DELETE FROM Conversation WHERE SenderID = $1 OR RecieverID = $1";
        const deleteResult = yield pool.query(deleteQuery, [UserID]);
        if (deleteResult.rowCount === 0) {
            console.log("No rows deleted");
            return res.status(404).json({ success: false, message: "No matching conversation rows found for deletion." });
        }
        console.log(`Deleted ${deleteResult.rowCount} rows`);
        res.status(200).json({ success: true, message: "Conversation rows deleted successfully." });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}));
module.exports = router;
