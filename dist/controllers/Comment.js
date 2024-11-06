"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const Comments_1 = __importDefault(require("../models/Comments"));
const Product_1 = __importDefault(require("../models/Product"));
const addComment = async (req, res) => {
    try {
        const { name, discription, id } = req.body;
        // Create a new comment
        const findProduct = await Product_1.default.findById(id);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newComment = new Comments_1.default({
            name,
            discription,
        });
        // Save the comment to the database
        await newComment.save();
        return res.status(201).json({ message: "Comment created successfully", comment: newComment });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.addComment = addComment;
