import mongoose from "mongoose";
import productModel from "../models/Product";
import user from "../models/User";
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email } = req.body;

        // Create a new user
        const newUser = new user({
            name,
            email
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const getUser = await user.find()
        return res.status(200).json(getUser)
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const getSIngleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const getUser = await user.findById(id)
        if (!getUser) {
            return res.status(500).json({ error: "CREATE USER FIRST" });
        }
        return res.status(200).json(getUser)
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export const addToCart = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const { addToCart } = req.body

        if (!mongoose.Types.ObjectId.isValid(addToCart)) return res.status(400).json("addTo cart is not object id")

        const getData = await user.findById(id)

        if (!getData) return res.status(404).json("First Create User")

        getData.cart.push(new mongoose.Types.ObjectId(addToCart));

        await getData.save()
        return res.status(200).json(getData)
    } catch (error) {
        return res.status(500).json(error)
    }
}

