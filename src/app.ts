import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./route/userRoute.js";
import authRouter from "./route/authRoute.js";
import runMigrations from "./migrations/logic/runMigrations.js";

async function startApp(): Promise<void> {
  await runMigrations()

  const app = express();
  const port = 3000;

  app.use(cors())
  app.use(cookieParser())

  app.get('/', (req, res) => {
    res.send(JSON.stringify({message: 'Running', time: new Date()}));
  })

  app.use(express.json())
  app.use('/users', userRouter)
  app.use('/auth', authRouter)

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
}
startApp();
