import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const config = {
  port: process.env.PORT,
  DB_URI: process.env.DB_URI,
}

export default config
