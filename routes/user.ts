import { Router } from "express";
import { addToCart, createUser } from "../controllers/User";

const router = Router()

router.post("/createUser", createUser)
router.post("/addToCart/:id", addToCart)

export default router