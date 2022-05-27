"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            __id: {
                type: Sequelize.UUID,
                validate: {
                    notNull: true,
                },
            },
            name: {
                type: Sequelize.STRING,
                validate: {
                    notNull: true,
                },
            },
            profile_img: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    notNull: true,
                    isEmail: true,
                },
            },
            track: {
                type: Sequelize.INTEGER,
                validate: {
                    max: 4,
                    min: 1,
                },
            },
            admin: {
                type: Sequelize.INTEGER,
                validate: {
                    notNull: true,
                    max: 2,
                    min: 0,
                },
            },
            authorized: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
