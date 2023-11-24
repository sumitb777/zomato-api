let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const menuitemsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    ingridients: { type: Array },
    restaurantId: { type: Schema.Types.ObjectId },
    image: { type: String },
    qty: { type: Number },
    price: { type: Number }
})

const menuItemsModel = mongoose.model("menuitem", menuitemsSchema, "menuitems");

module.exports = menuItemsModel;