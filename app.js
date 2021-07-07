const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))

const db = require('./database/db')
const driver_route = require('./route/DriverRegister_Route')

app.use(express.static("images"))
app.use(driver_route)

app.listen(90)