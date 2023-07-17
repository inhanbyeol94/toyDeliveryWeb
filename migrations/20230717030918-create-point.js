'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Points', {
            point_id: {
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
            point_status_code: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            point: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            reason: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
            expiry_at: {
                //+1 TEST필요
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Points');
    },
};
