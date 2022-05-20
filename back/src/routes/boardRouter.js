import { Router } from "express";
import { boardController } from "../controller/boardController";
import { loginRequired } from "../middlewares/loginRequired";

const boardRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Board
 *  description: Board API
 */

/**
 * @swagger
 * paths:
 *   /boards/board:
 *     post:
 *       tags: [Board]
 *       summary: create new board
 *       security:
 *	       - jwt: []
 *       requestBody:
 *         description: creat new board
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *
 *       responses:
 *         201:
 *           description: 새 게시판 생성 성공!!
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 */
boardRouter.post("/boards/board", loginRequired, boardController.addBoard);

/**
 * @swagger
 * paths:
 *  /boards/{boardId}:
 *    get:
 *      tags: [Board]
 *      summary: find board by boardId
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
 *                    $ref: '#/components/schemas/Board'
 */
boardRouter.get("/boards/:boardId", loginRequired, boardController.getBoard);

/**
 * @swagger
 * paths:
 *  /boardlist/{userId}:
 *    get:
 *      tags: [Board]
 *      summary: find boardlist by userId
 *      security:
 *	       - jwt: []
 *      parameters:
 *        - name: userId
 *          in: path
 *          type: integer
 *          description: user의 고유 id
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
 *                    $ref: '#/components/schemas/Board'
 */
boardRouter.get(
  "/boardlist/:userId",
  loginRequired,
  boardController.getBoardList
);

/**
 * @swagger
 * paths:
 *   /boards/{boardId}:
 *     put:
 *       tags: [Board]
 *       summary: update board
 *       security:
 *	       - jwt: []
 *       parameters:
 *         - name: boardId
 *           in: path
 *           type: string
 *           description: board의 고유 id
 *       requestBody:
 *         description: update board postId, title, body
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 body:
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
boardRouter.put("/boards/:boardId", loginRequired, boardController.setBoard);

/**
 * @swagger
 * paths:
 *   /boards/{boardId}:
 *     delete:
 *       tags: [Board]
 *       summary: delete board
 *       security:
 *	       - jwt: []
 *       parameters:
 *         - name: boardId
 *           in: path
 *           type: integer
 *           description: board의 고유 id
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
boardRouter.delete(
  "/boards/:boardId",
  loginRequired,
  boardController.deleteBoard
);

export { boardRouter };
