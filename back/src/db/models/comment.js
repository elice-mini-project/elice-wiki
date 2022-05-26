"use strict";

/**
 * @swagger
 * components:
 *  schemas:
 *      Comment:
 *       type: object
 *       required:
 *          - commentId
 *          - groupId
 *          - parentId
 *          - order
 *          - depth
 *          - boardId
 *          - userId
 *          - userName
 *          - content
 *          - isDeleted
 *       properties:
 *          id:
 *              type: number
 *          commentId:
 *              type: string
 *          groupId:
 *              type: number
 *          parentId:
 *              type: number
 *          order:
 *              type: number
 *          depth:
 *              type: number
 *          boardId:
 *              type: string
 *          userId:
 *              type: string
 *          userName:
 *              type: string
 *          content:
 *              type: string
 *          isDeleted:
 *              type: boolean
 *
 */

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      commentId: {
        type: DataTypes.STRING,
      },
      groupId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      depth: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      boardId: DataTypes.STRING,
      userId: DataTypes.STRING,
      userName: DataTypes.STRING,
      content: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
