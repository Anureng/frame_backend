import mongoose, { Schema, Document } from "mongoose";

interface IProducts extends Document {
    name: string,
    image: string[],
    category: string,
    price: string,
    stars: string
}

const products: Schema<IProducts> = new mongoose.Schema({
    name: String,
    image: [String],
    category: String,
    price: String,
    stars: String
})

const productModel = mongoose.model<IProducts>("ProductModel", products)
export default productModel