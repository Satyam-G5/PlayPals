import express, { Express , Request , Response } from "express";
const {sendMessage} = require('../controllers/sendMessage')
const router = express.Router();

const pool = require("../Database/db") ;

router.post("/conversation" ,async (req:Request , res : Response) => {
    try {
        const {SenderID , RecieverID} = req.body ;
        const recipientEmail = RecieverID;
        const newConversation = await pool.query("INSERT INTO Conversation (SenderID , RecieverID) values ($1 , $2) RETURNING * " ,
        [SenderID , RecieverID]
        )
        sendMessage(recipientEmail)
  .then(() => {
    console.log('Message sent successfully');
  })
  .catch((error :any) => {
    console.error('Error sending message:', error);
  });
        console.log("Connection made successfully ") 
        res.status(200).json(newConversation.rows[0])
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json("connection was not made (Post Request Error)")
    }
});

router.get("/conversations/:UserID" ,async (req:Request , res : Response) => {
    const UserID : string = req.params.UserID ;
    try {
        
        if (!UserID) {
            return res.status(401).json({ success: false, message: "Access denied. UserID missing." });
        }
        const ConversationMember = await pool.query("SELECT * FROM Conversation WHERE RecieverID = $1 OR SenderID = $1" , [UserID])
        console.log("Database Results:", ConversationMember.rows);


        if (ConversationMember.rows.length === 0){
            console.log("Conversation member not fetched from database (Get Request Error)")
            return res.status(404).json({ success: false, message: "Member of conversation not found " })
        }
    
        res.status(200).json({success : true  , ConversationMember : ConversationMember.rows[0]} )
    } catch (error) {
        console.error("Error:", error);
        return res.status(404).json({ success: false, message: "Members not found " })
        
    }
})

router.delete("/delete_conver/:UserID", async (req: Request, res: Response) => {
    const UserID: string = req.params.UserID;
    try {
      if (!UserID) {
        return res.status(401).json({ success: false, message: "Access denied. UserID missing." });
      }
  
      // Use a DELETE query to delete rows with matching SenderID or RecieverID
      const deleteQuery = "DELETE FROM Conversation WHERE SenderID = $1 OR RecieverID = $1";
      const deleteResult = await pool.query(deleteQuery, [UserID]);
  
      if (deleteResult.rowCount === 0) {
        console.log("No rows deleted");
        return res.status(404).json({ success: false, message: "No matching conversation rows found for deletion." });
      }
  
      console.log(`Deleted ${deleteResult.rowCount} rows`);
  
      res.status(200).json({ success: true, message: "Conversation rows deleted successfully." });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  });
  

module.exports = router ;