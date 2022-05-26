import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";

import { userController } from "../controller/userController.js";
const userRouter = Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User API
 */

/**
 * @swagger
 * paths:
 *  /user/sign:
 *   post:
 *    tags: [User]
 *    summary: create new User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              accessToken:
 *                  type: string
 *                  example: "ya29.a0ARrdaM8D9f31qE-bxSjjOy84qg9rGmYgPlM4TTmokf61_s7rhhnfvYZz7SLZksutwSieZBIBv8WLlLDkhKeS4--tgGS9D0oU2_xQjWsCjAOgUtFynn_h5cKOJRWSs5C1V0Su1mnLWFwUo8jkjjQlzMXYqwR6"
 *
 *    responses:
 *      201:
 *        description: success
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          properties:
 *                              token:
 *                                  type: string
 *                              __id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              admin:
 *                                  type: integer
 *                              authorized:
 *                                  type: boolean
 *                              track:
 *                                  type: integer
 *
 */
userRouter.post("/user/sign", userController.sign);

/**
 * @swagger
 * paths:
 *  /user/auth:
 *   post:
 *    tags: [User]
 *    summary: authoriztion User by Q&A
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              answer:
 *                  type: string
 *                  example: "레이서 잊지마"
 *
 *    responses:
 *      200:
 *        description: success
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                          example: "success"
 *                      payload:
 *                          type: object
 *                              $ref: '#/components/schemas/Users'
 *
 */
userRouter.post("/user/auth", loginRequired, userController.auth);

/**
 * @swagger
 * paths:
 *  /user/current:
 *   delete:
 *    tags: [User]
 *    summary: delete User by logined userToken
 *    description: 유저 탈퇴
 *    responses:
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                    status:
 *                        type: string
 *                    payload:
 *                        type: object
 *                        properties:
 *                            success:
 *                                type: integer
 *                            failed:
 *                                type: integer
 *
 */
userRouter.delete("/user/current", loginRequired, userController.deleteUser);

/**
 * @swagger
 * paths:
 *  /user/current:
 *   get:
 *    tags: [User]
 *    summary: get user Info by logined userToken
 *
 *    responses:
 *      200:
 *        description: success
 *        content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      status:
 *                          type: string
 *                      payload:
 *                          $ref: '#/components/schemas/Users'
 *
 */
userRouter.get("/user/current", loginRequired, userController.getCurrentUser);

export { userRouter };
