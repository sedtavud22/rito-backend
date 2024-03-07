const Joi = require("joi");
const validate = require("./validatator");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
  }),
  firstName: Joi.string().required().trim().messages({
    "string.empty": "firstname is required",
    "any.required": "firstname is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "lastname is required",
    "any.required": "lastname is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character and atleast 6 characters.",
    }),
});

const changePasswordSchema = Joi.object({
  token: Joi.string().required().trim().messages({
    "string.empty": "Token is required",
    "any.required": "Token is required",
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character and atleast 6 characters.",
    }),
});

exports.validateRegister = validate(registerSchema);

exports.validateChangePassword = validate(changePasswordSchema);
