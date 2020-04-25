const Sequilize = require("sequelize");

const connection = new Sequilize('guiapress', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: "-03:00"
});

module.exports = connection;

