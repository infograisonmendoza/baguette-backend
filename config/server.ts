export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_ADMIN_BACKEND_URL', 'https://baguette-backend.onrender.com'),
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env('JWT_SECRET', '8TPRMXPNqXuQBxH0N//KDg=='),
      options: {
        secure: true,
        sameSite: 'none',
      },
    },
  },
  settings: {
    cors: {
      enabled: true,
      origin: ['https://baguette-backend.onrender.com'],
      credentials: true,
    },
  },
});
