const express=require('express');
const router = express.Router();
const nodemailer=require('nodemailer');

var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
// console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'initiators666@gmail.com',
      pass: 'soft@1234',
    }
    
});
    
router.post('/sendotp', function(req,res){
    email=req.body.email;
    console.log("hello")

     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.response);   
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('otp');
    });
});

module.exports = router