import { Router } from "express";
import { postController } from "../controller/postController";
import { loginRequired } from "../middlewares/loginRequired";

const postRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post API
 */

/**
 * @swagger
 * paths:
 *  /newpost:
 *   post:
 *    tags: [Post]
 *    summary: create new post
 *    security:
 *	      - jwt: []
 *    requestBody:
 *      description: creat new post
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  week:
 *                      type: string
 *                  tag:
 *                      items:
 *                          type: string
 *                  title:
 *                      type: string
 *    responses:
 *      200:
 *       description: 새 게시글 생성 성공!!
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          typt: object
 *                          properties:
 *                              post_id:
 *                                  type: string
 */
postRouter.post("/newpost", loginRequired, postController.addPost);

/**
 * @swagger
 * paths:
 *  /post/id/{id}:
 *   get:
 *      tags: [Post]
 *      summary: find post by post_id
 *      security:
 *	      - jwt: []
 *      parameters:
 *          - name: id
 *            in: path
 *            type: string
 *            description: post_id
 *      responses:
 *          200:
 *           description: succ
 *           content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                          payload:
 *                              $ref: '#/components/schemas/Post'
 *
 */

postRouter.get("/post/id/:id", loginRequired, postController.getPostByPostId);

/**
 * @swagger
 * paths:
 *  /post/tag/{tag}:
 *   get:
 *      tags: [Post]
 *      summary: Post API
 *      security:
 *	      - jwt: []
 *      parameters:
 *          - name: tag
 *            in: path
 *            type: string
 *            description: tag 정보
 *          - name: page
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *          - name: perPage
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 *
 */
postRouter.get("/post/tag/:tag", loginRequired, postController.getPostsByTag);

/**
 * @swagger
 * paths:
 *  /post/week/{week}:
 *   get:
 *      tags: [Post]
 *      summary: find posts by week
 *      security:
 *	      - jwt: []
 *      parameters:
 *          - name: week
 *            in: path
 *            type: string
 *            description: week 정보
 *          - name: page
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *          - name: perPage
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.get("/post/week/:week", loginRequired, postController.getPostByWeek);

/**
 * @swagger
 * paths:
 *  /post/update/{id}:
 *    put:
 *      tags: [Post]
 *      summary: update post info
 *      security:
 *	      - jwt: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          week:
 *                              type: string
 *                          tag:
 *                              items:
 *                                  type: string
 *                          title:
 *                              type: string
 *      parameters:
 *          - name: id
 *            in: path
 *            type: string
 *            description: post의 고유 id
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 */
postRouter.put("/post/update/:id", loginRequired, postController.updatePost);

/**
 * @swagger
 * paths:
 *  /posts:
 *    get:
 *      tags: [Post]
 *      summary: find all post
 *      security:
 *	      - jwt: []
 *      parameters:
 *          - name: page
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *          - name: perPage
 *            in: query
 *            required: false
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: succ
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Post'
 *
 */
postRouter.get("/posts", loginRequired, postController.findAllPost);

export { postRouter };
