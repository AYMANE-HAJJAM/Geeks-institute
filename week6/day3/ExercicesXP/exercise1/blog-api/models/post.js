const { DataTypes, INTEGER } = require('sequelize');
const { sequelize } = require('../config/database.js');

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
     content: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
}, {
    timestamps: true,
    tableName: 'posts'
});

module.exports = Post;
