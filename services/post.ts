import mongoose from "mongoose";
import user from "../models/User";
import { Request, Response } from 'express';
import kafkaConfig from "../config/kafka.config";

export const addToCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { addToCart } = req.body;

        // Validate addToCart is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(addToCart)) {
            return res.status(400).json("addToCart is not a valid ObjectId");
        }

        const getData = await user.findById(id);
        if (!getData) {
            return res.status(404).json("First Create User");
        }

        const message = JSON.stringify({ id, addToCart });
        console.log("Sending message to Kafka:", message); // Log the message before sending
        await kafkaConfig.sendMessage("addToCart", message);

        console.log("Post Added to Cart");
        return res.status(200).json("Post Added to Cart");
    } catch (error: any) {
        console.error("Error in addToCart:", error.message); // Log any errors
        return res.status(500).json(error);
    }
};
