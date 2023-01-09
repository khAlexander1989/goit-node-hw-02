const express = require("express");

const { ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const { schemas } = require("../../models/user");
const { validation, authenticate } = require("../../middlewares");

const router = express.Router();

console.log("ctrl: ", ctrl);

router.post(
  "/signup",
  validation(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema, "missing field subscription"),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
