import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/user/users.router'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//Application router call
app.use('/api/v1/users', userRouter)

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: res.statusCode,
    request: true,
    message: 'Success',
    data: null,
  })
})

export default app
