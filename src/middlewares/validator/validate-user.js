const Joi = require('joi')

const targetUserSchema = Joi.object({
    targetUserId: Joi.number().positive().required()
})

exports.validateTargetUserId = (req,res,next) =>{
    const {value,error} = targetUserSchema.validate
}