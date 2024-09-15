"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSIngleUser = exports.getUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        // Create a new user
        const newUser = new User_1.default({
            name,
            email
        });
        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const getUser = await User_1.default.find();
        return res.status(200).json(getUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getUser = getUser;
const getSIngleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await User_1.default.findById(id);
        if (!getUser) {
            return res.status(500).json({ error: "CREATE USER FIRST" });
        }
        return res.status(200).json(getUser);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getSIngleUser = getSIngleUser;
