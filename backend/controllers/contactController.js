import ContactMessage from "../models/ContactMessage.js";

/**
 * USER: Submit contact form
 */
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Get messages (filter by status)
 */
export const getAllMessages = async (req, res) => {
  try {
    const { status } = req.query; // all | pending | handled

    const filter =
      status && status !== "all" ? { status } : {};

    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Update message status
 */
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { status: "handled" },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Delete message
 */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactMessage.findByIdAndDelete(id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
