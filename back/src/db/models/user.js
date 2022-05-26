"use strict";

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *          - __id
 *          - name
 *          - email
 *          - admin
 *          - authorized
 *      properties:
 *          __id:
 *           type: string
 *          name:
 *           type: string
 *          email:
 *           type: string
 *          admin:
 *           type: integer
 *          authorized:
 *           type: boolean
 *          track:
 *           type: integer
 *
 */

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Users.init(
        {
            __id: DataTypes.UUID,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            track: DataTypes.INTEGER,
            admin: DataTypes.INTEGER,
            authorized: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Users",
        }
    );
    return Users;
};
