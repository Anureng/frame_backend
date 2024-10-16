import jwt from "jsonwebtoken"
import express, { Request, Response } from 'express';
const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";

export const verifyJwt = async (req: Request, res: Response) => {
    try {
        // Extract the token from Authorization header or cookies
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token using jwt.verify
        const decoded = jwt.verify(token, jwtSecret);

        // Return decoded token information if verification is successful
        return res.status(200).json(decoded);
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


