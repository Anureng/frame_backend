"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/createUser", User_1.createUser);
router.post("/addToCart/:id", User_1.addToCart);
router.post("/decode", auth_1.verifyJwt);
router.post("/login", User_1.login);
exports.default = router;
