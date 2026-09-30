import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Absent",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const attendance = mongoose.model("attendance", attendanceSchema);

export default attendance;