'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Keyword extends Model {
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
        }
    }
    Keyword.init(
        {
            keyword_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            restaurant_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            keyword: {
                allowNull: false,
                type: DataTypes.STRING(50),
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
            modelName: 'Keyword',
        }
    );
    return Keyword;
};
