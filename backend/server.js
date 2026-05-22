const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const dns = require("dns");
const { Server } = require("socket.io");

const Message = require("./models/Message");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChannel", (channel) => {
    socket.join(channel);
    console.log(`User joined channel: ${channel}`);
  });

  socket.on("sendMessage", async (messageData) => {
    try {
      const savedMessage = await Message.create({
        channel: messageData.channel,
        text: messageData.text,
        sender: messageData.sender,
      });

      io.to(messageData.channel).emit("receiveMessage", savedMessage);
    } catch (error) {
      console.log("Message error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });