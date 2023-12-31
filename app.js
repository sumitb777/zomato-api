
require('dotenv').config();
const express = require("express");
const app = express();
const appRoutes = require('./routes/appRoutes');
const mongoose = require("mongoose");
const cors = require("cors");
const mongopass = process.env.mongopass
const port = process.env.port || 4000;



const MONGODB_URI = `mongodb+srv://admin:${mongopass}@zomato-cluster.pxfl14v.mongodb.net/zomato-clone`;
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



