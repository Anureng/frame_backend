import productModel from "../models/Product";
import { Request, Response } from 'express';

export const createProblem = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, image, category, price, stars, sizeVariants, colorVariants, stock, shippingInformation, warranty, discount, comment } = req.body;


        // Create a new user
        const newUser = new productModel({
            name,
            image,
            category,
            price,
            stars,
            sizeVariants,
            colorVariants,
            stock,
            shippingInformation,
            warranty,
            discount,
            comment
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getProblem = async (req: Request, res: Response) => {
    try {
        const getProblem = await productModel.find()
        return res.status(200).json(getProblem)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getProblemById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const getProblem = await productModel.findById(id)
        if (!getProblem) return res.status(400).json("First Create Product")
        return res.status(200).json(getProblem)
    } catch (error) {
        return res.status(500).json(error)
    }
}