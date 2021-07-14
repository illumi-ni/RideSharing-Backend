const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : false}));

const db = require('./database/db');
const driver_route = require('./route/DriverRegister_Route');
const route_customer = require('./route/route_customer');
const admin_route = require('./route/Admin_Route');
const routeotp = require('./route/OTPverify');
const Bookingadvance_route = require('./route/Bookingadvance_route')

app.use(express.static("images"));
app.use(driver_route);
app.use(route_customer);
app.use(admin_route)
app.use(routeotp);
app.use(Bookingadvance_route)

const PORT=process.env.PORT||90;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
})