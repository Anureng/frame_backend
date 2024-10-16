import { Router } from "express";
import { addToCart, createUser, login } from "../controllers/User";
import { verifyJwt } from "../middleware/auth";

const router = Router()

router.post("/createUser", createUser)
router.post("/addToCart/:id", addToCart)
router.post("/decode", verifyJwt)
router.post("/login", login)

export default router