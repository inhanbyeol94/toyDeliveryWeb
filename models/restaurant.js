'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Restaurant extends Model {
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

            this.hasMany(models.Review, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });

            this.hasMany(models.Keyword, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });

            this.hasMany(models.Menu, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });

            this.hasMany(models.Order, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });
        }
    }
    Restaurant.init(
        {
            restaurant_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            member_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(30),
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING(100),
            },
            tel: {
                allowNull: false,
                type: DataTypes.STRING(15),
            },
            desc: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            image: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Restaurant',
        }
    );
    return Restaurant;
};
