'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.MemberInfo, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });

            this.hasMany(models.Point, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });

            this.hasMany(models.Review, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });

            this.hasMany(models.Cart, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });

            this.hasOne(models.Restaurant, {
                targetKey: 'member_id',
                foreignKey: 'member_id',
            });
        }
    }
    Member.init(
        {
            member_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING(40),
            },
            nickname: {
                allowNull: false,
                type: DataTypes.STRING(10),
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(128),
            },
            image: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            group: {
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
            modelName: 'Member',
        }
    );
    return Member;
};
