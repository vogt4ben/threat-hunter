// Mock URI data grouped by fingerprint ID
export const fingerprintToUris = {
  1525356519: [
    {
      uri: '/customer/account/loginPost/',
      method: 'POST',
      count: 190,
      status: 200,
    },
    { uri: '/api/v1/account/login', method: 'POST', count: 128, status: 200 },
    { uri: '/customer/account/login', method: 'GET', count: 23, status: 200 },
    {
      uri: '/api/v2/users/authenticate',
      method: 'POST',
      count: 156,
      status: 200,
    },
    { uri: '/api/v1/session/validate', method: 'GET', count: 89, status: 200 },
    { uri: '/auth/oauth/token', method: 'POST', count: 167, status: 201 },
    { uri: '/api/v1/users/logout', method: 'POST', count: 78, status: 200 },
    {
      uri: '/api/v2/auth/refresh-token',
      method: 'POST',
      count: 145,
      status: 200,
    },
  ],
  1631005585: [
    { uri: '/api/v1/account/create', method: 'POST', count: 130, status: 201 },
    { uri: '/api/v2/account/create', method: 'POST', count: 122, status: 201 },
    { uri: '/customer/account/create', method: 'GET', count: 15, status: 200 },
    { uri: '/api/v1/users/register', method: 'POST', count: 167, status: 201 },
    {
      uri: '/api/v2/customers/onboard',
      method: 'POST',
      count: 89,
      status: 201,
    },
    { uri: '/auth/signup', method: 'POST', count: 145, status: 201 },
    { uri: '/api/v1/verify-email', method: 'POST', count: 78, status: 200 },
    {
      uri: '/api/v2/complete-registration',
      method: 'POST',
      count: 92,
      status: 201,
    },
  ],
  2044328570: [
    { uri: '/api/inventory/remove', method: 'DELETE', count: 128, status: 200 },
    { uri: '/api/inventory/add', method: 'POST', count: 124, status: 201 },
    {
      uri: '/api/v1/products/bulk-update',
      method: 'PUT',
      count: 167,
      status: 200,
    },
    { uri: '/api/v2/stock/adjust', method: 'PATCH', count: 89, status: 200 },
    { uri: '/inventory/sync', method: 'POST', count: 145, status: 200 },
    {
      uri: '/api/v1/warehouse/transfer',
      method: 'POST',
      count: 78,
      status: 201,
    },
    { uri: '/api/v2/inventory/audit', method: 'GET', count: 234, status: 200 },
    {
      uri: '/api/v1/products/availability',
      method: 'GET',
      count: 156,
      status: 200,
    },
  ],
  3066039861: [
    { uri: '/api/v2/account/login', method: 'POST', count: 120, status: 200 },
    {
      uri: '/customer/account/createpost',
      method: 'POST',
      count: 33,
      status: 201,
    },
    { uri: '/api/v1/auth/mfa/verify', method: 'POST', count: 167, status: 200 },
    { uri: '/api/v2/session/extend', method: 'PUT', count: 89, status: 200 },
    { uri: '/auth/password/reset', method: 'POST', count: 145, status: 200 },
    { uri: '/api/v1/users/profile', method: 'GET', count: 234, status: 200 },
    { uri: '/api/v2/account/settings', method: 'PUT', count: 156, status: 200 },
    { uri: '/customer/preferences', method: 'PATCH', count: 78, status: 200 },
  ],
  476544184: [
    {
      uri: '/customer/account/loginPost',
      method: 'POST',
      count: 32,
      status: 200,
    },
    { uri: '/women/dress-skirts.html', method: 'GET', count: 32, status: 200 },
    { uri: '/api/v1/catalog/search', method: 'GET', count: 167, status: 200 },
    { uri: '/api/v2/products/filter', method: 'POST', count: 89, status: 200 },
    { uri: '/catalog/category/view', method: 'GET', count: 145, status: 200 },
    {
      uri: '/api/v1/products/recommendations',
      method: 'GET',
      count: 234,
      status: 200,
    },
    { uri: '/api/v2/wishlist/items', method: 'GET', count: 156, status: 200 },
    { uri: '/customer/recently-viewed', method: 'GET', count: 78, status: 200 },
  ],
  4891234567: [
    {
      uri: '/checkout/cart/add/product',
      method: 'POST',
      count: 28,
      status: 200,
    },
    { uri: '/customer/account/index', method: 'GET', count: 22, status: 200 },
    { uri: '/api/v1/cart/items', method: 'GET', count: 167, status: 200 },
    {
      uri: '/api/v2/checkout/shipping',
      method: 'POST',
      count: 89,
      status: 200,
    },
    { uri: '/api/v1/orders/create', method: 'POST', count: 145, status: 201 },
    {
      uri: '/checkout/payment/process',
      method: 'POST',
      count: 234,
      status: 200,
    },
    { uri: '/api/v2/cart/coupon', method: 'POST', count: 156, status: 200 },
    { uri: '/api/v1/orders/history', method: 'GET', count: 78, status: 200 },
  ],
  5678901234: [
    { uri: '/women/new-arrivals.html', method: 'GET', count: 17, status: 200 },
    { uri: '/man/new-arrivals.html', method: 'GET', count: 15, status: 200 },
    {
      uri: '/api/v1/products/trending',
      method: 'GET',
      count: 167,
      status: 200,
    },
    { uri: '/api/v2/catalog/featured', method: 'GET', count: 89, status: 200 },
    {
      uri: '/api/v1/collections/seasonal',
      method: 'GET',
      count: 145,
      status: 200,
    },
    {
      uri: '/api/v2/products/bestsellers',
      method: 'GET',
      count: 234,
      status: 200,
    },
    {
      uri: '/catalog/promotions/active',
      method: 'GET',
      count: 156,
      status: 200,
    },
    {
      uri: '/api/v1/inventory/availability',
      method: 'GET',
      count: 78,
      status: 200,
    },
  ],
  7123456789: [
    { uri: '/api/v1/admin/users', method: 'GET', count: 189, status: 200 },
    { uri: '/api/v2/admin/roles', method: 'POST', count: 145, status: 201 },
    { uri: '/admin/dashboard/metrics', method: 'GET', count: 234, status: 200 },
    { uri: '/api/v1/admin/logs', method: 'GET', count: 167, status: 200 },
    { uri: '/api/v2/admin/settings', method: 'PUT', count: 89, status: 200 },
    { uri: '/admin/reports/generate', method: 'POST', count: 156, status: 200 },
    { uri: '/api/v1/admin/audit', method: 'GET', count: 123, status: 200 },
    { uri: '/api/v2/admin/permissions', method: 'GET', count: 78, status: 200 },
  ],
  9876543210: [
    {
      uri: '/api/v1/notifications/preferences',
      method: 'PUT',
      count: 145,
      status: 200,
    },
    { uri: '/api/v2/messages/unread', method: 'GET', count: 234, status: 200 },
    {
      uri: '/notifications/mark-read',
      method: 'POST',
      count: 167,
      status: 200,
    },
    { uri: '/api/v1/alerts/subscribe', method: 'POST', count: 89, status: 201 },
    {
      uri: '/api/v2/notifications/history',
      method: 'GET',
      count: 156,
      status: 200,
    },
    { uri: '/messages/send', method: 'POST', count: 123, status: 201 },
    {
      uri: '/api/v1/notifications/settings',
      method: 'GET',
      count: 78,
      status: 200,
    },
    { uri: '/api/v2/messages/archive', method: 'POST', count: 92, status: 200 },
  ],
  8765432109: [
    { uri: '/api/v1/search/global', method: 'GET', count: 289, status: 200 },
    { uri: '/api/v2/search/filters', method: 'POST', count: 145, status: 200 },
    { uri: '/search/advanced', method: 'POST', count: 234, status: 200 },
    {
      uri: '/api/v1/search/suggestions',
      method: 'GET',
      count: 167,
      status: 200,
    },
    { uri: '/api/v2/search/categories', method: 'GET', count: 89, status: 200 },
    { uri: '/search/recent', method: 'GET', count: 156, status: 200 },
    { uri: '/api/v1/search/trending', method: 'GET', count: 123, status: 200 },
    { uri: '/api/v2/search/save', method: 'POST', count: 78, status: 201 },
  ],
};

// Additional mock data for specific URI patterns
export const commonUriPatterns = {
  auth: ['/api/v1/auth', '/api/v2/auth', '/auth', '/oauth'],
  products: ['/api/v1/products', '/api/v2/products', '/catalog', '/inventory'],
  users: ['/api/v1/users', '/api/v2/users', '/customer', '/account'],
  admin: ['/api/v1/admin', '/api/v2/admin', '/admin', '/management'],
  orders: ['/api/v1/orders', '/api/v2/orders', '/checkout', '/cart'],
};

// HTTP status code distribution
export const statusCodeDistribution = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};
