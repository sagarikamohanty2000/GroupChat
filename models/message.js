const  Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
 },
 msg: {
        type: Sequelize.STRING(255),
        allowNull: false
 }
});

module.exports = Message