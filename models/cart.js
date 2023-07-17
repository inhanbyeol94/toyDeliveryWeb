'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
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

            this.hasOne(models.Order, {
                targetKey: 'cart_id',
                foreignKey: 'cart_id',
            });

            this.hasMany(models.CartItem, {
                targetKey: 'cart_id',
                foreignKey: 'cart_id',
            });
        }
    }
    Cart.init(
        {
            cart_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            member_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
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
            modelName: 'Cart',
        }
    );
    return Cart;
};
