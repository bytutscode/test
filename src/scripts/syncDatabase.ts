import sequelize from "../database/sequelizeConfig";
import "../models/Measure";

const sync = async () => {
    await sequelize.sync();
}

sync();