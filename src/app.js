import express from "express";
import connectDB from "./configs/db.js";
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())


app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/health', async (req, res) => {
  try {
    await connectDB();
    res.json({ status: 'OK' });
  } catch (error) {
    res.status(500).json({ status: 'Error' });
  }
});

export default app;