'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MemberInfo extends Model {
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

            this.hasMany(models.Order, {
                targetKey: 'member_info_id',
                foreignKey: 'member_info_id',
            });
        }
    }
    MemberInfo.init(
        {
            member_info_id: {
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
                type: DataTypes.STRING(20),
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING(15),
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING(100),
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
            modelName: 'MemberInfo',
        }
    );
    return MemberInfo;
};
