const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidateErrors } = require("../utils");

const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: [8, "too short password"],
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: EMAIL_REGEXP,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidateErrors);

const User = model("user", userSchema);

const signupSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEXP).required(),
  password: Joi.string().min(8).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const schemas = {
  loginSchema,
  signupSchema,
  updateSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};
