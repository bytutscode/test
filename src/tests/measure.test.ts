import request from 'supertest';
import {app, server} from '../index';
import fs from 'fs/promises';
import path from 'path';
import Measure from '../models/Measure';


describe('testing measures controllers', () => {

    beforeAll(async () => {
        await Measure.sync({force:true})
    });

    afterAll(async () => {
        await Measure.destroy({ where: {} });
        server.close();
      });

    it('should create a new measure', async () => {
        const base64String = await fs.readFile(path.resolve(__dirname, '../utils/base64StringForTest.txt'), 'utf8');
        const mockMeasureData = {
            image: base64String,
            customer_code: "CODE123",
            measure_datetime: "2024-09-30T14:00:00Z",
            measure_type: "WATER"
        }

        const res = await request(app).post('/upload').send(mockMeasureData);
        
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('image_url');
        expect(typeof res.body.measure_value).toBe('number');
        expect(Number.isInteger(res.body.measure_value)).toBe(true);
    });

    it('should create a new measure and confirm', async () => {
        const base64String = await fs.readFile(path.resolve(__dirname, '../utils/base64StringForTest.txt'), 'utf8');
        const mockMeasureData = {
            image: base64String,
            customer_code: "CODE123",
            measure_datetime: "2024-09-30T14:00:00Z",
            measure_type: "WATER"
        }

        const res = await request(app).post('/upload').send(mockMeasureData);
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('image_url');
        expect(typeof res.body.measure_value).toBe('number');
        expect(Number.isInteger(res.body.measure_value)).toBe(true);


        const mockConfirmData = {measure_uuid:res.body.measure_uuid, confirmed_value: 200 }
        const res2 = await request(app).patch('/confirm').send(mockConfirmData);
        expect(res2.status).toEqual(200);
        expect(res2.body).toHaveProperty('success', true);

    });

    it('should not create a new measure beacause the client is not sending any data', async () => {
        const res = await request(app).post('/upload').send();
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty('error_code', 'INVALID_DATA');
    });

    it('should show a list of measures', async () => {
        const res = await request(app).get('/CODE123/list').send();
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('measures');
    });

   

})