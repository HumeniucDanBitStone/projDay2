import express from "express";
import userRouter from "./route/userRoute.js";
import authRouter from "./route/authRoute.js";
import cookieParser from "cookie-parser";
import runMigrations from "./runMigrations.js";

await runMigrations()

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(JSON.stringify({message: 'Running', time: new Date()}));
});

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
