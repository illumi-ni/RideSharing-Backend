const mongoose = require('mongoose');

const Ride = mongoose.model('Ride',{
    fullname:{
        type: String, 
        required: true  
    },
    from:{
        type: String,
          
    },
    to:{
        type:String
    },
    date:{
        type:String,
        required:true
    },
    time: {
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    price:{
        type:String
    },
    photo:{
        type:String
    },
    driver:{
        driverID: { type: Schema.Types.ObjectId, ref: "drivers", required: true }
    }
});

module.exports = Ride;