const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", async (req, res, next) => {
  try {
    const drones = await Drone.find();

    res.render("drones/list", { drones });
  } catch (err) {
    console.error(err);
  }
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const droneToCreate = req.body;
    await Drone.create(droneToCreate);

    res.redirect("/drones");
  } catch {
    res.redirect("/drones/create");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const drone = await Drone.findById(req.params.id);

    res.render("drones/update-form", { drone });
  } catch {
    next();
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneToUpdate = req.body;
    await Drone.findByIdAndUpdate(req.params.id, droneToUpdate);

    res.redirect("/drones");
  } catch {
    res.redirect(`/drones/${req.params.id}/edit`);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    await Drone.findByIdAndUpdate(req.params.id);

    res.redirect("/drones");
  } catch {
    res.send("Error");
  }
});

module.exports = router;
