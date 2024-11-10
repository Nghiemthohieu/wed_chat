const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
    res.send("Welcome to our chat app APIs.");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/yourdbname";

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => {
    console.log("MongoDB connection failed: ", error.message);
    process.exit(1); // Thêm dòng này để thoát và xác định lỗi kết nối
});