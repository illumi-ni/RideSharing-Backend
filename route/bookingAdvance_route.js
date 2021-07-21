const express = require('express');
const router = express.Router();
const AdvanceBook= require('../model/advancedBook_model');
const upload = require('../middleware/upload');

router.post('/customer/booking', function (req, res) {
 
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const from = req.body.from;
    const to = req.body.to;
    const dob = req.body.dob;
    const time = req.body.time;

    const BookingData = new AdvanceBook({
        fullname: fullname, phone: phone, from: from, to: to, dob: dob, time: time, 
    });
    BookingData.save()
        .then(function (result) {
            res.status(201).json({ success: true, message: "Booking has been successfully inserted!!!" });
        })
        .catch(function (e) {
            res.status(500).json({ success: false, message: e });
        })
})

module.exports = router;