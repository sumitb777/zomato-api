const express = require('express');
const locationcontroller = require("../controllers/locationcontroller");
const RestaurantController = require("../controllers/restaurantController");
const userController = require("../controllers/userController")
const paymentController = require("../controllers/paymentController")
const appRoutes = express.Router();


appRoutes.get('/', locationcontroller.getHome);
appRoutes.get('/get-location-list', locationcontroller.getLocationList);
appRoutes.get('/get-Restaurants-locationid/:loc_id', RestaurantController.getRestaurants);
appRoutes.get('/getRestaurantsDetails-by-id/:id', RestaurantController.getRestaurantsByid);
appRoutes.get('/get-meal-type', RestaurantController.getmealtype);
appRoutes.get('/get-menu-Items-ByRestaurant-id/:r_id', RestaurantController.getmenuItemsByRestaurantid);
appRoutes.post('/create-user', userController.createUser)
appRoutes.post('/login', userController.login)
appRoutes.post('/filterRestaurants', RestaurantController.filter);
appRoutes.post('/get-order-id', paymentController.createOrderId)
appRoutes.post('/confirmPayment', paymentController.confirmPayment)



module.exports = appRoutes;