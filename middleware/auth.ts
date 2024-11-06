import jwt from "jsonwebtoken";
import express, { Request, Response } from 'express';

const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";

// Function to generate JWT
export const generateJwt = (payload: object) => {
    return jwt.sign(payload, jwtSecret, { algorithm: "HS256", expiresIn: "1h" });
};

// Middleware to verify JWT
export const verifyJwt = (req: Request, res: Response) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token using jwt.verify with the secret and HS256 algorithm
        const decoded = jwt.verify(token, jwtSecret, { algorithms: ["HS256"] });

        // Return decoded token information if verification is successful
        return res.status(200).json(decoded);
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


