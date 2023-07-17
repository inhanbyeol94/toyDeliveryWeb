'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.MemberInfo, {
                targetKey: 'member_info_id',
                foreignKey: 'member_info_id',
            });

            this.belongsTo(models.Cart, {
                targetKey: 'cart_id',
                foreignKey: 'cart_id',
            });

            this.belongsTo(models.Restaurant, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });
        }
    }
    Order.init(
        {
            order_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            restaurant_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            member_info_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            cart_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            status: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            arrival_at: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
