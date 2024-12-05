import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Box,
  Chip,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { mockTransactions } from '../data/mockTransactions';
import { securityTestCategories } from '../data/securityTestCategories';

const risks = [
  {
    id: 1,
    severity: 10,
    description: 'Sensitive Data Detected in API Request and Response Body',
  },
  {
    id: 2,
    severity: 9,
    description:
      'Undocumented API Endpoint: Discovered, with Sensitive Data in Response Body, and No Authentication, Responded Successfully',
  },
  { id: 3, severity: 9, description: 'No authentication method detected' },
  {
    id: 4,
    severity: 8,
    description:
      'Undocumented API Endpoint: Shadow, with Sensitive Data in Response body, Responded Successfully',
  },
  {
    id: 5,
    severity: 8,
    description:
      'Undocumented API Endpoint: Discovered, with Sensitive Data in Response Body, Responded Successfully',
  },
  {
    id: 6,
    severity: 8,
    description: 'Sensitive Data Detected in Response Body',
  },
  {
    id: 7,
    severity: 8,
    description: 'Unexpected Response Code to Unexpected Request Body',
  },
  {
    id: 8,
    severity: 7,
    description:
      'Host not matching URI detected in Request Header (Suspected SSRF)',
  },
  {
    id: 9,
    severity: 7,
    description:
      'Host not matching URI detected in Request Body (Suspected SSRF)',
  },
  {
    id: 10,
    severity: 7,
    description: 'Command Injection Script Detect in Request Header',
  },
  {
    id: 11,
    severity: 6,
    description:
      'Undocumented API Endpoint: Shadow, with No Auth Detected, Responded Successfully',
  },
  {
    id: 12,
    severity: 6,
    description:
      'Undocumented API Endpoint: Discovered, with No Authentication, Responded Successfully',
  },
  {
    id: 13,
    severity: 3,
    description: 'API Key Based Authentication Detected in Header',
  },
  {
    id: 14,
    severity: 3,
    description:
      'Sensitive Data Detected in Request Body, Possible Sensitive Business Flow',
  },
  {
    id: 15,
    severity: 3,
    description:
      'Suspected Login API Endpoint, Password Detected in Request Body',
  },
  {
    id: 16,
    severity: 3,
    description:
      'Sensitive Data Detected in Request Header, Possible Sensitive Business Flow',
  },
  { id: 17, severity: 1, description: 'Non-Conformant Response Code' },
  { id: 18, severity: 1, description: 'Gateway Timeout' },
];

const mockEndpoints = {
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

const getRelativeTime = timestamp => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'min' : 'mins'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hr' : 'hrs'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }
};

const JsonDisplay = ({ data }) => {
  const formattedJson = JSON.stringify(data, null, 2);
  const lines = formattedJson.split('\n');

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Line Numbers */}
      <Box
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          pr: 2,
          mr: 2,
          color: 'text.secondary',
          textAlign: 'right',
          userSelect: 'none',
          fontFamily: 'monospace',
        }}
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </Box>
      {/* JSON Content */}
      <Box sx={{ fontFamily: 'monospace', textAlign: 'left', flex: 1 }}>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </Box>
    </Box>
  );
};

const mockHosts = [
  { value: 'prod', label: 'Production (api.example.com)' },
  { value: 'staging', label: 'Staging (api.staging.example.com)' },
  { value: 'dev', label: 'Development (api.dev.example.com)' },
  { value: 'local', label: 'Local (localhost:3000)' },
  { value: 'qa', label: 'QA (api.qa.example.com)' },
  { value: 'sandbox', label: 'Sandbox (api.sandbox.example.com)' },
];

const getSecurityTests = riskId => {
  return [];
};

const HighlightedJson = ({ data, riskId }) => {
  const formattedJson = JSON.stringify(data, null, 2);
  const lines = formattedJson.split('\n');

  // Define patterns to highlight based on risk type
  const getHighlightPattern = riskId => {
    const patterns = {
      1: /(ssn|credit[_-]?card|password|secret|key|token)["']:\s["']([^"']+)["']/gi,
      2: /(api[_-]?key|auth[_-]?token)["']:\s["']([^"']+)["']/gi,
      3: /(password|token|key)["']:\s["']([^"']+)["']/gi,
      // Add more patterns for other risk types...
    };
    return patterns[riskId];
  };

  const pattern = getHighlightPattern(riskId);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          pr: 2,
          mr: 2,
          color: 'text.secondary',
          textAlign: 'right',
          userSelect: 'none',
          fontFamily: 'monospace',
        }}
      >
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </Box>
      <Box sx={{ fontFamily: 'monospace', textAlign: 'left', flex: 1 }}>
        {lines.map((line, i) => {
          if (pattern) {
            const highlightedLine = line.replace(
              pattern,
              match =>
                `<span style="background-color: #ffeb3b; color: #000;">${match}</span>`,
            );
            return (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: highlightedLine }}
              />
            );
          }
          return <div key={i}>{line}</div>;
        })}
      </Box>
    </Box>
  );
};

