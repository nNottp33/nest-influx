export default () => ({
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  IV: process.env.IV,
  DB: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '5432',
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'postgres'
  }
})
