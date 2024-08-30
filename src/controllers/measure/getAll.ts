import {Request, Response} from 'express';
import Measure from '../../models/Measure';
import { getAllMeasures } from '../../services/MeasuresService';

const getMeasuresController = async (req: Request, res: Response)=>{
    let {measure_type} = req.query;
    const { customercode } = req.params;

    let normalizedMeasureType = measure_type ? String(measure_type).toUpperCase() : null;

    const validTypes = ['WATER', 'GAS'];
    if (normalizedMeasureType && !validTypes.includes(normalizedMeasureType)) {
        return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida'
        });
    }
    
    try {

        const measures = await getAllMeasures(customercode, normalizedMeasureType);

        if(measures.length <= 0){
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "Nenhuma leitura encontrada"
            });
        }

        return res.status(200).json({
            customer_code: customercode,
            measures
        });
    } catch (error) {
        return res.status(500).json({
            error_code: 'Internal Error',
            error_description: 'There was an error while processing your request.'
          });
    }
}

export default getMeasuresController;