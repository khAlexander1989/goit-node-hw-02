const express = require("express");

const { ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const { schemas } = require("../../models/user");
const { validation, authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validation(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post(
  "/verify",
  validation(
    schemas.resendVerificationEmailSchema,
    "missing required field email"
  ),
  ctrlWrapper(ctrl.resendVerificationEmail)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.patch(
  "/",
  authenticate,
  validation(schemas.updateSubscriptionSchema, "missing field subscription"),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
