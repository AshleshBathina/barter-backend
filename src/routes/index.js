import express from "express";
import authRouter from "./authRouter.js"
import userRouter from "./userRouter.js"
import postRouter from "./postRouter.js"

const apiRouter = express();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);

export default apiRouter;