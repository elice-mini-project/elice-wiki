"use strict";

/**
 * @swagger
 * components:
 *  schemas:
 *      Goal:
 *       type: object
 *       required:
 *          - week
 *          - core_goal
 *          - goal1
 *          - goal2
 *          - goal3
 *          - title
 *       properties:
 *          title:
 *              type: string
 *          week:
 *              type: number
 *          core_goal:
 *              type: string
 *          goal1:
 *              type: string
 *          goal2:
 *              type: string
 *          goal3:
 *              type: string
 *
 */

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class goal extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    goal.init(
        {
            week: DataTypes.INTEGER,
            goal1: DataTypes.STRING,
            goal2: DataTypes.STRING,
            goal3: DataTypes.STRING,
            title: DataTypes.STRING,
            core_goal: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Goal",
            freezeTableName: true,
        }
    );
    return goal;
};
