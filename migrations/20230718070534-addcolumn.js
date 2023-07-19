'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.addColumn('Cart', 'restaurant_id', {
            allowNull: false,
            type: Sequelize.BIGINT,
            references: {
                model: 'Restaurants',
                key: 'restaurant_id',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Cart', 'restaurant_id');
    },
};
