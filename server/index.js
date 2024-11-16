const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

// Cấu hình CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.0.103:5173"], // Địa chỉ của frontend React
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Cho phép gửi cookie, token
};

app.use(cors(corsOptions));
app.use(express.json());

// Định tuyến
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our chat app APIs.");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI || "mongodb://localhost:27017/yourdbname";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
