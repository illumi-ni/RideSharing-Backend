const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended : false}))

const db = require('./database/db')

const route_customer = require('./route/route_customer')

app.use(route_customer)
app.listen(90)