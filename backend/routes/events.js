const express = require("express");
const jwt = require("jsonwebtoken");
const Event = require("../models/Event");

const router = express.Router();

const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token)
		return res.status(401).json({ msg: "No token, authorization denied" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};

router.post("/", authMiddleware, async (req, res) => {
	try {
		const event = new Event({ ...req.body, owner: req.user.id });
		await event.save();
		res.status(201).json(event);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put("/:id", authMiddleware, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ msg: "Event not found" });

		if (event.owner.toString() !== req.user.id)
			return res.status(403).json({ msg: "Not authorized" });

		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.json(updatedEvent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ msg: "Event not found" });

		if (event.owner.toString() !== req.user.id)
			return res.status(403).json({ msg: "Not authorized" });

		await event.deleteOne();
		res.json({ msg: "Event deleted" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
