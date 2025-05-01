import express from "express";
import { serviceController } from "./bikeServices.controller";

const router = express.Router();

router.post("/", serviceController.createServiceRecord);
router.get("/", serviceController.getAllServiceRecords);
router.get("/status", serviceController.getOverdueServices);
router.get("/:id", serviceController.getServiceRecordById);
router.put("/:id/complete", serviceController.completeService);

export const serviceRoutes = router;
