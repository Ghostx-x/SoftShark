import Joi from 'joi'

const userSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    profession: Joi.string().alphanum(),
    metadata: Joi.object().optional()
})

export default userSchema