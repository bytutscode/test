import Measure from '../models/Measure';
import { Op } from 'sequelize';
import { validate } from 'uuid';

export const getMeasure = async (measure_uuid:string) => {
    if(!validate(measure_uuid)){
        return null;
    }  
    return Measure.findOne({where:{measure_uuid}});
}

export const getAllMeasures = async (customercode: string, measure_type?:string | null ) =>{
    const filters: any = { customer_code: customercode };
    if (measure_type) {
        filters.measure_type = measure_type;
    }
    const attributes = ['measure_uuid', 'measure_datetime','measure_type', 'has_confirmed', 'image_url']
    return await Measure.findAll({where:filters, attributes:attributes});
}

export const createMeasure =  async (measureData:any) =>{
        const measure = new Measure();
        measure.measure_type = String(measureData.measure_type).toUpperCase();
        measure.measure_value = measureData.measure_value;
        measure.measure_datetime = measureData.measure_datetime;
        measure.image_url = measureData.image_url;
        measure.customer_code = measureData.customer_code;
        await measure.save();
        return measure;
}

export const has_measured_this_month = async (customer_code: string, type: string, datetime: string) => {
    const measure_datetime = new Date(datetime);
    const startOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth(), 1);
    const endOfMonth = new Date(measure_datetime.getFullYear(), measure_datetime.getMonth() + 1, 0)

    return await Measure.findOne({
        where:{measure_type: type.toUpperCase(),
        customer_code,
        measure_datetime: {
          [Op.between]: [startOfMonth, endOfMonth]}
      }});
}

export const confirmMeasure = async (measure:Measure, measure_value: number) => {
   measure.has_confirmed = true;
   measure.measure_value = measure_value;
   return await measure.save();
}