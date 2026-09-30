import express from "express";
import authRoute from "./routes/auth.route.js";
import attendanceRoute from "./routes/attendance.route.js";

const app = express();
const PORT = process.env.PORT || 8080;

db();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Attendance API is Running!"
    });
});

app.use("/api/auth", authRoute);
app.use("/api/attendance", attendanceRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});