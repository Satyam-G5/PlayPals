import express, { Express , Request , Response } from "express";
const router = express.Router();

const pool = require("../Database/db") ;

router.post("/message" ,async (req:Request , res : Response) => {
    try {
        const {consversationID ,senderID, receiverID , MessageString} = req.body ;
        const newConverstion = await pool.query ("INSERT INTO Messages (consversationID , senderID, receiverID , MessageString) values ($1 , $2 , $3 , $4) RETURNING * " , 
        [consversationID , senderID, receiverID , MessageString])
        
        res.json({success : true , newConverstion : newConverstion.rows})
        console.log("message saved to the database") 
    } catch (error) {
        res.status(500).json("Message not save (Post Request Error) ")  
        console.log("error", error)
    }
})

router.get("/messages/:consversationID" ,async (req:Request , res : Response) => {
    try {
        const consversationID = req.params.consversationID ;
        if (!consversationID) {
            res.json([]) ;
        }

        const messagefetch = await pool.query("SELECT * FROM Messages WHERE consversationID = $1" , [consversationID])
        console.log("Database Results : ", messagefetch.rows)

        res.json({success :true , messagefetch : messagefetch.rows}) 

    } catch (error) {
        res.status(500).json("Message not fetched (Get Request Error) ")
        console.log("error", error)
    } 
})


module.exports = router ;