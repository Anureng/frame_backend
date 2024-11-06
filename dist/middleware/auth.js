"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = "THISISTHESECRETKEYOFDCODEBLOCKJSONWEBTOKENITSVERYBESTWEBSITETOSOLVEPROBLEMs";
// Function to generate JWT
const generateJwt = (payload) => {
    return jsonwebtoken_1.default.sign(payload, jwtSecret, { algorithm: "HS256", expiresIn: "1h" });
};
exports.generateJwt = generateJwt;
// Middleware to verify JWT
const verifyJwt = (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        // Check if the token is provided
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify the token using jwt.verify with the secret and HS256 algorithm
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret, { algorithms: ["HS256"] });
        // Return decoded token information if verification is successful
        return res.status(200).json(decoded);
    }
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyJwt = verifyJwt;
