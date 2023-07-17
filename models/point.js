'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Point extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Member, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });
        }
    }
    Point.init(
        {
            point_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            member_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            point_status_code: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            point: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            reason: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            expiry_at: {
                //+1 TEST필요
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Point',
        }
    );
    return Point;
};
