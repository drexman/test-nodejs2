import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import User from '../app/models/User.js';
import Client from '../app/models/Client.js';
import Address from '../app/models/Address.js';
import FileProcess from '../app/models/FileProcess.js';

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'    
});

const models = [User, FileProcess, Client, Address]; 

class Database {

    constructor()
    {
        this.init();
    }
    
    init()
    {
        this.connection = new Sequelize(  
            process.env.DB_DATABASE, 
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,{
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dialect: process.env.DB_DIALECT,
                operartorsAliases: false,
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                }
            }
        );

         this.connection.sync({ force: false });   
        models.map(model => model.init(this.connection))
        .map(model => { 
            model.associate && model.associate(this.connection.models)
        });
    }
}

export default new Database();