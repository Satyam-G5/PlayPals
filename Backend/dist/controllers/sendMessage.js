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
const nodemailer = require("nodemailer");
const Maingen = require('mailgen');
module.exports.sendMessage = (reciever) => __awaiter(void 0, void 0, void 0, function* () {
    // ... your existing code for the sendMessage function
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    };
    const transporter = nodemailer.createTransport(config);
    const Mailgenerator = new Maingen({
        theme: 'default',
        product: {
            name: 'PlayPals',
            link: 'https://mailgen.js/'
        }
    });
    let response = {
        body: {
            intro: `NEW BOOKING , you are in NEED `,
            outro: 'Dont forget to chat with the customer through our website .'
        }
    };
    let Mail = Mailgenerator.generate(response);
    let message = {
        from: process.env.EMAIL,
        to: reciever,
        subject: 'New Booking',
        html: Mail
    };
    transporter.sendMail(message);
});
