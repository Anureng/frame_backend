"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";
const verifyJwt = async (req, res) => {
    try {
        // Extract the token from Authorization header or cookies
        const token = req.header("Authorization")?.replace("Bearer ", "");
        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify the token using jwt.verify
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Return decoded token information if verification is successful
        return res.status(200).json(decoded);
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyJwt = verifyJwt;
