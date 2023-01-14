const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const {
  ctrlWrapper,
  validateId,
  validation,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, validateId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.addSchema, "missing required name field"),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  validateId,
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validation(schemas.addSchema, "missing fields"),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validation(schemas.updateFavoriteSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
