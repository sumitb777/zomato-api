const Razorpay = require("razorpay");
var crypto = require("crypto");
const keyid = process.env.keyid;
const keySecret = process.env.keySecret;
const orderModel = require("../models/orderModel")

var instance = new Razorpay({
    key_id: keyid,
    key_secret: keySecret,
});

module.exports.createOrderId = (request, response) => {
    let { amount } = request.body;

    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    instance.orders.create(options, function (error, order) {
        if (error) {
            let errorObj = { status: false, error };
            response.status(500).send(errorObj);
        } else {
            let sendData = {
                status: true,
                order,
            };
            response.status(200).send(sendData);
        }

    })

}

module.exports.confirmPayment = (async (request, response) => {
    let { payment_id, order_id, signature } = request.body;
    let data = request.body;

    var serverSignature = crypto
        .createHmac("sha256", keySecret)
        .update(order_id + "|" + payment_id)
        .digest("hex");

    if (serverSignature === signature) {
        // order details
        saveOrder(data)
        response.send({
            status: true,
        });
    } else {
        response.send({
            status: false,
        });
    }


})

let saveOrder = async (data) => {
    // save a data in database
    // here data variable is an {} & it's a client data
    // save single data
    let saveData = {
        pay_id: data.pay_id,
        order_id: data.order_id,
        signature: data.signature,
        orders: data.orders,
        name: data.name,
        email: data.email,
        contact: data.contact,
        address: data.address,
        totalAmount: data.totalAmount,
        rest_id: data.rest_id,
        rest_name: data.rest_name,
    };
    // save in data in database
    let newOrder = new orderModel(saveData);
    let result = await newOrder.save();

    if (result) {
        return true;
    } else {
        return false;
    }
};