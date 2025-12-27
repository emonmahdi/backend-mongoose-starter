import express from 'express'
const app = express()
import cors from 'cors'
import { userRoutes } from './modules/user/user.route'

// middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
