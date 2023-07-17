'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Keywords', {
            keyword_id: {
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
            keyword: {
                allowNull: false,
                type: Sequelize.STRING(50),
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
        await queryInterface.dropTable('Keywords');
    },
};
