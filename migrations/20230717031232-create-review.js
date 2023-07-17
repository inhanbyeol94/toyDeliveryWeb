'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Reviews', {
            review_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            restaurant_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Restaurants',
                    key: 'restaurant_id',
                },
                onDelete: 'CASCADE',
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
            star: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            review: {
                allowNull: false,
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Reviews');
    },
};
