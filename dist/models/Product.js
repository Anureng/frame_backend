"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productsSchema = new mongoose_1.default.Schema({
    name: { type: mongoose_1.Schema.Types.String, required: true },
    image: [{ type: mongoose_1.Schema.Types.String, required: true }],
    category: { type: mongoose_1.Schema.Types.String, required: true },
    price: { type: mongoose_1.Schema.Types.Number, required: true },
    stars: { type: mongoose_1.Schema.Types.Number, required: true, min: 1, max: 5 }, // Validation for stars (1 to 5)
    sizeVariants: [{ type: mongoose_1.Schema.Types.String, required: true }],
    colorVariants: [{ type: mongoose_1.Schema.Types.String, required: true }],
    stock: { type: mongoose_1.Schema.Types.Number, required: true, default: 0 }, // Default stock value
    shippingInformation: { type: mongoose_1.Schema.Types.String, required: false },
    warranty: { type: mongoose_1.Schema.Types.String, required: false },
    discount: { type: mongoose_1.Schema.Types.String, required: false },
    comment: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comments', required: false }]
});
const ProductModel = mongoose_1.default.model("ProductModel", productsSchema);
exports.default = ProductModel;
