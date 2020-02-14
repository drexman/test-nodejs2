
const dotenv = require('dotenv');
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "postgres",
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true
  }
}