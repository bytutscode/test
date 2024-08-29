import { Router, Request, Response } from "express";
import upload from "../controllers/upload";

const router = Router();

router.get('/ping', (req:Request, res:Response)=>{
    return res.status(200).json({pong:true});
});

router.get('/upload', upload);

export default router;