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
router.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { consversationID, senderID, receiverID, MessageString } = req.body;
        const newConverstion = yield pool.query("INSERT INTO Messages (consversationID , senderID, receiverID , MessageString) values ($1 , $2 , $3 , $4) RETURNING * ", [consversationID, senderID, receiverID, MessageString]);
        res.json({ success: true, newConverstion: newConverstion.rows });
        console.log("message saved to the database");
    }
    catch (error) {
        res.status(500).json("Message not save (Post Request Error) ");
        console.log("error", error);
    }
}));
router.get("/messages/:consversationID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consversationID = req.params.consversationID;
        if (!consversationID) {
            res.json([]);
        }
        const messagefetch = yield pool.query("SELECT * FROM Messages WHERE consversationID = $1", [consversationID]);
        console.log("Database Results : ", messagefetch.rows);
        res.json({ success: true, messagefetch: messagefetch.rows });
    }
    catch (error) {
        res.status(500).json("Message not fetched (Get Request Error) ");
        console.log("error", error);
    }
}));
module.exports = router;
