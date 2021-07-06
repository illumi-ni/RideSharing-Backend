const Customer = mongoose.model('Customer', {
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    dob:{
        type: String
    },
    gender:{
        type: String
    }
})