const restaurantModel = require("../models/restaurantModel");
const mealTypeModel = require("../models/mealTypeModel");
const menuItemsModel = require("../models/menuItemsModel");


module.exports.getRestaurants = async (request, response) => {
    let { loc_id } = request.params;
    let result = await restaurantModel.find(
        {
            location_id: loc_id
        }, {
        name: 1,
        city: 1,
        locality: 1,
        image: 1,
    });
    response.send({
        status: true,
        result
    });
}

module.exports.getRestaurantsByid = async (request, response) => {
    let { id } = request.params;

    let result = await restaurantModel.findById(id);

    response.send({

        status: true,
        result
    })
}

module.exports.getmealtype = async (request, response) => {

    let result = await mealTypeModel.find();

    response.send({
        status: true,
        result
    });
}

module.exports.getmenuItemsByRestaurantid = async (request, response) => {
    let { r_id } = request.params;
    let result = await menuItemsModel.find({ restaurantId: r_id });
    response.send({
        status: true,
        result
    });

}
module.exports.filter = async (request, response) => {
    let { meal_type, location, cuisine, lcost, hcost, page, sort } = request.body;
    // let filter = {};
    let payload = {};

    // if (location !== undefined) payload["location_id"] = location;
    // if (meal_type !== undefined) payload["mealtype_id"] = meal_type;
    // if (cuisine !== undefined) payload["cuisine.id"] = { $in: cuisine };
    // if (lcost !== undefined && hcost !== undefined) {
    //     payload["min_price"] = { $lt: hcost, $gt: lcost };
    // }
    page = page ? page : 1;
    sort = sort ? sort : 1;

    const itemperPage = 2;

    let startIndex = (page - 1) * itemperPage;
    let endIndex = itemperPage * page;

    if (meal_type) {
        payload["mealtype_id"] = meal_type;
    }
    if (meal_type && cuisine) {
        payload["mealtype_id"] = meal_type;
        payload["cuisine.id"] = cuisine;
    }
    if (meal_type && lcost && hcost) {
        payload["mealtype_id"] = meal_type;
        payload["min_price"] = { $lt: hcost, $gte: lcost };

        // { $and: [{ $gte: lcost }, { $lte: hcost }] }
        // { $gte: lcost, $lte: hcost };
    }
    if (meal_type && cuisine && lcost && hcost) {
        payload["mealtype_id"] = meal_type;
        payload["cuisine.id"] = { $in: cuisine };
        payload["min_price"] = { $gte: lcost, $lte: hcost };
    }
    if (meal_type && location) {
        payload["mealtype_id"] = meal_type;
        payload["location_id"] = location;
    }
    if (meal_type && cuisine && location) {
        payload["mealtype_id"] = meal_type;
        payload["cuisine.id"] = { $in: cuisine };
        payload["location_id"] = location;
    }
    if (meal_type && location && lcost && hcost) {
        payload["mealtype_id"] = meal_type;
        payload["location_id"] = location;
        payload["min_price"] = { $gte: lcost, $lte: hcost };
    }
    if (meal_type && cuisine && location && lcost && hcost) {
        payload["mealtype_id"] = meal_type;
        payload["location_id"] = location;
        payload["min_price"] = { $gte: lcost, $lte: hcost };
        payload["cuisine.id"] = { $in: cuisine };
    }


    let result = await restaurantModel.find(payload, {
        name: 1,
        city: 1,
        locality: 1,
        image: 1,
        mealtype_id: 1,
        cuisine: 1,
        min_price: 1,
        // for sortin
    }).sort({ "min_price": sort });

    //pagination useing sloce method

    const filterresult = result.slice(startIndex, endIndex);
    response.send({
        status: true,
        filterresult,
    });

};
