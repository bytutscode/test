import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from 'joi';

const validator = (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        try {
            const r = await schema.validateAsync(req.body);
            next()
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    error_code: "INVALID_DATA",
                    error_description: error.message
                })
            }
            return res.status(500).json({
                message: 'There was an internal error!'
            })
        }
    }

export default validator;