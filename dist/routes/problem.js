"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problem_1 = require("../controllers/problem");
const routerProblem = (0, express_1.Router)();
routerProblem.post("/createProduct", problem_1.createProblem);
exports.default = routerProblem;
