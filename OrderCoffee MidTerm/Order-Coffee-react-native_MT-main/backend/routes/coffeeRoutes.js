import express from "express";
import { getMenu, getRandomItem } from "../controllers/coffeeController.js";
const router = express.Router();

router.get("/", getMenu);
router.get("/random", getRandomItem);

export default router;

