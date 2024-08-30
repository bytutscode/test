import sequelize from "../database/sequelizeConfig";
import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

export interface Measure extends Model {
    measure_uuid: string,
    measure_value: number,
    measure_type: string,
    customer_code: string,
    has_confirmed: boolean,
    measure_datetime: Date,
    image_url: string
}

export const Measure = sequelize.define<Measure>('Measure', {
    measure_uuid: { type: DataTypes.UUID, primaryKey: true,  defaultValue: () => uuidv4()},
    measure_value: { type: DataTypes.INTEGER, allowNull: false },
    measure_type: { type: DataTypes.STRING, allowNull: false },
    customer_code: { type: DataTypes.STRING, allowNull: false },
    has_confirmed: {type: DataTypes.BOOLEAN, defaultValue:false},
    measure_datetime:{type: DataTypes.DATE, allowNull:false},
    image_url:{type:DataTypes.STRING, allowNull:false}
},
    {
        tableName: 'measures',
        timestamps: false
    }
);


export default Measure;