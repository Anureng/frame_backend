import productModel from "../../models/Product";
import user from "../../models/User"

export const getUser = async () => {
    const getUser = await user.find();
    return getUser
}

export const getUserById = async (params: any, args: { id: string }) => {
    const getUser = await user.findById(args.id)
    return getUser
}

export const Product = async () => {
    const getProduct = await productModel.find()
    return getProduct
}

export const getProductByID = async (parent: any, args: { id: string }) => {
    const getProduct = await productModel.findById(args.id)
    return getProduct
}