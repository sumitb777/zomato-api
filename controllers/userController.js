const { response } = require("express")
const usermodel = require("../models/userModel")
var jwt = require('jsonwebtoken');
const key = "abcd123"

module.exports.createUser = async (request, response) => {

    let data = request.body;
    let newUser = new usermodel({
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        password: data.password
    });

    let result = await newUser.save();
    if (result) {
        response.send({
            status: true,
            massage: "User is Created",
            result
        });
    }
    else {
        response.send({
            status: false,
            massage: "User is Not Created"
        });
    }
};
module.exports.login = async (request, response) => {
    let data = request.body;
    let result = await usermodel.findOne({
        email: data.email,
        password: data.password
    },
        {
            password: 0
        }
    )
    if (result) {
        let data = {
            name: result.name,
            id: result._id,
            email: result.email,
            mobile: result.mobile,
        };
        let token = jwt.sign(data, key, { expiresIn: "24h" });
        response.send({
            status: true,
            username: result.name,
            massage: "User is logged in",
            token
        });
    }
    else {
        response.send({
            status: false,
            massage: "User is Not Exits"
        });
    }

}