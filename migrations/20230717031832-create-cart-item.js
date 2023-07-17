'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CartItems', {
            cart_item_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            cart_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Carts',
                    key: 'cart_id',
                },
                onDelete: 'CASCADE',
            },
            menu_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'Menus',
                    key: 'menu_id',
                },
                onDelete: 'CASCADE',
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('CartItems');
    },
};
