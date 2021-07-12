const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const customer = require('../model/model_customer');

var email;

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
    email = req.body.email;

    // send mail with defined transport object
    var mailOptions = {
        to: email,
        subject: "Otp for email verification is: ",
        html: "<h3>OTP for email verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (!error) {
            res.status(201).json({ success: true, message: "OTP sent!" });
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        res.status(500).json({ success: false, message: error });
    });
});

router.post('/verifyotp', function (req, res) {
    if(req.body.otp == otp) {
        customer.findOne({ email: email })
        .then(function (customerData) {
            const token = jwt.sign({ customerID: customerData._id }, 'Sercretkey');
            res.status(200).json({ success: true, token: token, customerData: customerData })
        })
        .catch(function (err) {
            res.status(500).json({ success: false, message: err })
        })
    }
    else {
        return res.status(403).json({ success: false, message: "OTP is incorrect" })
    }
});

module.exports = router;