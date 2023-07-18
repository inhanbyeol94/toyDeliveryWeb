'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class IsEmailValid extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    IsEmailValid.init(
        {
            email_auth_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING(40),
            },
            auth_code: {
                allowNull: false,
                type: DataTypes.STRING(6),
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'IsEmailValid',
        }
    );
    return IsEmailValid;
};
