import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import { Server , Socket} from "socket.io";
import { createServer } from "http";



const pool = require("./Database/db")
import dotenv from 'dotenv';

dotenv.config();

const app : Express= express() ;
const httpServer = createServer(app);
const port = 8000 ;

const corsOptions = {
    origin: 'https://play-pals-zeta.vercel.app', // Allow requests from your client app
    methods: ['GET', 'POST'], // Add other methods you need
  };
  
  app.use(cors(
    {origin:  'https://play-pals-zeta.vercel.app'}
    ));


app.get("/" , (_req : Request, res : Response) => {
    res.send(`We are listening from port ${port} `)
})

app.use(express.json());

//************ CREATING ROUTES ***************

app.use("/" ,  require('./Routes/user')) // Adding Parents --- primary users 
app.use("/" ,  require('./Routes/bsitters')) // Adding Bsitters --- primary users 
app.use("/" ,  require('./Routes/conversations')) // Conversation router --- sockect.io
app.use("/" ,  require('./Routes/Messages')) // Saving Messages --- sockect.io(sender oriented)


httpServer.listen(port , ()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

// *****************   SOCKET  ******************
const io = new Server(httpServer, { cors: { origin: '*' } });

let users: { userId: any; socketId: string }[] = [];

io.on("connection", (socket: Socket) => {
  console.log("User Connected -- Socket.io ", socket.id);

  socket.on('addUser', (userId: string) => {
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

      socket.on('sendMessage', ({ MessageId, senderID, recieverID, MessageString }) : any => {
        console.log("Data received at backend 'SendMessage' event -> " ,MessageId ,senderID , recieverID ,MessageString)
        const sender :any = users.find(user => user.userId === senderID);
        const reciever :any = users.find(user => user.userId === recieverID);
      console.log("reciever or sender found " , sender , reciever);

        if (reciever && sender) { 
          io.to(reciever.socketId).emit('getMessage', { 
            MessageId,
            senderID, 
            recieverID,
            MessageString   
          }); 
    }else{
      console.log("reciever or send not found " , sender , reciever);
      
    }
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user.socketId !== socket.id);
    io.emit('getUsers', users);
  });
});