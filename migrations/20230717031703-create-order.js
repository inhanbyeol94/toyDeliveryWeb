'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            order_id: {
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
            member_info_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: 'MemberInfos',
                    key: 'member_info_id',
                },
                onDelete: 'CASCADE',
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
            status: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            arrival_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    },
};
