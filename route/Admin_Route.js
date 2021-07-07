const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

//login system
router.post('/admin/login', function(req, res){

    const username = req.body.username;
    const password = req.body.password; 

    Admin.findOne({username: username})
    .then(function(adminData){
        if(adminData === null){

            return res.status(403).json({message: "Invalid login credentials!!"});
        }

        bcryptjs.compare(password, adminData.password, function(err, result){
            if(result === false){
                return res.status(403).json({message: "Invalid login credentials!!"});
            }
            
            //token generate
            const token = jwt.sign({adminId: adminData._id}, 'secretkey');
            res.status(200).json({
                messsage : "Auth success",
                token: token
            })
            
        })

    })
    .catch(function(err){
        res.status(500).json({messsage: err})
    })

})

module.exports = router;