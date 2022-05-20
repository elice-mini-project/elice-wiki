import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";

import { userController } from "../controller/userController.js";
const userRouter = Router();

userRouter.post("/user/sign", userController.sign);
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
 *      200:
 *        description: success
 *        content:
 *          application/json:
 *            properties:
 *              status:
 *                type: string
 *                example: "success"
 *              payload:
 *                type: string
 *
 */

userRouter.post("/user/auth", loginRequired, userController.auth);
/**
 * @swagger
 * paths:
 *  /user/auth:
 *   post:
 *    tags: [User]
 *    summary: authoriztion User by Q&A
 *    requestHeaders: [Authorization]
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
 *          application/json:
 *            properties:
 *              status:
 *                type: string
 *                example: "success"
 *              payload:
 *                type: object
 *
 */
userRouter.post("/user/auth", loginRequired, userController.auth);
userRouter.delete("/users/:userId", userController.deleteUser);
userRouter.get("/user/current", loginRequired, userController.getCurrentUser);

export { userRouter };
