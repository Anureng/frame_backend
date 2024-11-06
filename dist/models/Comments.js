"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const comments = new mongoose_1.default.Schema({
    name: String,
    discription: String,
});
const commentModel = mongoose_1.default.model("CommentModel", comments);
exports.default = commentModel;
