export const mockEndpoints = {
  1: [
    {
      id: '1-1',
      path: '/api/users/profile',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    },
    {
      id: '1-2',
      path: '/api/users/settings',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    },
    {
      id: '1-3',
      path: '/api/users/preferences',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    },
  ],
  2: [
    {
      id: '2-1',
      path: '/api/auth/login',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    },
    {
      id: '2-2',
      path: '/api/auth/verify',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), // 16 hours ago
    },
    {
      id: '2-3',
      path: '/api/auth/reset',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(), // 1 day 1 hour ago
    },
  ],
  3: [
    {
      id: '3-1',
      path: '/api/data/sensitive',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 2 days ago
    },
    {
      id: '3-2',
      path: '/api/data/public',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 3 days ago
    },
    {
      id: '3-3',
      path: '/api/data/private',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 4 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 4 days ago
    },
  ],
  4: [
    {
      id: '4-1',
      path: '/api/shadow/users',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 5 days ago
    },
    {
      id: '4-2',
      path: '/api/shadow/admin',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 6 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 6 days ago
    },
    {
      id: '4-3',
      path: '/api/shadow/config',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 1 week ago
    },
  ],
  5: [
    {
      id: '5-1',
      path: '/api/internal/logs',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 8 days ago
    },
    {
      id: '5-2',
      path: '/api/internal/metrics',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 9 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 9 days ago
    },
    {
      id: '5-3',
      path: '/api/internal/debug',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 10 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 10 days ago
    },
  ],
  6: [
    {
      id: '6-1',
      path: '/api/customer/details',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 11 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 11 days ago
    },
    {
      id: '6-2',
      path: '/api/customer/history',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 12 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 12 days ago
    },
    {
      id: '6-3',
      path: '/api/customer/preferences',
      method: 'GET',
      lastAccessed: new Date(
        Date.now() - 13 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 13 days ago
    },
  ],
  7: [
    {
      id: '7-1',
      path: '/api/orders/process',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 30 * 1000).toISOString(), // 30 seconds ago
    },
    {
      id: '7-2',
      path: '/api/orders/validate',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    },
    {
      id: '7-3',
      path: '/api/orders/submit',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    },
  ],
  8: [
    {
      id: '8-1',
      path: '/api/external/fetch',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 1.5 hours ago
    },
    {
      id: '8-2',
      path: '/api/external/proxy',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    },
    {
      id: '8-3',
      path: '/api/external/relay',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    },
  ],
  9: [
    {
      id: '9-1',
      path: '/api/system/fetch',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
    },
    {
      id: '9-2',
      path: '/api/system/request',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 1 day 6 hours ago
    },
    {
      id: '9-3',
      path: '/api/system/forward',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 1.5 days ago
    },
  ],
  10: [
    {
      id: '10-1',
      path: '/api/admin/execute',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 10 * 1000).toISOString(), // 10 seconds ago
    },
    {
      id: '10-2',
      path: '/api/admin/run',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 60 * 1000).toISOString(), // 1 minute ago
    },
    {
      id: '10-3',
      path: '/api/admin/process',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    },
  ],
  11: [
    {
      id: '11-1',
      path: '/api/legacy/users',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: '11-2',
      path: '/api/legacy/orders',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    },
    {
      id: '11-3',
      path: '/api/legacy/data',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), // 14 hours ago
    },
  ],
  12: [
    {
      id: '12-1',
      path: '/api/beta/features',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    },
    {
      id: '12-2',
      path: '/api/beta/settings',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), // 22 hours ago
    },
    {
      id: '12-3',
      path: '/api/beta/config',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), // 1 day 4 hours ago
    },
  ],
  13: [
    {
      id: '13-1',
      path: '/api/v1/authenticate',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString(), // 1 day 16 hours ago
    },
    {
      id: '13-2',
      path: '/api/v1/validate',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 44 * 60 * 60 * 1000).toISOString(), // 1 day 20 hours ago
    },
    {
      id: '13-3',
      path: '/api/v1/verify',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
  ],
  14: [
    {
      id: '14-1',
      path: '/api/payments/process',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 20 * 1000).toISOString(), // 20 seconds ago
    },
    {
      id: '14-2',
      path: '/api/payments/refund',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 minutes ago
    },
    {
      id: '14-3',
      path: '/api/payments/verify',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
    },
  ],
  15: [
    {
      id: '15-1',
      path: '/api/auth/password',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(), // 2.5 hours ago
    },
    {
      id: '15-2',
      path: '/api/auth/credentials',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(), // 5.5 hours ago
    },
    {
      id: '15-3',
      path: '/api/auth/login',
      method: 'POST',
      lastAccessed: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString(), // 9.5 hours ago
    },
  ],
  16: [
    {
      id: '16-1',
      path: '/api/business/workflow',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(), // 2 days 4 hours ago
    },
    {
      id: '16-2',
      path: '/api/business/process',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 56 * 60 * 60 * 1000).toISOString(), // 2 days 8 hours ago
    },
    {
      id: '16-3',
      path: '/api/business/execute',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(), // 2.5 days ago
    },
  ],
  17: [
    {
      id: '17-1',
      path: '/api/status/check',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    },
    {
      id: '17-2',
      path: '/api/status/verify',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), // 4 days ago
    },
    {
      id: '17-3',
      path: '/api/status/validate',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(), // 5 days ago
    },
  ],
  18: [
    {
      id: '18-1',
      path: '/api/gateway/request',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(), // 6 days ago
    },
    {
      id: '18-2',
      path: '/api/gateway/process',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 168 * 60 * 60 * 1000).toISOString(), // 1 week ago
    },
    {
      id: '18-3',
      path: '/api/gateway/relay',
      method: 'GET',
      lastAccessed: new Date(Date.now() - 192 * 60 * 60 * 1000).toISOString(), // 8 days ago
    },
  ],
};
