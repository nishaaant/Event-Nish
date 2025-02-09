require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("joinEvent", (eventId) => {
		socket.join(eventId);
	});

	socket.on("updateAttendees", (eventId) => {
		io.to(eventId).emit("refreshAttendees");
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
