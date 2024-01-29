import Joi from "joi";

export const signUpValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const signInValid = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export const updateUserValid = Joi.object({
  email: Joi.string().required().email(),
});
