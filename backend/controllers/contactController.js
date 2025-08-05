import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";

// Create a new contact message
export const createContact = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const contact = new Contact({
    message,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});

// Get all contact messages
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
});
