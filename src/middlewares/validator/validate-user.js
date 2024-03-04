const Joi = require('joi')

const targetUserSchema = Joi.object({
    targetUserId: Joi.number().positive().required()
})

exports.validateTargetUserId = (req,res,next) =>{
    const {value,error} = targetUserSchema.validate(req.params)
    if(error){
        throw error
    }
    req.targetUserId = value.targetUserId
    next()
}

