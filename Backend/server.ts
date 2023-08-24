import express from "express";

const app = express ;
const port = 8000 ;

app.get("/" , (req , res) => {
    res.send(`We are listening from port ${port} `)
})


app.listen(port , ()=>{
    console.log(`We are listening from port = ${port}`)
})