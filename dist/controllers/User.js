"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.getSIngleUser = exports.getUser = exports.login = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Create a new user
        const newUser = new User_1.default({
            name,
            email,
            password
        });
        const findUser = await User_1.default.findOne({ email });
        if (findUser)
            return res.status(500).json("User Already Exist");
        // Save the user to the database
        const newUserData = await newUser.save();
        const tokePayLoad = {
            id: newUserData._id,
            email: newUserData.email
        };
        const token = jsonwebtoken_1.default.sign(tokePayLoad, jwtSecret, { expiresIn: "3d" });
        return res.status(200).json({ newUserData, token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await User_1.default.findOne({ email });
        if (!getUser)
            return res.status(400).json("Invalid credentails");
        const tokenPayload = {
            id: getUser._id,
            email: getUser.email
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, jwtSecret, { expiresIn: "3d" });
        return res.status(200).json({ getUser, token });
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.login = login;
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
const addToCart = async (req, res) => {
    const { id } = req.params;
    try {
        const { addToCart } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(addToCart))
            return res.status(400).json("addTo cart is not object id");
        const getData = await User_1.default.findById(id);
        if (!getData)
            return res.status(404).json("First Create User");
        getData.cart.push(new mongoose_1.default.Types.ObjectId(addToCart));
        await getData.save();
        return res.status(200).json(getData);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.addToCart = addToCart;
