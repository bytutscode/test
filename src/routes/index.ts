import { Router } from "express";
import validator from "../middlewares/validator";
import { measurementSchema } from "../middlewares/validation/createMeasureSchema";
import { confirmMeasurementSchema } from "../middlewares/validation/confirmMeasureSchema";
import {createMeasure, confirmMeasure, getMeasures} from '../controllers/measure/index'


const router = Router();

router.get('/:customercode/list', getMeasures);
router.post('/upload',validator(measurementSchema), createMeasure);
router.patch('/confirm',validator(confirmMeasurementSchema), confirmMeasure);

export default router;