import express from "express";
import { getItineraries , createItinerary, getItineraryById, updateItinerary, deleteItinerary} from "../controller/itinerary.controller.js";

const router = express.Router();

router.post("/addItinerary", createItinerary);
router.get("/display", getItineraries);
router.get("/:id", getItineraryById);
router.put("/:id", updateItinerary);
router.delete("/:id",  deleteItinerary);
export default router;
