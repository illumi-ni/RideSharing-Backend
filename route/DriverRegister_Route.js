const express = require('express')
const router = express.Router()
const Driver = require('../model/DriverRegister_Model')
const upload = require('../middleware/upload')

//register for driver
router.post('/admin/register',upload.single('licence'), function(req, res){
    console.log(req.file)
    if(req.file==undefined){
        return res.status(400).json({message:"Invalid field format"})
    }
  const fullname = req.body.fullname
  const email = req.body.email
  const username = req.body.username
  const phone = req.body.phone
  const citizenship = req.body.citizenship
  const licence= req.body.licence
  const dob = req.body.dob
  const vechileNo = req.body.vechileNo
  const model = req.body.model

  //{variable:modelname}
  const DriverData = new Driver({fullname:fullname,email:email,username:username,
    phone:phone,citizenship:citizenship,licence:req.file.filename,dob:dob,vechileNo:vechileNo,model:model})
        DriverData.save()
  .then(function(result){
      res.status(201).json({success:true,message: "Driver Registration has been successfully inserted!!!"})
  })
  .catch(function(e){
      res.status(500).json({message:e})
  })
}) 


module.exports = router