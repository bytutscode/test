import { NextFunction, Request, Response } from "express";
import multer from "multer";
export const upload = multer();


export const imageValidator = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: 'The image is required'
        })
    }

    if (file.size > 10485760) {
        return res.status(400).json({
            message: 'The file is larger than 10MB(max size allowed)'
        })
    }

    const allowedTypes = ['image/png','image/jpeg','image/jpg'];
    if(!allowedTypes.includes(file.mimetype)){
        return res.status(400).json({
            message: 'The file must be an image'
        }) 
    }

    next()
}