require('dotenv').config()
const { Router } = require('express')
const path = require('path')

// Register ts-node to handle TypeScript files
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    esModuleInterop: true,
    skipLibCheck: true,
    resolveJsonModule: true
  }
})

const router = Router()

// Import TypeScript routes
let cityRoutes, tripRoutes, currencyRoutes, travelBotRoutes, authRoutes
let corsMiddleware, errorHandler, notFoundHandler

try {
  // Try to load compiled JavaScript first
  const backendPath = path.resolve(__dirname, 'backend-dist')
  console.log('Trying to load from compiled backend:', backendPath)
  cityRoutes = require(path.join(backendPath, 'routes/cityRoutes')).default
  tripRoutes = require(path.join(backendPath, 'routes/tripRoutes')).default
  currencyRoutes = require(path.join(backendPath, 'routes/currencyRoutes')).default
  travelBotRoutes = require(path.join(backendPath, 'routes/travelBotRoutes')).default
  authRoutes = require(path.join(backendPath, 'routes/authRoutes')).default
  corsMiddleware = require(path.join(backendPath, 'middleware/cors')).corsMiddleware
  errorHandler = require(path.join(backendPath, 'middleware/errorHandler')).errorHandler
  notFoundHandler = require(path.join(backendPath, 'middleware/errorHandler')).notFoundHandler
  console.log('✅ Loaded backend from compiled JavaScript')
} catch (e) {
  // Fallback to TypeScript source files
  console.log('⚠️  Compiled backend not found, loading from TypeScript source:', e.message)
  const backendPath = path.resolve(__dirname, 'backend')
  try {
    cityRoutes = require(path.join(backendPath, 'routes/cityRoutes')).default
    tripRoutes = require(path.join(backendPath, 'routes/tripRoutes')).default
    currencyRoutes = require(path.join(backendPath, 'routes/currencyRoutes')).default
    travelBotRoutes = require(path.join(backendPath, 'routes/travelBotRoutes')).default
    authRoutes = require(path.join(backendPath, 'routes/authRoutes')).default
    corsMiddleware = require(path.join(backendPath, 'middleware/cors')).corsMiddleware
    errorHandler = require(path.join(backendPath, 'middleware/errorHandler')).errorHandler
    notFoundHandler = require(path.join(backendPath, 'middleware/errorHandler')).notFoundHandler
    console.log('✅ Loaded backend from TypeScript source')
  } catch (tsError) {
    console.error('❌ Failed to load backend routes:', tsError)
    throw tsError
  }
}

// Apply CORS middleware
router.use(corsMiddleware)

// Travel API routes
router.use('/cities', cityRoutes)
router.use('/trips', tripRoutes)
router.use('/currencies', currencyRoutes)
router.use('/travelbot', travelBotRoutes)
router.use('/auth', authRoutes)

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Budget Compass API is running',
    timestamp: new Date().toISOString(),
  })
})

// Error handlers
router.use(notFoundHandler)
router.use(errorHandler)

module.exports = router

