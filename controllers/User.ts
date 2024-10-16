import mongoose from "mongoose";
import productModel from "../models/Product";
import user from "../models/User";
import { Request, Response } from 'express';
import jwt from "jsonwebtoken"

const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body;

        // Create a new user
        const newUser = new user({
            name,
            email,
            password
        });

        const findUser = await user.findOne({ email })
        if (findUser) return res.status(500).json("User Already Exist")

        // Save the user to the database
        const newUserData = await newUser.save();

        const tokePayLoad = {
            id: newUserData._id,
            email: newUserData.email
        }
        const token = jwt.sign(tokePayLoad, jwtSecret, { expiresIn: "3d" })

        return res.status(200).json({ newUserData, token });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const getUser = await user.findOne({ email })
        if (!getUser) return res.status(400).json("Invalid credentails")
        const tokenPayload = {
            id: getUser._id,
            email: getUser.email
        }

        const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "3d" })

        return res.status(200).json({ getUser, token })
    } catch (error) {
        return res.status(500).json(error)
    }
}

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

