const mongoose = require('mongoose')
const Driver = require('../model/DriverRegister_Model')
const url = 'mongodb://127.0.0.1:27017/RideSharing_TestDB'

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
    //Driver Registration Testing
    it("Checking if registration works", () => {
        const driver = {
            'fullname': 'Ujjal Lamichhane',
            'email': 'ujjal123@gmail.com',
            'username': 'ujjal12',
            'phone': '12422354234',
            'citizenship': '9127-23-123',
            'licence': '124-123-123',
            'dob': '12-08-2000',
            'vechileNo': 'ba24-3141',
            'model': 'suzuki',
        } 
        return Driver.create(driver)
            .then((result) => {
                expect(result.fullname).toEqual('Ujjal Lamichhane')
            })
    })