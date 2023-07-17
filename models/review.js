'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Restaurant, {
                targetKey: 'restaurant_id',
                foreignKey: 'restaurant_id',
            });

            this.belongsTo(models.Member, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });
        }
    }
    Review.init(
        {
            review_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            restaurant_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            member_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            star: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            review: {
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
            modelName: 'Review',
        }
    );
    return Review;
};
