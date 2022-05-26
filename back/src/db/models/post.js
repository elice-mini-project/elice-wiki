"use strict";
// const { Model } = require("sequelize");

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *          - user_id
 *          - week
 *          - tag
 *          - title
 *          - lastmod_user
 *      properties:
 *          user_id:
 *           type: string
 *          week:
 *           type: string
 *          tag:
 *           items:
 *              type: string
 *          title:
 *            type: string
 *          lastmod_user:
 *            type: string
 *
 */
// lastmod user는 미들웨어 들어오면 빠질 것
// Post 테이블 정의
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define(
        "Post",
        {
            // allowNull: false -> NOT NULL
            post_index: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            post_id: { type: DataTypes.STRING, allowNull: false },
            user_id: { type: DataTypes.STRING, allowNull: false },
            date: { type: DataTypes.DATE, allowNull: false },
            // week는 필수 아님
            week: { type: DataTypes.INTEGER, allowNull: true },
            tag: { type: DataTypes.STRING, allowNull: false },
            title: { type: DataTypes.STRING, allowNull: false },
            lastmod_user: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "Post",
            // freezeTableName: true로 해주면 테이블 이름을 복수형으로 저장하는 것을 막을 수 있다
            freezeTableName: true,
        }
    );
    return post;
};

// ----------------- sequelize generate로 생성하면 생성되는 코드 ---------
// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Post.init(
//     {
//       postId: DataTypes.STRING,
//       userId: DataTypes.STRING,
//       date: DataTypes.DATE,
//       week: DataTypes.INTEGER,
//       tag: DataTypes.STRING,
//       title: DataTypes.STRING,
//       body: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "Post",
//       freezeTableName: true,
//     }
//   );
//   return Post;
// };
