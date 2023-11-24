let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const mealSchema = new Schema({
    name: { type: String },
    content: { type: String },
    image: { type: String },
    meal_type: { type: Number },
})

const mealTypeModel = mongoose.model("mealType", mealSchema, "mealtypes");

module.exports = mealTypeModel;