import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Signup Route
router.post('/Signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ status: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
        });

        await newUser.save();
        return res.status(201).json({ status: true, message: "Record registered" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
});

// Signin Route
router.post('/Signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not registered" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: false, message: "Password is incorrect" });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, process.env.KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set maxAge to 1 hour
        return res.status(200).json({ status: true, message: "Signin successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
});

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not registered" });
        }

        const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "5m" });

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Ensure the correct link is generated
        const message = `Click on the link to reset your password: <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>`;

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: user.email,
            subject: "Reset Password",
            html: message,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ status: true, message: "Password reset link sent to email" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Something went wrong" });
    }
});


// GET Reset Password Route
router.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.KEY);
        if (!decoded) {
            return res.status(400).json({ status: false, message: "Invalid or expired token" });
        }

        // Token is valid; you can send back the user ID or a reset password form
        return res.status(200).json({ status: true, message: "Token is valid", userId: decoded.id });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ status: false, message: "Invalid or expired token" });
    }
});

// POST Reset Password Route
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.KEY);
        if (!decoded) {
            return res.status(400).json({ status: false, message: "Invalid or expired token" });
        }

        // Find the user and update the password
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        return res.status(200).json({ status: true, message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Something went wrong" });
    }
});

export default router;
