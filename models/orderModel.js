const mongoose = require("mongoose")

const schema = mongoose.Schema;

const orderschema = new schema({
    pay_id: { type: String },
    order_id: { type: String },
    signature: { type: String },
    orders: { type: Array },
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    address: { type: String },
    totalAmount: { type: Number },
    rest_id: { type: mongoose.Schema.Types.ObjectId },
    rest_name: { type: String }

});

const orderModel = mongoose.model('orderModel', orderschema, 'orders.Model')

module.exports = orderModel;


