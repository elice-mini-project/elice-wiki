"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Post", {
            post_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            // createdAt으로 대체 가능
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            week: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            tag: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastmod_user: { type: Sequelize.STRING, allowNull: false },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Post");
    },
};
