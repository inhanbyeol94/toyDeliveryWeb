'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Menus', {
            menu_id: {
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
            name: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            price: {
                allowNull: false,
                type: Sequelize.BIGINT,
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
        await queryInterface.dropTable('Menus');
    },
};
