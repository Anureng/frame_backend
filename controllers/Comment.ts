import commentModel from "../models/Comments";
import { Request, Response } from 'express';
import productModel from "../models/Product";

export const addComment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, discription, id } = req.body;

        // Create a new comment
        const findProduct = await productModel.findById(id);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newComment = new commentModel({
            name,
            discription,
        });

        // Save the comment to the database
        await newComment.save();

        return res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
} 
