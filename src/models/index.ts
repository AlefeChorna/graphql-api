import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';

import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';
const configPath = path.resolve(`${__dirname}./../config/config.json`);

let config = require(configPath)[env];
let db = null;

if (!db) {
  db = {};

  const operatorsAliases = false;

  config = Object.assign({ operatorsAliases }, config);

  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );

  fs.readdirSync(__dirname)
    .filter((file: string) => {
      /*
      * Regra 1 - Arquivo não deve começar com ponto
      * Regra 2 - Arquivo que esta executando a função não pode ser selecionado
      * Regra 3 - Arquivo tem que ser no formato ".js"
      */
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js'
      )
    })
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model['name']] = model;
    });

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
}

export default <DbConnection>db;
