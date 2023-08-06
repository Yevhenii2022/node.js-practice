// /api/v1/cars

const carsController = require("../controllers/Cars");
const authMiddleware = require("../middlewares/authMiddleware");
const rolesMiddleware = require("../middlewares/rolesMiddleware");

const carsRoutes = require("express").Router();

// Add car
// Get all cars
// Get one car
// Update car
// Remove car

carsRoutes.post(
  "/cars",
  authMiddleware,
  (req, res, next) => {
    console.log("joi validation");
    next();
  },
  carsController.add
);
carsRoutes.get(
  "/cars",
  authMiddleware,
  rolesMiddleware(["ADMIN", "MODERATOR", "USER"]),
  carsController.getAll
);
carsRoutes.get("/cars/:id", carsController.getOne);
carsRoutes.put("/cars/:id", carsController.updateOne);
carsRoutes.delete("/cars/:id", carsController.removeOne);

module.exports = carsRoutes;

// ['ADMIN', 'MODERATOR', 'USER', 'CTO']
