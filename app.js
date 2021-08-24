const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Driver = require("./model/driver_model")
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
// const { Server } = require('http');

app.use(express.static("images"));
app.use(driver_route);
app.use(route_customer);
app.use(admin_route);
app.use(booking_route);

const PORT = process.env.PORT || 90;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const socket = require('socket.io')
const io = socket(server)

// var io = socketio.listen(server)

io.sockets.on('connection',  function (client) {

  console.log("client connected: " + client.id);

  client.on("message", function (data) {

    const data1 = JSON.parse(data)
    console.log(data1);

    // sending to all drivers except sender
    drivers = Driver.find({}).then((driver)=>{
      driver.forEach((d, key)=>{
        // console.log("Broadcast to: "+ "driver_"+d._id)
        console.log
        client.broadcast.emit("driver_"+d._id, data1);
      })
    })                                             
  });

  client.on("accept", function (ad) {
    const adData = JSON.parse(ad)
    client.broadcast.emit('accepted', adData);
    console.log(adData);
  })
  
})