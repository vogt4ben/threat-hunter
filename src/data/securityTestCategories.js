export const securityTestCategories = [
  {
    id: 'broken-auth',
    name: 'Broken Authentication',
    description:
      'Tests for vulnerabilities in authentication mechanisms including session management, password policies, and token handling.',
    recommendations: [
      'Implement strong password policies',
      'Use secure session management',
      'Implement MFA where possible',
      'Secure token handling and storage',
    ],
  },
  {
    id: 'broken-function-auth',
    name: 'Broken Function Level Authorization',
    description:
      'Checks for proper authorization at the function/method level to prevent unauthorized access to functionality.',
    recommendations: [
      'Implement role-based access control (RBAC)',
      'Verify authorization at function level',
      'Log authorization failures',
      'Regular access control audits',
    ],
  },
  {
    id: 'broken-object-auth',
    name: 'Broken Object Level Authorization',
    description:
      'Tests for proper authorization at the object/data level to prevent unauthorized access to resources.',
    recommendations: [
      'Implement object-level access controls',
      'Use proper data ownership checks',
      'Validate user permissions for each object access',
      'Implement least privilege principle',
    ],
  },
  {
    id: 'excessive-data',
    name: 'Excessive Data Exposure',
    description:
      'Identifies instances where APIs expose more data than necessary, potentially leading to security risks.',
    recommendations: [
      'Implement data filtering',
      'Use proper response schemas',
      'Minimize sensitive data exposure',
      'Regular data exposure audits',
    ],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    description:
      'Specific tests for GraphQL endpoints including query depth, complexity, and introspection vulnerabilities.',
    recommendations: [
      'Implement query depth limiting',
      'Use query complexity analysis',
      'Disable introspection in production',
      'Implement proper error handling',
    ],
  },
  {
    id: 'improper-assets',
    name: 'Improper Assets Management',
    description:
      'Tests for proper management and security of API assets, versions, and documentation.',
    recommendations: [
      'Maintain API inventory',
      'Version control API endpoints',
      'Regular security reviews',
      'Proper documentation management',
    ],
  },
  {
    id: 'injection',
    name: 'Injection',
    description:
      'Tests for various injection vulnerabilities including SQL, NoSQL, and command injection.',
    recommendations: [
      'Use parameterized queries',
      'Input validation and sanitization',
      'Implement proper escaping',
      'Use ORM/query builders',
    ],
  },
  {
    id: 'rate-limiting',
    name: 'Lack of Resources & Rate Limiting',
    description:
      'Checks for proper implementation of rate limiting and resource allocation.',
    recommendations: [
      'Implement rate limiting',
      'Set up resource quotas',
      'Monitor API usage',
      'Implement request throttling',
    ],
  },
  {
    id: 'mass-assignment',
    name: 'Mass Assignment',
    description:
      'Tests for vulnerabilities related to mass assignment of properties in API requests.',
    recommendations: [
      'Whitelist allowed properties',
      'Implement property filtering',
      'Use DTOs for data transfer',
      'Regular security audits',
    ],
  },
  {
    id: 'ssrf',
    name: 'SSRF',
    description:
      'Server-Side Request Forgery tests to prevent unauthorized server requests.',
    recommendations: [
      'Validate and sanitize URLs',
      'Implement URL whitelisting',
      'Use proper network segmentation',
      'Monitor outbound requests',
    ],
  },
];
