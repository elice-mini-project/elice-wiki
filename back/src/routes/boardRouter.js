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
 *                 header:
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
 *	      - jwt: []
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
 *  /boardlist/user/{userId}:
 *    get:
 *      tags: [Board]
 *      summary: find boardlist by userId
 *      security:
 *	      - jwt: []
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
  "/boardlist/user/:userId",
  loginRequired,
  boardController.getBoardListByUserId
);

/**
 * @swagger
 * paths:
 *  /boardlist:
 *    get:
 *      tags: [Board]
 *      summary: find boardlist
 *      security:
 *	      - jwt: []
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
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                      boardId:
 *                        type: string
 *                      userId:
 *                        type: string
 *                      userName:
 *                        type: string
 *                      header:
 *                        type: string
 *                      title:
 *                        type: string
 *                      createdAt:
 *                        type: string
 */
boardRouter.get("/boardlist", loginRequired, boardController.getBoardList);

/**
 * @swagger
 * paths:
 *  /boardlist/pageinfo:
 *    get:
 *      tags: [Board]
 *      summary: find boardlist by page
 *      security:
 *	      - jwt: []
 *      parameters:
 *        - name: page
 *          in: query
 *          required: false
 *          schema:
 *            type: string
 *        - name: perPage
 *          in: query
 *          required: false
 *          schema:
 *            type: string
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
 *                    type: object
 *                    properties:
 *                      totalPage:
 *                        type: number
 *                      boardList:
 *                        $ref: '#/components/schemas/Board'
 */
boardRouter.get(
  "/boardlist/pageinfo",
  loginRequired,
  boardController.getBoardListByPage
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
 *         description: update board header, title, body
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 header:
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
