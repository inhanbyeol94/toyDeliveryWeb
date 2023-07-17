'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Cart, {
                targetKey: 'cart_id',
                foreignKey: 'cart_id',
            });

            this.belongsTo(models.Menu, {
                targetKey: 'menu_id',
                foreignKey: 'menu_id',
            });
        }
    }
    CartItem.init(
        {
            cart_item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            cart_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            menu_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            count: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
            modelName: 'CartItem',
        }
    );
    return CartItem;
};
