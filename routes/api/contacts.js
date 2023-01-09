const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, validateId } = require("../../middlewares");

const { schemas } = require("../../models/contact");
const { validation } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", validateId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(schemas.addSchema, "missing required name field"),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", validateId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validateId,
  validation(schemas.addSchema, "missing fields"),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validation(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
