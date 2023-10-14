import mongoose from 'mongoose'
import app from './app'
import http from 'http'
import config from './config/index'
import { errorLog, log } from './shared/logger'

const server = http.createServer(app)

async function connectDB() {
  try {
    await mongoose.connect(config.DB_URI as string)
    log.info(`DB Connected Successfully`)
    server.listen(config.port, () => {
      log.info(`Server Connected Successfully on port ${config.port}`)
    })
  } catch (error) {
    errorLog.error(`DB connected Failed ${error}`)
  }
}
connectDB()
