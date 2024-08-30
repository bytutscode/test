import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const uploadFile = async(filePath: string, fileName: string) =>{
    const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);7

    const uploadResponse = await fileManager.uploadFile(filePath, {
        mimeType: "image/jpeg",
        displayName: fileName,
    });

    return uploadResponse;
}

export const getMeasureValueFromLLM = async (mimeType: string, uri: string) => {
 
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
    });

    const promptMessage = 'Please analyze the photo of the meter and return only the numerical value displayed (ONLY). Ensure that the image is clear and well-lit for accurate results.';
    const result = await model.generateContent([
    {fileData: {
        mimeType: mimeType,
        fileUri: uri
        }},{ text: `${promptMessage}`},
    ]);

    return parseInt(result.response.text());
}

export const deleteFile = async(fileName: string) =>{
    try{
        const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string); 
        return fileManager.deleteFile(fileName);
    }
    catch(error){
        return false
    }
}
