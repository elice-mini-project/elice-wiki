import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { adminRequired } from "../middlewares/adminRequired";

import { authController } from "../controller/authController.js";
const authRouter = Router();

//인증 질문을 새로 만듦
authRouter.post("/auth", authController.newQuestion);

//현재 아이디와 일치하는 인증 질문, 답변을 반환
authRouter.get("/auth/:id", authController.getQuestion);

//설정된 인증 질문, 답변을 반환
authRouter.get("/auth", authController.getQuestion);

//현재 인증 질문, 답변을 수정
authRouter.put("/auth/:id", authController.updateQuestion);

//현재 인증 질문, 답변을 삭제하고 바로 이전 질문, 답변을 현재 질문으로 설정
authRouter.delete("/auth/:id", authController.deleteQuestion);

//인증 질문, 답변들 변경 이력을 반환
authRouter.get("/auths", authController.getQuestions);

export { authRouter };
