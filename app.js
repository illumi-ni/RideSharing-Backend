const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Driver = require("./model/driver_model");
const Customer = require("./model/customer_model");
// // const ws = require('ws');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./database/db');
const driver_route = require('./route/driver_route');
const route_customer = require('./route/customer_route');
const admin_route = require('./route/admin_route');
const booking_route = require('./route/bookingAdvance_route');
const contact_route = require('./route/contact_route');
const ride_route = require('./route/ride_route');
// const { Server } = require('http');

// app.use("/images", express.static(path.join(__dirname, "images")))
app.use(express.static("images"));
app.use(driver_route);
app.use(route_customer);
app.use(admin_route);
app.use(booking_route);
app.use(contact_route);
app.use(ride_route);


const PORT = process.env.PORT || 90;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});



const socket = require('socket.io');
const io = socket(server);

// var io = socketio.listen(server)
let customerID, driverID, joinerID;

io.sockets.on('connection', function (client) {

  // console.log("client connected: " + client.id);
  client.on("message", function (data) {

    const data1 = JSON.parse(data)
    customerID = data1.customerID;

    // sending to all drivers except sender
    drivers = Driver.find({}).then((driver) => {
      driver.forEach((d, key) => {
        client.broadcast.emit("driver_" + d._id, data1);
      })
    })
  });

  client.on("accept", function (ad) {
    const adData = JSON.parse(ad)
    driverID = adData._id;
    client.broadcast.emit('accepted' + customerID, adData);
  });


  client.on("invite", function (data) {

    const data1 = JSON.parse(data)
    // sending to all customers except sender
    customers = Customer.find({}).then((customer) => {
      customer.forEach((cd, key) => {
        client.broadcast.emit("customer_" + cd._id, data1);
      })
    })
  });

  client.on("join", function (cd) {
    const cdData = JSON.parse(cd)
    joinerID = cdData.customer._id
    // console.log("This is joiner ID"+cdData.customer._id)
    client.broadcast.emit('ridejoined' + customerID, cdData);
  });

  client.on("driverCancel", function (message) {
    client.broadcast.emit('drCanceled' + customerID, message);
  });

  client.on("driverCancel", function (message) {
    client.broadcast.emit('driverCanceled' + joinerID, message);
  });

  client.on("customerCancel", function (message) {
    client.broadcast.emit('cuCanceled' + driverID, message);
  });
});