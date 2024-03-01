import Joi from "joi";
const validate = require('./validatator')

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
  }),
  firstname: Joi.string().required().trim().messages({
    'string.emty':'firstname is required',
    'any.required':'firstname is required'
    }),
  lastname: Joi.string().required().trim().messages({
    'string.emty':'lastname is required',
    'any.required':'lastname is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  isAdmin: Joi.boolean().required().messages({
        'any.required':'please select admin or user'
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
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "Confirm password is required.",
      "any.only": "Passwords do not match.",
    })
    .strip(),
});

const validateRegister = (input) => validate(registerSchema)(input);
export default validateRegister;