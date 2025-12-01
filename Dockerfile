FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy backend source and config
COPY stubs/api/backend ./stubs/api/backend
COPY tsconfig.backend.json ./

# Build backend TypeScript
RUN npm run build:backend

# Expose port
EXPOSE 5000

# Start server from compiled output
CMD ["node", "stubs/api/backend-dist/server.js"]

