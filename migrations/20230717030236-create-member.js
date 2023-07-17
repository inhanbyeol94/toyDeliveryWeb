'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Members', {
            member_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(40),
            },
            nickname: {
                allowNull: false,
                type: Sequelize.STRING(10),
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING(128),
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            group: {
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
        await queryInterface.dropTable('Members');
    },
};
