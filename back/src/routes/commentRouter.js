import { Router } from "express";
import { commentController } from "../controller/commentController";
import { loginRequired } from "../middlewares/loginRequired";

const commentRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment API
 */

/**
 * @swagger
 * paths:
 *   /comments/comment:
 *     post:
 *       tags: [Comment]
 *       summary: create new comment
 *       security:
 *	       - jwt: []
 *       requestBody:
 *         description: creat new comment
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 boardId:
 *                   type: string
 *                 content:
 *                   type: string
 *       responses:
 *         201:
 *           description: 새 댓글 생성 성공!!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.post(
  "/comments/comment",
  loginRequired,
  commentController.addComment
);

/**
 * @swagger
 * paths:
 *   /comments/recomment:
 *     post:
 *       tags: [Comment]
 *       summary: create new recomment
 *       security:
 *	       - jwt: []
 *       requestBody:
 *         description: target -> 대댓글을 달 댓글 정보
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 target:
 *                   $ref: '#/components/schemas/Comment'
 *                 content:
 *                   type: string
 *       responses:
 *         201:
 *           description: 새 대댓글 생성 성공!!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.post(
  "/comments/recomment",
  loginRequired,
  commentController.addReComment
);

/**
 * @swagger
 * paths:
 *  /comments/{commentId}:
 *    get:
 *      tags: [Comment]
 *      summary: find comment by commentId
 *      security:
 *	       - jwt: []
 *      parameters:
 *        - name: commentId
 *          in: path
 *          type: integer
 *          description: comment의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  payload:
 *                    $ref: '#/components/schemas/Comment'
 */
commentRouter.get(
  "/comments/:commentId",
  loginRequired,
  commentController.getComment
);

/**
 * @swagger
 * paths:
 *  /commentlist/{boardId}:
 *    get:
 *      tags: [Comment]
 *      summary: find commentlist by boardId
 *      security:
 *	       - jwt: []
 *      parameters:
 *        - name: boardId
 *          in: path
 *          type: string
 *          description: board의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                  payload:
 *                    $ref: '#/components/schemas/Comment'
 */
commentRouter.get(
  "/commentlist/:boardId",
  loginRequired,
  commentController.getCommentList
);

/**
 * @swagger
 * paths:
 *   /comments/{commentId}:
 *     put:
 *       tags: [Comment]
 *       summary: update comment
 *       security:
 *	       - jwt: []
 *       parameters:
 *         - name: commentId
 *           in: path
 *           type: integer
 *           description: comment의 고유 id
 *       requestBody:
 *         description: update comment content
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *       responses:
 *         200:
 *           description: succ
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.put(
  "/comments/:commentId",
  loginRequired,
  commentController.setComment
);

/**
 * @swagger
 * paths:
 *   /comments/{commentId}:
 *     delete:
 *       tags: [Comment]
 *       summary: delete comment
 *       security:
 *	       - jwt: []
 *       parameters:
 *         - name: commentId
 *           in: path
 *           type: integer
 *           description: comment의 고유 id
 *       responses:
 *         200:
 *           description: succ
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
commentRouter.delete(
  "/comments/:commentId",
  loginRequired,
  commentController.deleteComment
);

export { commentRouter };
