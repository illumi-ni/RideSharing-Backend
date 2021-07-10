const mongoose = require('mongoose');
const Driver = require('../model/driver_model');
const Customer = require('../model/customer_model');
const Admin = require('../model/admin_model');
const otp = require('../route/OTPverify');
const url = 'mongodb://127.0.0.1:27017/RideSharing_TestDB';

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

//Admin Login Testing
it("Checking the admin login", () => {
    const admin = {
        'username': 'ride',
        'password': 'ride',
    };
    return Admin.create(admin).then((result) => {
        expect(result.username).toEqual('ride');
    });
});

//Customer Registration Testing
it("Checking the customer login", () => {
    const customer = {
        'fullname': 'ujwalLamichhane',
        'email': 'ujju94576@gmail.com',
        'contact': '1233434567',
        'gender': 'male'
    };
    return Customer.create(customer).then((result) => {
        expect(result.fullname).toEqual('ujwalLamichhane');
    });
});

//Driver Registration Testing
it("Checking the driver registration", () => {
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
    };
    return Driver.create(driver).then((result) => {
        expect(result.fullname).toEqual('Ujjal Lamichhane');
    });
});

//OTP Sending and Verification Testing
describe("Checking if OTP is sent and verified", () => {
    const email = {
        'email': 'krazyme53@gmail.com'
    };

    it("Checking if OTP is sent", () => {
        const { success } = otp.sendOTP(email);
        expect(success).toEqual(true);
    });

    it("Checking if the OTP is verified", () => {
        const { success } = otp.verifyOTP("123456");
        expect(success).toEqual(true);
    });
});
