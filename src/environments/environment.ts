export const environment = {
  production: false,
  server: {
    url: 'http://localhost:8080',
    endpoints: {
      'auth': {
        login: '/api/auth/signin',
        register: '/api/auth/signup',
      },
      'content': {
        'user': '/api/content/user',
        'moderator': '/api/content/mod',
        'admin': '/api/content/admin',
        'public': '/api/content/public',
      },
      'documentation': {
        'swagger': '/api/v3/api-docs'
      }
    },
  },
  routes: {
    'home': '/home',
    'login': '/login',
    'register': '/register',
    'public': '/public',
    'user': '/app/user',
    'moderator': '/app/moderator',
    'admin': '/app/admin',
    'profile': '/app/profile',
    'documentation': '/app/documentation'
  },
  localStorage: {
    'token': 'accessToken',
    'user': 'user',
  }
};
