const mongoose = require('mongoose');

const AdvanceBook = mongoose.model('AdvanceBook',{
    fullname:{
        type: String, 
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
    } 
    
});

module.exports = AdvanceBook;