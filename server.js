const express = require("express");
const app = express();
const { sequelize } = require("./db");
const restaurantRouter = require("./routers/restaurantRouter") //require router

const port = 3000;

app.use(express.json());
app.use(restaurantRouter);

// In this way we can ensure the table is created before starting the server
sequelize.sync().then(function () { // fixed
app.listen(port, () => {
console.log("Your server is listening on port " + port);
});
});