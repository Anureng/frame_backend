import { Router } from "express";
import { createProblem } from "../controllers/problem";

const routerProblem = Router()

routerProblem.post("/createProduct", createProblem)

export default routerProblem