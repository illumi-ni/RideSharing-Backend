const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

//setting up the transport object
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'initiators666@gmail.com',
        pass: 'soft@1234',
    }
});

router.post('/sendotp', function (req, res) {
    const email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: email,
        subject: "Otp for email verification is: ",
        html: "<h3>OTP for email verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            res.status(201).json({ success: true, message: "OTP sent!" });
            // console.log('Message sent: %s', info.messageId);
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        res.status(500).json({ success: false, message: error });
    });
});

module.exports = router;