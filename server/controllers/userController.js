const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// user registration 
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check if the user is already exists
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: "User is already exists" })
        }
        // hashing the pwd
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            resetString: ''
        })

        // generate the jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

exports.changePassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
            res.status(404).json({ message: "This user email not exists." });
        }
        const randomString = generateRandomString(25);

        const updatedDocument = await User.findByIdAndUpdate(
            userExists._id,
            { resetString: randomString },
            { new: true }
        );
        
        res.status(201).json({
            user: {
                id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                resetString: updatedDocument.resetString
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.resetPassword = async (req, res) => {
    const { password, confirmPassword, resetString } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const user = await User.findOne({ resetString });
        if (!user) {
            return res.status(404).json({ message: "Invalid reset string." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).json({ message: "Password reset successfully." });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};