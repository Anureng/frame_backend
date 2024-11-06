import { Router } from "express";
import { createUser, login } from "../controllers/User";
import { addToCart } from "../services/post";
import { verifyJwt } from "../middleware/auth";

const router = Router()

router.post("/createUser", createUser)
router.post("/addToCart/:id", addToCart)
router.post("/decode", verifyJwt)
router.post("/login", login)

export default router