const express = require("express");
const Contact = require("../model/Contact.model");

//Creating new list
function addContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const newContact = new Contact({
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    });
    newContact.save();
    res.status(201).send({ message: "Contact added successfully", newContact });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal server error" });
  }
}

//updating contact
async function updateContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const updateID = req.params.id;

    const contact = await Contact.findById(updateID);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;
    contact.updatedAt = new Date();

    await contact.save();

    res.status(200).send({ message: "Contact updated successfully", contact });
  } catch (error) {
    console.error("Error in updateContact:", error.message);
    res.status(500).send({ message: "internal server error" });
  }
}


// getting all contact
async function getContact(req, res) {
  try {
    const allContact = await Contact.find();
    res
      .status(200)
      .send({ message: "Contact fetched successfully", allContact });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal server error" });
  }
}

//getting with id
async function getContactByID(req, res) {
  try {
    const id = req.params.id;
    const contactId = await Contact.findById(id);

    if (!contactId) {
      return res.status(404).send({ message: "Invalid ID" });
    }

    res.status(200).send({ message: "Contact fetched", contactId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal server error" });
  }
}

//getting contact search
async function searchContact(req, res) {
  try {
    const { name, email } = req.query;

    console.log("Query received:", req.query);

    let contactName = null;
    if (name) {
      contactName = await Contact.findOne({ name: name });
    } else if (email) {
      contactName = await Contact.findOne({ email: email });
    }

    if (!contactName) {
      return res.status(404).send({ message: "No contact found" });
    }

    res.status(200).send({ message: "Contact data fetched", contactName });
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
}


//deleting
async function deleteContact(req, res) {
  try {
    const deleteId = await Contact.findByIdAndDelete(req.params.id);

    if (!deleteId) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.status(200).send({ message: "Contact deleted successfully", deleteId });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal server error" });
  }
}

module.exports = {
  addContact,
  updateContact,
  getContact,
  getContactByID,
  searchContact,
  deleteContact,
};
