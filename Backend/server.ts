import express from "express";
// import { Socket } from "socket.io";
const pool = require("./Database/db")

const app = express() ;
const port = 8000 ;

app.get("/" , (_req , res) => {
    res.send(`We are listening from port ${port} `)
})

app.use(express.json());

//************ CREATING ROUTES ***************

app.use("/" ,  require('./Routes/user')) // Adding Parents --- primary users 
app.use("/" ,  require('./Routes/bsitters')) // Adding Bsitters --- primary users 



app.listen(port , ()=>{
    console.log(`We are listening from port = ${port}`)
})

// *****************   SOCKET  ******************

// const io = require("socket.io")(app);

// io.on('connection' , (socket:Socket)=>{
//     console.log("Socket : ", socket)
//     console.log("Connected ......")
    
//     socket.on("chat" ,(payload:Socket)=>{
//         console.log("Payload :" , payload)
//         io.emit("chat" , payload)
//     })
// })

