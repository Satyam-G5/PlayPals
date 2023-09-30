const nodemailer = require("nodemailer");
const Maingen = require('mailgen')

module.exports.sendMessage = async (reciever : string) => {
    // ... your existing code for the sendMessage function
    let config = {
        service : 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
          },
    };
    
    const transporter = nodemailer.createTransport(config);
   
    const Mailgenerator = new Maingen({
        theme : 'default',
        product : {
            name : 'PlayPals',
            link : 'https://mailgen.js/'
        }
    });
    
    let response = {
        body : { 
            intro : `NEW BOOKING , you are in NEED ` ,
            outro : 'Dont forget to chat with the customer through our website .'
        }
    }
    
    let Mail = Mailgenerator.generate(response)

    let message = {
        from : process.env.EMAIL ,
        to : reciever,
        subject : 'New Booking',
        html : Mail
    }

    transporter.sendMail(message)
   

    
  };   