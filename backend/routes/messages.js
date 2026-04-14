import { Router } from "express";
import { body, validationResult } from "express-validator";
import Message from "../models/message.js";

const router = Router();

// GET /messages — получить все сообщения
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

// POST /messages — добавить сообщение
router.post(
  "/",
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const newMessage = await Message.create({ message: req.body.message });
      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }
);

// PUT /messages/:id — редактировать сообщение
router.put(
  "/:id",
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const msg = await Message.findByPk(req.params.id);
      if (!msg) return res.status(404).json({ message: "Not found" });
      msg.message = req.body.message;
      await msg.save();
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /messages/:id — удалить сообщение
router.delete("/:id", async (req, res, next) => {
  try {
    const msg = await Message.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: "Not found" });
    await msg.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;