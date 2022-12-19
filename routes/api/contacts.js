const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");

const { schema: contactSchema } = require("../../schemas/contact");
const { validation } = require("../../middlewares");

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;
