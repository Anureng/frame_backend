"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const kafka_config_1 = __importDefault(require("../config/kafka.config"));
const addToCart = async (req, res) => {
    const { id } = req.params;
    try {
        const { addToCart } = req.body;
        // Validate addToCart is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(addToCart)) {
            return res.status(400).json("addToCart is not a valid ObjectId");
        }
        const getData = await User_1.default.findById(id);
        if (!getData) {
            return res.status(404).json("First Create User");
        }
        const message = JSON.stringify({ id, addToCart });
        console.log("Sending message to Kafka:", message); // Log the message before sending
        await kafka_config_1.default.sendMessage("addToCart", message);
        console.log("Post Added to Cart");
        return res.status(200).json("Post Added to Cart");
    }
    catch (error) {
        console.error("Error in addToCart:", error.message); // Log any errors
        return res.status(500).json(error);
    }
};
exports.addToCart = addToCart;
