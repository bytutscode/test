import Joi from 'joi';

export const confirmMeasurementSchema = Joi.object({
    confirmed_value: Joi.number().required().messages({
        'any.required': 'The confirm_value field is required'
    }),
    measure_uuid: Joi.string().required().messages({
        'string.guid': 'Measure UUID must be a string',
        'any.required': 'The measure_uuid field is required'
    })
});
