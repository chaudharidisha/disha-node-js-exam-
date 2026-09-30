import faculty from "../models/faculty.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    try {

        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const existUser = await faculty.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "Faculty already exists."
            });
        }

        password = await bcrypt.hash(password, 10);

        const user = await faculty.create({
            name,
            email,
            password
        });

        return res.status(201).json({
            message: "Faculty Registered Successfully",
            user
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const user = await faculty.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Faculty does not exist."
            });
        }

        const isValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isValid) {
            return res.status(400).json({
                message: "Password doesn't match."
            });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            message: "Login Success",
            user,
            token
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const getAllFaculty = async (req, res) => {

    try {

        const data = await faculty.find({});

        return res.status(200).json({
            message: "Success",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const updateFaculty = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await faculty.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!data) {
            return res.status(404).json({
                message: "Faculty not found."
            });
        }

        return res.status(200).json({
            message: "Faculty Updated Successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const deleteFaculty = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await faculty.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                message: "Faculty not found."
            });
        }

        return res.status(200).json({
            message: "Faculty Deleted Successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};