import React, { useState } from 'react';
import {
  Box,
  Chip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMethodColor } from '../../utils/colorHelpers.js';
import { scrollbarStyles } from './styles.js';
import { fingerprintToUserAgents } from '../../data/mockUserAgents.js';
import { fingerprintToOrganizations } from '../../data/mockOrganizations.js';
import { fingerprintToCountries } from '../../data/mockCountries.js';
import { fingerprintToIsps } from '../../data/mockIsps.js';

const CompactDataTable = ({ title, data, sort, handleSort }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? data : data.slice(0, 5);
  const hasMore = data.length > 5;

  return (
    <Table size='small' sx={{ '& td, & th': { fontSize: '0.75rem' } }}>
      <TableHead>
        <TableRow sx={{ '& th': { py: 0.5 } }}>
          <TableCell>
            <TableSortLabel
              active={sort.field === 'name'}
              direction={sort.field === 'name' ? sort.order : 'asc'}
              onClick={() => handleSort('name')}
              size='small'
            >
              <Typography
                variant='caption'
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                {title}
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={sort.field === 'count'}
              direction={sort.field === 'count' ? sort.order : 'asc'}
              onClick={() => handleSort('count')}
              size='small'
            >
              <Typography
                variant='caption'
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                Count
              </Typography>
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayItems.length > 0 ? (
          displayItems.map((item, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                '& td': { border: 0, py: 0.25 },
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                    wordBreak: 'break-all',
                    maxWidth: '100%',
                  }}
                >
                  {item.name || item.agent}
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Chip
                  label={item.count}
                  variant='outlined'
                  size='small'
                  color='primary'
                  sx={{
                    height: '16px',
                    '& .MuiChip-label': { fontSize: '0.75rem', px: 1, py: 0 },
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} align='center'>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontSize: '0.75rem' }}
              >
                Select fingerprints to view data
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {hasMore && (
          <TableRow>
            <TableCell colSpan={2} align='center' sx={{ py: 0.5 }}>
              <Button
                size='small'
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  py: 0.25,
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                {isExpanded ? 'Show less' : `Show ${data.length - 5} more...`}
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const UrisTable = ({
  sortedUris,
  selectedFingerprints,
  uriSort,
  handleUriSort,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayUris = isExpanded ? sortedUris : sortedUris.slice(0, 5);
  const hasMore = sortedUris.length > 5;

  return (
    <Table size='small' sx={{ '& td, & th': { fontSize: '0.75rem' } }}>
      <TableHead>
        <TableRow sx={{ '& th': { py: 0.5 } }}>
          <TableCell>
            <TableSortLabel
              active={uriSort.field === 'uri'}
              direction={uriSort.field === 'uri' ? uriSort.order : 'asc'}
              onClick={() => handleUriSort('uri')}
              size='small'
            >
              <Typography
                variant='caption'
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                URI
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell align='center'>
            <TableSortLabel
              active={uriSort.field === 'method'}
              direction={uriSort.field === 'method' ? uriSort.order : 'asc'}
              onClick={() => handleUriSort('method')}
              size='small'
            >
              <Typography
                variant='caption'
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                Method
              </Typography>
            </TableSortLabel>
          </TableCell>
          <TableCell align='right'>
            <TableSortLabel
              active={uriSort.field === 'count'}
              direction={uriSort.field === 'count' ? uriSort.order : 'asc'}
              onClick={() => handleUriSort('count')}
              size='small'
            >
              <Typography
                variant='caption'
                sx={{ fontSize: '0.75rem', fontWeight: 500 }}
              >
                Count
              </Typography>
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayUris.length > 0 ? (
          displayUris.map((uri, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                '& td': { border: 0, py: 0.25 },
              }}
            >
              <TableCell>
                <Typography
                  variant='body2'
                  sx={{
                    fontSize: '0.75rem',
                    lineHeight: 1.2,
                    wordBreak: 'break-all',
                    maxWidth: '100%',
                  }}
                >
                  {uri.uri}
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Chip
                  label={uri.method}
                  color={getMethodColor(uri.method)}
                  size='small'
                  sx={{
                    height: '16px',
                    '& .MuiChip-label': { fontSize: '0.75rem', px: 1, py: 0 },
                  }}
                />
              </TableCell>
              <TableCell align='right'>
                <Chip
                  label={uri.count}
                  variant='outlined'
                  size='small'
                  color='primary'
                  sx={{
                    height: '16px',
                    '& .MuiChip-label': { fontSize: '0.75rem', px: 1, py: 0 },
                  }}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} align='center'>
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontSize: '0.75rem' }}
              >
                {selectedFingerprints.size === 0
                  ? 'Select fingerprints to view URIs'
                  : 'No URIs found'}
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {hasMore && (
          <TableRow>
            <TableCell colSpan={3} align='center' sx={{ py: 0.5 }}>
              <Button
                size='small'
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  py: 0.25,
                  minHeight: 0,
                  minWidth: 0,
                }}
              >
                {isExpanded
                  ? 'Show less'
                  : `Show ${sortedUris.length - 5} more...`}
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const AccordionHeader = ({ title, count }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography variant='caption' sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
      {title}
    </Typography>
    <Chip
      label={count}
      size='small'
      variant='outlined'
      sx={{
        height: '16px',
        '& .MuiChip-label': {
          fontSize: '0.7rem',
          px: 0.75,
          py: 0,
          lineHeight: 1.2,
        },
      }}
    />
  </Box>
);

const RightPane = ({
  width,
  sortedUris,
  selectedFingerprints,
  uriSort,
  handleUriSort,
}) => {
  const [expanded, setExpanded] = useState([
    'uris',
    'countries',
    'userAgents',
    'organizations',
    'isps',
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [countrySort, setCountrySort] = useState({
    field: 'count',
    order: 'desc',
  });
  const [userAgentSort, setUserAgentSort] = useState({
    field: 'count',
    order: 'desc',
  });
  const [organizationSort, setOrganizationSort] = useState({
    field: 'count',
    order: 'desc',
  });
  const [ispSort, setIspSort] = useState({ field: 'count', order: 'desc' });

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(prev => {
      if (isExpanded) {
        return [...prev, panel];
      } else {
        return prev.filter(item => item !== panel);
      }
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getAggregatedData = fingerprintMap => {
    const allData = [];
    selectedFingerprints.forEach(fingerprintId => {
      const items = fingerprintMap[fingerprintId] || [];
      allData.push(...items);
    });

    const dataMap = new Map();
    allData.forEach(item => {
      const key = item.name || item.agent;
      if (dataMap.has(key)) {
        dataMap.get(key).count += item.count;
      } else {
        dataMap.set(key, { ...item });
      }
    });

    return Array.from(dataMap.values());
  };

  const sortData = (data, sort) => {
    return [...data].sort((a, b) => {
      const isAsc = sort.order === 'asc';
      const valueA = a[sort.field];
      const valueB = b[sort.field];

      if (typeof valueA === 'string') {
        return isAsc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return isAsc ? valueA - valueB : valueB - valueA;
    });
  };

  const sortedCountries = sortData(
    getAggregatedData(fingerprintToCountries),
    countrySort,
  );
  const sortedUserAgents = sortData(
    getAggregatedData(fingerprintToUserAgents),
    userAgentSort,
  );
  const sortedOrganizations = sortData(
    getAggregatedData(fingerprintToOrganizations),
    organizationSort,
  );
  const sortedIsps = sortData(getAggregatedData(fingerprintToIsps), ispSort);

  const handleCountrySort = field => {
    setCountrySort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleUserAgentSort = field => {
    setUserAgentSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleOrganizationSort = field => {
    setOrganizationSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleIspSort = field => {
    setIspSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Stack spacing={0.25}>
            <Accordion
              expanded={expanded.includes('uris')}
              onChange={handleAccordionChange('uris')}
              sx={{
                bgcolor: 'background.paper',
                '&.MuiAccordion-root': {
                  mb: 0,
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  minHeight: 32,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionHeader title='URIs' count={sortedUris.length} />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0.75, pt: 0 }}>
                <UrisTable
                  sortedUris={sortedUris}
                  selectedFingerprints={selectedFingerprints}
                  uriSort={uriSort}
                  handleUriSort={handleUriSort}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes('countries')}
              onChange={handleAccordionChange('countries')}
              sx={{
                bgcolor: 'background.paper',
                '&.MuiAccordion-root': {
                  mb: 0,
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  minHeight: 32,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionHeader
                  title='Countries'
                  count={sortedCountries.length}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0.75, pt: 0 }}>
                <CompactDataTable
                  title='Countries'
                  data={sortedCountries}
                  sort={countrySort}
                  handleSort={handleCountrySort}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes('userAgents')}
              onChange={handleAccordionChange('userAgents')}
              sx={{
                bgcolor: 'background.paper',
                '&.MuiAccordion-root': {
                  mb: 0,
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  minHeight: 32,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionHeader
                  title='User Agents'
                  count={sortedUserAgents.length}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0.75, pt: 0 }}>
                <CompactDataTable
                  title='User Agents'
                  data={sortedUserAgents}
                  sort={userAgentSort}
                  handleSort={handleUserAgentSort}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes('organizations')}
              onChange={handleAccordionChange('organizations')}
              sx={{
                bgcolor: 'background.paper',
                '&.MuiAccordion-root': {
                  mb: 0,
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  minHeight: 32,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionHeader
                  title='Organizations'
                  count={sortedOrganizations.length}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0.75, pt: 0 }}>
                <CompactDataTable
                  title='Organizations'
                  data={sortedOrganizations}
                  sort={organizationSort}
                  handleSort={handleOrganizationSort}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded.includes('isps')}
              onChange={handleAccordionChange('isps')}
              sx={{
                bgcolor: 'background.paper',
                '&.MuiAccordion-root': {
                  mb: 0,
                  '&:before': {
                    display: 'none',
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  minHeight: 32,
                  '& .MuiAccordionSummary-content': { my: 0 },
                }}
              >
                <AccordionHeader title='ISPs' count={sortedIsps.length} />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0.75, pt: 0 }}>
                <CompactDataTable
                  title='ISPs'
                  data={sortedIsps}
                  sort={ispSort}
                  handleSort={handleIspSort}
                />
              </AccordionDetails>
            </Accordion>
          </Stack>
        );
      case 1:
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant='body2' color='text.secondary'>
              Transactions view coming soon...
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: `${width}%`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
        maxWidth: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 1 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: 32,
            '& .MuiTab-root': {
              minHeight: 32,
              fontSize: '0.75rem',
              textTransform: 'none',
              fontWeight: 500,
              py: 0.75,
            },
          }}
        >
          <Tab label='Details' />
          <Tab label='Transactions' />
        </Tabs>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 2,
          pt: 1.5,
          pb: 1,
          ...scrollbarStyles,
          minWidth: 0,
          '& .MuiTableContainer-root': {
            minWidth: 0,
          },
          '& .MuiTable-root': {
            minWidth: 0,
            width: '100%',
          },
        }}
      >
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default RightPane;
