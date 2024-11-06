import mongoose, { Schema, Document } from "mongoose";

interface IProducts extends Document {
    name: string;
    image: string[];
    category: string;
    price: number;
    stars: number;
    sizeVariants: string[];
    colorVariants: string[];
    stock: number;
    shippingInformation?: string;
    warranty?: string;
    discount?: string;
    specifications: Record<string, any>;
    comment: mongoose.Types.ObjectId[];
}

const productsSchema: Schema<IProducts> = new mongoose.Schema({
    name: { type: Schema.Types.String, required: true },
    image: [{ type: Schema.Types.String, required: true }],
    category: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    stars: { type: Schema.Types.Number, required: true, min: 1, max: 5 }, // Validation for stars (1 to 5)
    sizeVariants: [{ type: Schema.Types.String, required: true }],
    colorVariants: [{ type: Schema.Types.String, required: true }],
    stock: { type: Schema.Types.Number, required: true, default: 0 }, // Default stock value
    shippingInformation: { type: Schema.Types.String, required: false },
    warranty: { type: Schema.Types.String, required: false },
    discount: { type: Schema.Types.String, required: false },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comments', required: false }]
});

const ProductModel = mongoose.model<IProducts>("ProductModel", productsSchema);
export default ProductModel;
