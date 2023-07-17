'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.CartItem, {
                targetKey: 'menu_id',
                foreignKey: 'menu_id',
            });

            this.belongsTo(models.Restaurant, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });
        }
    }
    Menu.init(
        {
            menu_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            restaurant_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(50),
            },
            price: {
                allowNull: false,
                type: DataTypes.BIGINT,
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
            modelName: 'Menu',
        }
    );
    return Menu;
};
