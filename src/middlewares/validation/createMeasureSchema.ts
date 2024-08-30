import Joi from 'joi';

export const measurementSchema = Joi.object({
    image: Joi.string().base64().required().messages({
        'string.base64': 'Image must be a valid base64 encoded string',
        'any.required': 'The image field is required'
    }),
    customer_code: Joi.string().required().messages({
        'any.required': 'The customer code field is required'
    }),
    measure_datetime: Joi.date().iso().required().messages({
        'date.base': 'Measure datetime must be a valid ISO date',
        'any.required': 'The measure datetime field is required'
    }),
    measure_type: Joi.string().lowercase().valid('water', 'gas').required().messages({
        'string.valid': 'Measure type must be either WATER or GAS',
        'any.required': 'The measure type field is required'
    })
});