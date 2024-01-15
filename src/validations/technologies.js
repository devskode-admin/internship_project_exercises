import Joi from 'joi';

const technologySchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must contain only letters',
    'string.empty': 'Name is required',
    'string.min': 'Name must have at least 3 chars',
    'string.max': 'Name cannot be more than 20 chars',
    'any.required': 'Name is required',
  }),
  development_side: Joi.string().valid('Frontend', 'Backend', 'Fullstack').required().messages({
    'any.only': 'Development side must be one of this: Frontend, Backend, Fullstack',
    'any.required': 'Development is required',
  }),
});

export default technologySchema;
