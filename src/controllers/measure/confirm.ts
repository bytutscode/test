import { Request, Response } from 'express';
import { confirmMeasure, getMeasure } from '../../services/MeasuresService';

const confirmMeasureController = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value} = req.body;

    try {
       const measure = await getMeasure(measure_uuid);
       if(!measure){
            return res.status(404).json({
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'Leitura do mês já realizada' 
            });
       }

       if(measure.has_confirmed){
            return res.status(409).json({
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'Leitura do mês já realizada'
            }); 
       }
       
       await confirmMeasure(measure, confirmed_value);

       return res.status(200).json({
            success: true
       });
    } catch (error) {
        return res.status(500).json({
            error_code: 'Internal Error',
            error_description: 'There was an error while processing your request.'
          });
    }
}

export default confirmMeasureController;