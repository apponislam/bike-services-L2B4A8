import express from "express";
import { bikeController } from "./bikes.controller";

const router = express.Router();

router.post("/", bikeController.createBike);
router.get("/", bikeController.getAllBikes);
router.get("/:id", bikeController.getBikeById);

export const bikeRoutes = router;
