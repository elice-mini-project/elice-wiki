"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      commentId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      parentCommentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      depth: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      boardId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isDeleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("Comments");
  },
};
