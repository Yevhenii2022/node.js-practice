const CarsModel = require("../models/Cars");
const asyncHandler = require("express-async-handler");

class Cars {
  add = asyncHandler(async (req, res) => {
    const { color, model } = req.body;
    if (!color || !model) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const car = await CarsModel.create({ ...req.body, owner: req.user.id });
    if (!car) {
      res.status(400);
      throw new Error("Unable to save");
    }
    res.status(201).json({ code: 201, data: car });
  });

  getAll = asyncHandler(async (req, res) => {
    const cars = await CarsModel.find({ owner: req.user.id });
    if (!cars) {
      res.status(400);
      throw new Error("Unable to fetch cars");
    }
    res.status(200).json({ code: 200, data: cars, qty: cars.length });
  });

  getOne = asyncHandler(async (req, res) => {
    const car = await CarsModel.findById(req.params.id);
    if (!car) {
      res.status(404);
      throw new Error("there is no such car in collection");
    }
    res.status(200).json({ code: 200, data: car });
  });

  updateOne = asyncHandler(async (req, res) => {
    const { color, model } = req.body;
    if (!color || !model) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const updatedCar = await CarsModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCar) {
      res.status(404);
      throw new Error(`Unable to update ${req.params.id}`);
    }
    res.status(200).json({ code: 200, data: updatedCar });
  });

  removeOne = asyncHandler(async (req, res) => {
    const deletedCar = await CarsModel.findByIdAndRemove(req.params.id);
    if (!deletedCar) {
      res.status(404);
      throw new Error(`No such car ${req.params.id}`);
    }
    res.status(200).json({ message: "success delete" });
  });
}

module.exports = new Cars();
