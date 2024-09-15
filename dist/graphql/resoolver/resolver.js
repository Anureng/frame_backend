"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByID = exports.Product = exports.getUserById = exports.getUser = void 0;
const Product_1 = __importDefault(require("../../models/Product"));
const User_1 = __importDefault(require("../../models/User"));
const getUser = async () => {
    const getUser = await User_1.default.find();
    return getUser;
};
exports.getUser = getUser;
const getUserById = async (params, args) => {
    const getUser = await User_1.default.findById(args.id);
    return getUser;
};
exports.getUserById = getUserById;
const Product = async () => {
    const getProduct = await Product_1.default.find();
    return getProduct;
};
exports.Product = Product;
const getProductByID = async (parent, args) => {
    const getProduct = await Product_1.default.findById(args.id);
    return getProduct;
};
exports.getProductByID = getProductByID;
