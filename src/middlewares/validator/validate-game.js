const Joi = require("joi");
const validate = require("./validatator");
const { CustomError } = require("../../config/error");

const createGameSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Game name is required",
    "any.required": "Game name is required",
  }),
  releasedDate: Joi.date().less("now").required().messages({
    "date.base": "Invalid released date format",
    "any.required": "Game name is required",
    "date.less": "Game must be already released",
  }),
  description: Joi.string().trim(),
  price: Joi.number().required().messages({
    "number.base": "Invalid price",
    "any.required": "Price is required",
  }),
  discount: Joi.string().trim(),
  backgroundImage: Joi.string(),
  metacritic: Joi.string().trim(),
  genres: Joi.any(),
  tags: Joi.any(),
  platforms: Joi.any(),
  screenshots: Joi.any(),
  deletedScreenshotIds: Joi.any(),
});

exports.validateCreateGame = validate(createGameSchema);

exports.validateGameBackgroundImage = (req, res, next) => {
  if (!req.files.backgroundImage) {
    throw new CustomError("Background image is required", "INVALID_INPUT", 400);
  }
  next();
};
