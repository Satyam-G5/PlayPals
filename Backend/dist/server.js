"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const pool = require("./Database/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const port = 8000;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Add other methods you need
};
app.use(cors(corsOptions));
app.get("/", (_req, res) => {
    res.send(`We are listening from port ${port} `);
});
app.use(express_1.default.json());
//************ CREATING ROUTES ***************
app.use("/", require('./Routes/user')); // Adding Parents --- primary users 
app.use("/", require('./Routes/bsitters')); // Adding Bsitters --- primary users 
app.use("/", require('./Routes/conversations')); // Conversation router --- sockect.io
app.use("/", require('./Routes/Messages')); // Saving Messages --- sockect.io(sender oriented)
httpServer.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// *****************   SOCKET  ******************
const io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
let users = [];
io.on("connection", (socket) => {
    console.log("User Connected -- Socket.io ", socket.id);
    socket.on('addUser', (userId) => {
        const userExists = users.find(user => user.userId === userId);
        if (!userExists) {
            const user = { userId: userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });
    // socket.on('sendMessage', ({ conversationID, senderID, ReceiverId, MessageString }) => {
    //   const receiver = users.find(user => user.userId === ReceiverId);
    //   const sender = users.find(user => user.userId === senderID);
    //   if (receiver && sender) {
    //     io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
    //       conversationID,
    //       senderID,
    //       ReceiverId,
    //       MessageString
    //     });
    socket.on('sendMessage', ({ MessageId, senderID, recieverID, MessageString }) => {
        console.log("Data received at backend 'SendMessage' event -> ", MessageId, senderID, recieverID, MessageString);
        const sender = users.find(user => user.userId === senderID);
        const reciever = users.find(user => user.userId === recieverID);
        console.log("reciever or sender found ", sender, reciever);
        if (reciever && sender) {
            io.to(reciever.socketId).emit('getMessage', {
                MessageId,
                senderID,
                recieverID,
                MessageString
            });
        }
        else {
            console.log("reciever or send not found ", sender, reciever);
        }
    });
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
});
