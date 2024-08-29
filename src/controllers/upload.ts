import {Request, Response} from 'express';
import { GoogleAIFileManager } from "@google/generative-ai/server";



const upload = async (req: Request, res:Response)=>{
    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

    const uploadResponse = await fileManager.uploadFile("jetpack.jpg", {
        mimeType: "image/jpeg",
        displayName: "Jetpack drawing",
      });
      
      console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
    res.status(200).json({response:'upload'})
}

export default upload;