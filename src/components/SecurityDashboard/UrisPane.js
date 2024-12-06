import React from 'react';
import {
  Box,
  Card,
  CardContent,
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
  Grid,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getMethodColor } from '../../utils/colorHelpers.js';
import { scrollbarStyles } from './styles.js';
import { userAgents } from '../../data/mockUserAgents.js';
import { organizations } from '../../data/mockOrganizations.js';
import { countries } from '../../data/mockCountries.js';
import { isps } from '../../data/mockIsps.js';

const DataTable = ({ title, data, monospaceContent = false }) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }}
  >
    <Box sx={{ p: 1, pb: 1, flexShrink: 0 }}>
      <Typography variant='caption' color='text.secondary'>
        {title}
      </Typography>
    </Box>
    <Card
      variant='outlined'
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ ...scrollbarStyles, maxHeight: '100%' }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{title.replace(/s$/, '')}</TableCell>
              <TableCell align='center' width='100px'>
                Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow
                key={item.id}
                hover
                sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{
                      fontSize: '0.875rem',
                      ...(monospaceContent ? { fontFamily: 'monospace' } : {}),
                    }}
                  >
                    {item.agent || item.name}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Chip
                    label={item.count}
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
    </Card>
  </Box>
);

const UrisTable = ({
  sortedUris,
  selectedFingerprints,
  uriSort,
  handleUriSort,
}) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }}
  >
    <Box sx={{ p: 1, pb: 1, flexShrink: 0 }}>
      <Typography variant='caption' color='text.secondary'>
        URIs
      </Typography>
    </Box>
    <Card
      variant='outlined'
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ ...scrollbarStyles, maxHeight: '100%' }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={uriSort.field === 'uri'}
                  direction={uriSort.field === 'uri' ? uriSort.order : 'asc'}
                  onClick={() => handleUriSort('uri')}
                >
                  URI
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={uriSort.field === 'method'}
                  direction={uriSort.field === 'method' ? uriSort.order : 'asc'}
                  onClick={() => handleUriSort('method')}
                >
                  Method
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={uriSort.field === 'count'}
                  direction={uriSort.field === 'count' ? uriSort.order : 'asc'}
                  onClick={() => handleUriSort('count')}
                >
                  Count
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUris.length > 0 ? (
              sortedUris.map((uri, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <TableCell>
                    <Typography
                      variant='body2'
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
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
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={uri.count}
                      variant='outlined'
                      size='small'
                      color='primary'
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  <Typography color='text.secondary' sx={{ py: 4 }}>
                    {selectedFingerprints.size === 0
                      ? 'Select one or more fingerprints to view related URIs'
                      : 'No URIs found for selected fingerprints'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  </Box>
);

const UrisPane = ({
  width,
  sortedUris,
  selectedFingerprints,
  uriSort,
  handleUriSort,
}) => {
  return (
    <Box
      sx={{
        width: `${width}%`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            startIcon={<AddIcon sx={{ fontSize: '1.1rem' }} />}
            onClick={() => {}}
          >
            Create Policy
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='small'
            startIcon={<AddIcon sx={{ fontSize: '1.1rem' }} />}
            onClick={() => {}}
          >
            Create Label
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          px: 2,
          pb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Grid container spacing={2} sx={{ flex: 1, minHeight: 0 }}>
          <Grid item xs={8} sx={{ height: '50%', display: 'flex' }}>
            <UrisTable
              sortedUris={sortedUris}
              selectedFingerprints={selectedFingerprints}
              uriSort={uriSort}
              handleUriSort={handleUriSort}
            />
          </Grid>
          <Grid item xs={4} sx={{ height: '50%', display: 'flex' }}>
            <DataTable title='Countries' data={countries} />
          </Grid>
          <Grid item xs={4} sx={{ height: '50%', display: 'flex' }}>
            <DataTable
              title='User Agents'
              data={userAgents}
              monospaceContent={true}
            />
          </Grid>
          <Grid item xs={4} sx={{ height: '50%', display: 'flex' }}>
            <DataTable title='Organizations' data={organizations} />
          </Grid>
          <Grid item xs={4} sx={{ height: '50%', display: 'flex' }}>
            <DataTable title='ISPs' data={isps} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UrisPane;
