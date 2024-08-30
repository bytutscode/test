import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { saveBase64Image } from '../../utils/saveBase64Image';
import { getMeasureValueFromLLM, uploadFile } from '../../services/LLMService';
import { createMeasure, has_measured_this_month } from '../../services/MeasuresService';
dotenv.config();

const createMeasureController = async (req: Request, res: Response) => {
  const {image, customer_code, measure_datetime, measure_type} = req.body;

  try {

    const measure = await has_measured_this_month(customer_code, measure_type, measure_datetime);
    if(measure != null){
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada'
      });
    }

    const imageName = `${customer_code}_${measure_type}_${new Date().getTime()}.jpeg`;
    const imagePath = await saveBase64Image(image,imageName);

    const uploadFileResponse = await uploadFile( imagePath, imageName);
    const {mimeType, uri:URI} = uploadFileResponse.file;

    const measure_value = await getMeasureValueFromLLM(mimeType, URI);
    
    const filePathServer = `${req.protocol}://${req.get('host')}/media/${imageName}`;
    const measureData = {measure_datetime, customer_code, measure_value, measure_type, image_url:filePathServer}
    const new_measure = await createMeasure(measureData);

    return res.status(200).json({
      image_url: filePathServer,
      measure_value,
      measure_uuid: new_measure.measure_uuid
    });

  } catch (erro) {
    console.log(erro)
    return res.status(500).json({
      error_code: 'Internal Error',
      error_description: 'There was an error while processing your request.'
    });
  }
}

export default createMeasureController;