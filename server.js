const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

// load the enironment variable file
require("dotenv").config({path: "./config/keys.env"});

const app = express();


// Handlebars middleware
// this tells Express to set handlebars as the template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

//loald controllers
/*
    localhost:3000/
    localhost:3000/contact-us
    localhost:3000/product/list
    localhost:3000/product/add
*/
const generalController = require("./controllers/general.js");
const productController = require("./controllers/product.js");

// map each controller to the app object
app.use("/", generalController);
app.use("/product", productController);

//set up server
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Website Server is up and running!`);
});