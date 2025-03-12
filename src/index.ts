import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import router from './router'
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {console.log(`Server is running at http://localhost:${process.env.PORT}`)})