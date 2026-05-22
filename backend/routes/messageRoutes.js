const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.get("/:channel", async (req, res) => {
  try {
    const { channel } = req.params;

    const messages = await Message.find({ channel }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;