const riskToSecurityCategories = {
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

const SecurityDashboard = () => {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(33);
  const [middleWidth, setMiddleWidth] = useState(33);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startLeftWidth, setStartLeftWidth] = useState(0);
  const [startMiddleWidth, setStartMiddleWidth] = useState(0);
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [currentTransaction, setCurrentTransaction] = useState(0);
  const [activeTab, setActiveTab] = useState('headers');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedHost, setSelectedHost] = useState('prod');
  const [runningTests, setRunningTests] = useState({});

  const handleRunTest = async categoryId => {
    setRunningTests(prev => ({ ...prev, [categoryId]: true }));

    try {
      // Simulate test running
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Test completed for category: ${categoryId}`);
    } finally {
      setRunningTests(prev => ({ ...prev, [categoryId]: false }));
    }
  };

  const onMouseDown = (e, isLeft) => {
    e.preventDefault();
    if (isLeft) {
      setIsResizingLeft(true);
    } else {
      setIsResizingRight(true);
    }
    setStartX(e.clientX);
    setStartLeftWidth(leftWidth);
    setStartMiddleWidth(middleWidth);
  };

  useEffect(() => {
    const onMouseMove = e => {
      if (!isResizingLeft && !isResizingRight) return;

      const containerWidth = containerRef.current?.offsetWidth || 1000;
      const deltaX = e.clientX - startX;
      const deltaPercentage = (deltaX / containerWidth) * 100;

      if (isResizingLeft) {
        const newLeftWidth = Math.min(
          Math.max(startLeftWidth + deltaPercentage, 20),
          60,
        );
        const widthDiff = newLeftWidth - startLeftWidth;
        const newMiddleWidth = startMiddleWidth - widthDiff;

        if (newMiddleWidth >= 20 && newMiddleWidth <= 60) {
          setLeftWidth(newLeftWidth);
          setMiddleWidth(newMiddleWidth);
        }
      } else if (isResizingRight) {
        const newMiddleWidth = Math.min(
          Math.max(startMiddleWidth + deltaPercentage, 20),
          60,
        );
        setMiddleWidth(newMiddleWidth);
      }
    };

    const onMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    isResizingLeft,
    isResizingRight,
    startX,
    startLeftWidth,
    startMiddleWidth,
  ]);

  const getMethodColor = method => {
    const colors = {
      GET: 'info',
      POST: 'success',
      PUT: 'warning',
      DELETE: 'error',
    };
    return colors[method] || 'default';
  };

  const getStatusColor = status => {
    const colors = {
      Active: 'success',
      Warning: 'warning',
      Error: 'error',
    };
    return colors[status] || 'default';
  };

  const getSeverityColor = severity => {
    if (severity >= 9) return 'error';
    if (severity >= 7) return 'warning';
    if (severity >= 4) return 'info';
    return 'default';
  };

  const rightWidth = 100 - leftWidth - middleWidth;

  const handleEndpointSelect = endpointId => {
    setSelectedEndpoint(endpointId);
    setSelectedTransaction(mockTransactions[endpointId] || null);
  };

  return (
    <Box
      ref={containerRef}
      display='flex'
      height='100vh'
      bgcolor='background.default'
    >
      {/* Risks Pane */}
      <Box
        sx={{
          width: `${leftWidth}%`,
          minWidth: '20%',
          maxWidth: '60%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Box p={2} borderBottom={1} borderColor='divider'>
          <Typography variant='h6' color='text.primary'>
            Risks
          </Typography>
        </Box>
        <TableContainer component={Box} flex={1} overflow='auto'>
          <Table size='small' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width='15%' align='center'>
                  Severity
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell width='20%' align='center'>
                  Endpoints
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {risks.map(risk => (
                <TableRow
                  key={risk.id}
                  hover
                  selected={selectedRisk === risk.id}
                  onClick={() => setSelectedRisk(risk.id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell align='center'>
                    <Chip
                      label={risk.severity}
                      color={getSeverityColor(risk.severity)}
                      size='small'
                    />
                  </TableCell>
                  <TableCell>
                    <Typography color='text.primary' variant='body2'>
                      {risk.description}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={`${mockEndpoints[risk.id]?.length || 0}`}
                      variant='outlined'
                      size='small'
                      color='primary'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Left Resize Handle */}
      <Box
        sx={{
          width: 4,
          bgcolor: 'divider',
          cursor: 'col-resize',
          '&:hover': { bgcolor: 'primary.main' },
          transition: 'background-color 0.2s',
        }}
        onMouseDown={e => onMouseDown(e, true)}
      />

      {/* Endpoints Pane */}
      <Box
        sx={{
          width: `${middleWidth}%`,
          minWidth: '20%',
          maxWidth: '60%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Box p={2} borderBottom={1} borderColor='divider'>
          <Typography variant='h6' color='text.primary'>
            Endpoints
          </Typography>
        </Box>
        <TableContainer component={Box} flex={1} overflow='auto'>
          <Table size='small' stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Method</TableCell>
                <TableCell>Path</TableCell>
                <TableCell>Last Accessed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRisk &&
                mockEndpoints[selectedRisk]?.map(endpoint => (
                  <TableRow
                    key={endpoint.id}
                    hover
                    selected={selectedEndpoint === endpoint.id}
                    onClick={() => handleEndpointSelect(endpoint.id)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={endpoint.method}
                        color={getMethodColor(endpoint.method)}
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <Typography color='text.primary'>
                        {endpoint.path}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='text.secondary'>
                        {getRelativeTime(endpoint.lastAccessed)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              {!selectedRisk && (
                <TableRow>
                  <TableCell colSpan={3} align='center'>
                    <Typography color='text.secondary' sx={{ py: 4 }}>
                      Select a risk to view related endpoints
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Right Resize Handle */}
      <Box
        sx={{
          width: 4,
          bgcolor: 'divider',
          cursor: 'col-resize',
          '&:hover': { bgcolor: 'primary.main' },
          transition: 'background-color 0.2s',
        }}
        onMouseDown={e => onMouseDown(e, false)}
      />

      {/* Transactions Pane */}
      <Box
        sx={{
          width: `${rightWidth}%`,
          minWidth: '20%',
          maxWidth: '60%',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          p={2}
          borderBottom={1}
          borderColor='divider'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box display='flex' alignItems='center' gap={1}>
            {selectedTransaction && (
              <>
                <Chip
                  label={selectedTransaction.method}
                  color={getMethodColor(selectedTransaction.method)}
                  size='small'
                />
                <Typography variant='h6' color='text.primary'>
                  {selectedTransaction.path}
                </Typography>
              </>
            )}
            {!selectedTransaction && (
              <Typography variant='h6' color='text.primary'>
                Transaction Details
              </Typography>
            )}
          </Box>
        </Box>
        <Box flex={1} overflow='auto'>
          {selectedTransaction ? (
            <>
              <Box p={2}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id='host-select-label'>Host</InputLabel>
                  <Select
                    labelId='host-select-label'
                    id='host-select'
                    value={selectedHost}
                    label='Host'
                    onChange={e => setSelectedHost(e.target.value)}
                    size='small'
                  >
                    {mockHosts.map(host => (
                      <MenuItem key={host.value} value={host.value}>
                        {host.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    textColor='primary'
                    indicatorColor='primary'
                  >
                    <Tab label='Headers' value='headers' />
                    <Tab label='Body' value='body' />
                  </Tabs>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Request Card */}
                  <Card sx={{ flex: 1 }}>
                    <CardHeader
                      sx={{ pb: 1 }}
                      title={
                        <Typography variant='subtitle1' color='text.primary'>
                          Request
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          border: 1,
                          borderColor: 'divider',
                          overflow: 'auto',
                        }}
                      >
                        <HighlightedJson
                          data={
                            activeTab === 'headers'
                              ? selectedTransaction.request.headers
                              : selectedTransaction.request.body
                          }
                          riskId={selectedRisk}
                        />
                      </Paper>
                    </CardContent>
                  </Card>

                  {/* Response Card */}
                  <Card sx={{ flex: 1 }}>
                    <CardHeader
                      sx={{ pb: 1 }}
                      title={
                        <Typography variant='subtitle1' color='text.primary'>
                          Response
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          border: 1,
                          borderColor: 'divider',
                          overflow: 'auto',
                        }}
                      >
                        <HighlightedJson
                          data={
                            activeTab === 'headers'
                              ? selectedTransaction.response.headers
                              : selectedTransaction.response.body
                          }
                          riskId={selectedRisk}
                        />
                      </Paper>
                    </CardContent>
                  </Card>
                </Box>

                {/* Security Tests Section */}
                <Box sx={{ mt: 3 }}>
                  <Card>
                    <CardHeader
                      title={
                        <Typography variant='h6' color='text.primary'>
                          Security Test Categories
                        </Typography>
                      }
                      subheader='Recommended security tests and best practices for this endpoint'
                    />
                    <CardContent>
                      {selectedRisk ? (
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell width='100' align='center'>
                                  Action
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {securityTestCategories
                                .filter(category =>
                                  riskToSecurityCategories[
                                    selectedRisk
                                  ]?.includes(category.id),
                                )
                                .map(category => (
                                  <TableRow
                                    key={category.id}
                                    hover
                                    sx={{
                                      '& > *': {
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                      },
                                    }}
                                  >
                                    <TableCell component='th' scope='row'>
                                      <Typography
                                        variant='subtitle1'
                                        fontWeight='medium'
                                      >
                                        {category.name}
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      {category.description}
                                    </TableCell>
                                    <TableCell align='center'>
                                      <Button
                                        variant='contained'
                                        size='small'
                                        color='primary'
                                        disabled={runningTests[category.id]}
                                        onClick={() =>
                                          handleRunTest(category.id)
                                        }
                                      >
                                        {runningTests[category.id]
                                          ? 'Running...'
                                          : 'Run Test'}
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                          <Typography color='text.secondary'>
                            Select a risk to view recommended security tests
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </>
          ) : (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='100%'
            >
              <Typography color='text.secondary'>
                Select an endpoint to view transaction details
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SecurityDashboard;
