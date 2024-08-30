import fs from 'fs/promises';
import path from 'path';

export const saveBase64Image = async (base64String: string, filename: string): Promise<string> => {

    const imageBuffer = Buffer.from(base64String, 'base64');
    const filePath = path.join('temp_uploads', filename);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, imageBuffer);

    return filePath;
};