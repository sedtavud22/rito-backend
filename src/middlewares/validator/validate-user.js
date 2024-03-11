const Joi = require("joi");
const { CustomError } = require("../../config/error");

const targetUserSchema = Joi.object({
  targetUserId: Joi.number().positive().required(),
});

exports.validateTargetUserId = (req, res, next) => {
  const { value, error } = targetUserSchema.validate(req.params);
  if (error) {
    throw error;
  }
  req.targetUserId = value.targetUserId;
  next();
};

exports.validateAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new CustomError("Unauthorized", "UNAUTHORIZED", 403);
  }
  next();
};
