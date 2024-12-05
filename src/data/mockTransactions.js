export const mockTransactions = {
  '1-1': {
    timestamp: '2024-03-01T10:00:00Z',
    method: 'GET',
    path: '/api/users/profile',
    request: {
      headers: {
        Authorization: 'Bearer jwt_token_123',
        'Content-Type': 'application/json',
      },
      body: {
        ssn: '123-45-6789',
        creditCard: '4111-1111-1111-1111',
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '45ms',
      },
      statusCode: 200,
      body: {
        personalInfo: {
          ssn: '123-45-6789',
          dob: '1990-01-01',
          address: '123 Main St',
        },
      },
    },
  },
  '1-2': {
    timestamp: '2024-03-01T09:00:00Z',
    method: 'GET',
    path: '/api/users/settings',
    request: {
      headers: {
        Authorization: 'Bearer jwt_token_456',
        'Content-Type': 'application/json',
      },
      body: {
        userId: 'USER123',
        settings: { showPrivateData: true },
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '35ms',
      },
      statusCode: 200,
      body: {
        settings: {
          email: 'user@example.com',
          phoneNumber: '555-0123',
          preferences: { theme: 'dark' },
        },
      },
    },
  },
  '1-3': {
    timestamp: '2024-03-01T08:30:00Z',
    method: 'POST',
    path: '/api/users/preferences',
    request: {
      headers: {
        Authorization: 'Bearer jwt_token_789',
        'Content-Type': 'application/json',
      },
      body: {
        preferences: {
          notifications: true,
          privateDataAccess: true,
        },
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '55ms',
      },
      statusCode: 200,
      body: {
        updated: true,
        sensitiveData: {
          apiKey: 'ak_live_123456',
          secretKey: 'sk_live_789012',
        },
      },
    },
  },
  '2-1': {
    timestamp: '2024-03-01T10:30:00Z',
    method: 'POST',
    path: '/api/auth/login',
    request: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username: 'admin',
        password: 'admin123',
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '120ms',
      },
      statusCode: 200,
      body: {
        token: 'jwt_token_123',
        user: {
          id: 1,
          role: 'admin',
          permissions: ['read', 'write', 'delete'],
        },
      },
    },
  },
  '2-2': {
    timestamp: '2024-03-01T09:30:00Z',
    method: 'POST',
    path: '/api/auth/verify',
    request: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        token: 'jwt_token_123',
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '89ms',
      },
      statusCode: 200,
      body: {
        valid: true,
        user: {
          id: 1,
          email: 'admin@example.com',
          apiKey: 'ak_123456',
        },
      },
    },
  },
  '2-3': {
    timestamp: '2024-03-01T08:45:00Z',
    method: 'POST',
    path: '/api/auth/reset',
    request: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: 'user@example.com',
      },
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '150ms',
      },
      statusCode: 200,
      body: {
        success: true,
        temporaryPassword: 'temp123',
        resetToken: 'rst_789012',
      },
    },
  },
  '3-1': {
    timestamp: '2024-03-01T11:00:00Z',
    method: 'GET',
    path: '/api/data/sensitive',
    request: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '67ms',
      },
      statusCode: 200,
      body: {
        users: [
          { id: 1, password: 'hash1', email: 'user1@example.com' },
          { id: 2, password: 'hash2', email: 'user2@example.com' },
        ],
      },
    },
  },
  '3-2': {
    timestamp: '2024-03-01T10:45:00Z',
    method: 'GET',
    path: '/api/data/public',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '45ms',
      },
      statusCode: 200,
      body: {
        config: {
          dbHost: 'db.example.com',
          dbUser: 'admin',
          dbPass: 'secretpass',
        },
      },
    },
  },
  '3-3': {
    timestamp: '2024-03-01T10:15:00Z',
    method: 'GET',
    path: '/api/data/private',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '78ms',
      },
      statusCode: 200,
      body: {
        secrets: {
          awsKey: 'AKIA...',
          awsSecret: 'SECRET...',
          apiKeys: ['key1', 'key2'],
        },
      },
    },
  },
  '4-1': {
    timestamp: '2024-03-01T11:15:00Z',
    method: 'GET',
    path: '/api/shadow/users',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '120ms',
      },
      statusCode: 200,
      body: {
        internalUsers: [
          { id: 1, password: 'hash1', role: 'admin' },
          { id: 2, password: 'hash2', role: 'user' },
        ],
      },
    },
  },
  '4-2': {
    timestamp: '2024-03-01T11:00:00Z',
    method: 'GET',
    path: '/api/shadow/admin',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '89ms',
      },
      statusCode: 200,
      body: {
        adminConfig: {
          masterKey: 'master123',
          rootPassword: 'root456',
        },
      },
    },
  },
  '4-3': {
    timestamp: '2024-03-01T10:45:00Z',
    method: 'GET',
    path: '/api/shadow/config',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '67ms',
      },
      statusCode: 200,
      body: {
        databaseConfig: {
          host: 'internal-db',
          user: 'root',
          password: 'toor',
        },
      },
    },
  },
  '5-1': {
    timestamp: '2024-03-01T11:30:00Z',
    method: 'GET',
    path: '/api/internal/logs',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '156ms',
      },
      statusCode: 200,
      body: {
        logs: [
          { level: 'ERROR', message: 'Failed login attempt', user: 'admin' },
          { level: 'INFO', message: 'Database backup', password: 'backup123' },
        ],
      },
    },
  },
  '5-2': {
    timestamp: '2024-03-01T11:15:00Z',
    method: 'GET',
    path: '/api/internal/metrics',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '134ms',
      },
      statusCode: 200,
      body: {
        metrics: {
          apiKey: 'mk_123456',
          secretKey: 'sk_789012',
        },
      },
    },
  },
  '5-3': {
    timestamp: '2024-03-01T11:00:00Z',
    method: 'GET',
    path: '/api/internal/debug',
    request: {
      headers: {},
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '98ms',
      },
      statusCode: 200,
      body: {
        debug: {
          env: 'production',
          credentials: {
            user: 'debug',
            pass: 'debug123',
          },
        },
      },
    },
  },
  '6-1': {
    timestamp: '2024-03-01T11:45:00Z',
    method: 'GET',
    path: '/api/customer/details',
    request: {
      headers: {
        Authorization: 'Bearer token123',
      },
      body: {},
    },
    response: {
      headers: {
        'Content-Type': 'application/json',
        'X-Response-Time': '78ms',
      },
      statusCode: 200,
      body: {
        settings: {
          email: 'user@example.com',
          phoneNumber: '555-0123',
          preferences: { theme: 'dark' },
        },
      },
    },
  },
};
