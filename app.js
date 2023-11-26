
require('dotenv').config();
const express = require("express");
const app = express();
const appRoutes = require('./routes/appRoutes');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const port = process.env.port || 4000;
const mongopass = process.env.databasepass
    ;


const MONGODB_URI = `mongodb+srv://admin:admin123@zomato-cluster.pxfl14v.mongodb.net/zomato-clone`;
app.use(cors());

app.use(express.json()); // json format
app.use(express.urlencoded({ extended: false }));
app.use("/api", appRoutes);

mongoose.connect(MONGODB_URI)

    .then(() => {
        console.log("Database is connected ...")
        app.listen(port, () => {
            console.log("Server is connected ...")
        })
    })
    .catch((error) => {
        console.log(error)
    })



