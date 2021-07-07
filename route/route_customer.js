const express = require('express')
const router = express.Router()
const Customer = require('../model/model_customer')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const{check, validationResult} = require('express-validator')

//Customer Sign up
router.post('/customer/insert',[
    check('fullname', "Please enter your name").not().isEmpty(),
    check('email', "Invalid Email address").isEmail(),
    check('contact', "Please enter valid contact").not().isEmpty(),
    check('gender', "Please choose a gender").not().isEmpty()
], function(req, res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const fullname = req.body.fullname
        const email = req.body.email
        const contact = req.body.contact
        const gender = req.body.gender
        
        const CustomerData = new Customer({fullname:fullname, email:email, contact:contact, gender: gender})
        CustomerData.save()
        //error handling
        .then(function(result){
            res.status(201).json({message: "customer Regsitered!!", success: true})
        }).catch(function(err){
            res.status(500).json({message: err, success: false})
        })
    
    }else{
        res.status(400).json(errors.array())
    }
})


module.exports = router

