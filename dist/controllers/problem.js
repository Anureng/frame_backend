"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProblemById = exports.getProblem = exports.createProblem = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProblem = async (req, res) => {
    try {
        const { name, image, category, price, stars } = req.body;
        // Create a new user
        const newUser = new Product_1.default({
            name,
            image,
            category,
            price,
            stars
        });
        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createProblem = createProblem;
const getProblem = async (req, res) => {
    try {
        const getProblem = await Product_1.default.find();
        return res.status(200).json(getProblem);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getProblem = getProblem;
const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const getProblem = await Product_1.default.findById(id);
        if (!getProblem)
            return res.status(400).json("First Create Product");
        return res.status(200).json(getProblem);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.getProblemById = getProblemById;
