import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.(com|net)$/).required(),
  password: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9]*$/).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  profileImage: Joi.string().required(), // file path or name (Multer will provide this)
});

export default userSchema;