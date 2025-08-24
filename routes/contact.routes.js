const express = require("express");
const {
  addContact,
  updateContact,
  getContact,
  getContactByID,
  searchContact,
  deleteContact,
} = require("../controller/contact.controller");

const router = express.Router();

router.post("/contacts", addContact);
router.put("/contacts/:id", updateContact);
router.get("/contacts", getContact);
router.get("/contacts/:id", getContactByID);
router.get("/contacts/search", searchContact);
router.delete("/contacts/:id", deleteContact);
module.exports = router