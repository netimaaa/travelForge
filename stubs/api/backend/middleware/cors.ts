import cors from 'cors'

// Allow all origins for production
export const corsOptions: cors.CorsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // Must be false when origin is '*'
  optionsSuccessStatus: 204,
  preflightContinue: false,
}

export const corsMiddleware = cors(corsOptions)
