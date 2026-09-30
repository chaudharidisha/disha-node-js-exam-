import attendance from "../models/attendance.model.js";

export const markAttendance = async (req, res) => {

    try {

        const { name, status, date } = req.body;

        if (!name || !status || !date) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const attendanceData = await attendance.create({
            name,
            status,
            date
        });

        return res.status(201).json({
            message: "Attendance Marked Successfully",
            data: attendanceData
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const getTodayAttendance = async (req, res) => {

    try {

        const today = new Date().toISOString().split("T")[0];

        const data = await attendance.find({
            date: today
        });

        return res.status(200).json({
            message: "Today's Attendance",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const getAttendanceByDate = async (req, res) => {

    try {

        const { date } = req.params;

        const data = await attendance.find({
            date
        });

        return res.status(200).json({
            message: "Attendance Found",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const updateAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await attendance.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!data) {
            return res.status(404).json({
                message: "Attendance not found."
            });
        }

        return res.status(200).json({
            message: "Attendance Updated Successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const deleteAttendance = async (req, res) => {

    try {

        const { id } = req.params;

        const data = await attendance.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).json({
                message: "Attendance not found."
            });
        }

        return res.status(200).json({
            message: "Attendance Deleted Successfully",
            data
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};