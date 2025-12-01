import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import cityRoutes from './routes/cityRoutes'
import tripRoutes from './routes/tripRoutes'
import currencyRoutes from './routes/currencyRoutes'
import travelBotRoutes from './routes/travelBotRoutes'
import authRoutes from './routes/authRoutes'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/cities', cityRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/currencies', currencyRoutes)
app.use('/api/travelbot', travelBotRoutes)
app.use('/api/auth', authRoutes)

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Budget Compass API is running',
    timestamp: new Date().toISOString(),
  })
})

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🌍 Cities API: http://localhost:${PORT}/api/cities`)
  console.log(`✈️  Trips API: http://localhost:${PORT}/api/trips`)
  console.log(`💱 Currency API: http://localhost:${PORT}/api/currencies`)
  console.log(`🤖 TravelBot API: http://localhost:${PORT}/api/travelbot`)
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`)
})

export default app
