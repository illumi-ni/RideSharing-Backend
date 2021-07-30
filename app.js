const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ws = require('ws');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./database/db');
const driver_route = require('./route/driver_route');
const route_customer = require('./route/customer_route');
const admin_route = require('./route/admin_route');
const booking_route = require('./route/bookingAdvance_route');

app.use(express.static("images"));
app.use(driver_route);
app.use(route_customer);
app.use(admin_route);
app.use(booking_route);

const PORT = process.env.PORT || 90;
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', socket => {
  console.log("New user connected");
  
  socket.on('message', function incoming(data) {
    // const obj = JSON.parse({ data })
    console.log(data)
  });

  // socket.send("Hello from the server");

  // const cus = new Customer({ fullname: "fullname", email: "email", contact: "contact", gender: "gender" });
  // socket.send(JSON.stringify(cus));
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});