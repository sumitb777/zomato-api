const locationModel = require("../models/locationModel");

module.exports.getHome = (request, response) => {
    response.send({
        status: true,
        message: "Welcome to api",
    });
};

module.exports.getLocationList = async (req, res) => {
    let result = await locationModel.find();

    res.send({
        status: true,
        result
    });

};