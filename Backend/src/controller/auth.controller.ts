import { userModel } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import bcrypt from "bcryptjs";
export async function registerUser(req: any, res: any) {
    const { username, email, password } = req.body;
    const user = await userModel.create({ username, email, password });
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, config.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user
    });
}

export async function loginUser(req: any, res: any) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, config.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user
    });
}

export async function getUser(req: any, res: any) {
    const user = await userModel.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user
    });
}

export async function logoutUser(req: any, res: any) {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    });
}