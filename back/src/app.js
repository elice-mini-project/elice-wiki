import cors from "cors";
import express from "express";

import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import { adminRouter } from "./routes/adminRouter";
import { postRouter } from "./routes/postRouter";
import { tagRouter } from "./routes/tagRouter";
import { goalRouter } from "./routes/goalRouter";
import { boardRouter } from "./routes/boardRouter";
import { commentRouter } from "./routes/commentRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

import { swaggerUi, specs } from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
    res.send("Elice Wiki");
});

app.use(adminRouter);
app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(tagRouter);
app.use(goalRouter);
app.use(boardRouter);
app.use(commentRouter);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorMiddleware);

export { app };
