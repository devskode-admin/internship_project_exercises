import Joi from 'joi';

const professionalSchema = Joi.object({
  first_name: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name could not be empty',
      'string.min': 'First Name must have at least 3 chars',
      'string.max': 'First Name cannot be more than 20 chars',
      'string.pattern.base': 'First Name must contain only letters',
      'any.required': 'First Name is required',
    }),
  last_name: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name could not be empty',
      'string.min': 'Last Name must have at least 3 chars',
      'string.max': 'Last Name cannot be more than 20 chars',
      'string.pattern.base': 'Last Name must contain only letters',
      'any.required': 'Last Name is required',
    }),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      'string.base': 'Email is not in the correct format',
      'string.empty': 'Email could not be empty',
      'string.pattern.base': 'Email is not in the correct format',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password could not be empty',
      'string.pattern.base':
        'Password must contain at least one uppercase, one lowercase, one digit, and one special character',
      'any.required': 'Password is required',
    }),
  role: Joi.string().valid('Director', 'Manager', 'Developer', 'QA').required().messages({
    'any.only': 'Role must be one of this: Director, Manager, Developer, QA',
    'any.required': 'Role is required',
  }),
  module: Joi.string()
    .valid(
      'Management',
      'Human Resources',
      'Full Stack Course',
      'Internship',
      'Interview',
      'Onboarding',
      'Tracking',
    )
    .required()
    .messages({
      'any.only':
        'Module must be one of this: Management, Human resources, Course, Internship, Interview, Onboarding, Tracking',
      'any.required': 'Module is required',
    }),
});

export default professionalSchema;
