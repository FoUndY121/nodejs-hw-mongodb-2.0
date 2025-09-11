import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
    'any.required': `"name" is a required field`,
  }),
  age: Joi.number().integer().min(6).max(16).messages({
    'number.base': `"age" should be a number`,
    'number.min': `"age" should be at least {#limit}`,
    'number.max': `"age" should be at most {#limit}`,
    'any.required': `"age" is required`,
  }),
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'any.only': `"gender" must be one of [male, female, other]`,
    'any.required': `"gender" is required`,
  }),
  avgMark: Joi.number().min(2).max(12),
  onDuty: Joi.boolean(),
  isFavourite: Joi.boolean(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().pattern(/^\+?\d{10,15}$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work', 'other'),
});
