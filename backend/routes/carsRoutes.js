// /api/v1/cars

const carsController = require("../controllers/Cars");

const carsRoutes = require("express").Router();

// Add car
// Get all cars
// Get one car
// Update car
// Remove car

carsRoutes.post(
  "/cars",
  (req, res, next) => {
    console.log("joi validation");
    next();
  },
  carsController.add
);
carsRoutes.get("/cars", carsController.getAll);
carsRoutes.get("/cars/:id", carsController.getOne);
carsRoutes.put("/cars/:id", carsController.updateOne);
carsRoutes.delete("/cars/:id", carsController.removeOne);

module.exports = carsRoutes;
