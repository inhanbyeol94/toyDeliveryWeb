'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Restaurants', {
            restaurant_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            member_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Members',
                    key: 'member_id',
                },
                onDelete: 'CASCADE',
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(30),
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING(100),
            },
            tel: {
                allowNull: false,
                type: Sequelize.STRING(15),
            },
            desc: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            category: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Restaurants');
    },
};
