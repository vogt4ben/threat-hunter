export const riskToSecurityCategories = {
  1: ['excessive-data'], // Sensitive Data in Request/Response
  2: ['broken-auth', 'broken-function-auth'], // Undocumented API with No Auth
  3: ['broken-auth', 'broken-function-auth', 'broken-object-auth'], // No authentication
  4: ['improper-assets'], // Undocumented Shadow API
  5: ['improper-assets'], // Undocumented API
  6: ['excessive-data'], // Sensitive Data in Response
  7: ['improper-assets'], // Unexpected Response
  8: ['ssrf'], // SSRF in Header
  9: ['ssrf'], // SSRF in Body
  10: ['injection'], // Command Injection
  11: ['improper-assets', 'broken-auth'], // Shadow API No Auth
  12: ['improper-assets', 'broken-auth'], // Undocumented API No Auth
  13: ['broken-auth'], // API Key Auth
  14: ['excessive-data'], // Sensitive Data in Body
  15: ['broken-auth'], // Login API
  16: ['excessive-data'], // Sensitive Data in Header
  17: ['rate-limiting'], // Non-Conformant Response
  18: ['rate-limiting'], // Gateway Timeout
};
