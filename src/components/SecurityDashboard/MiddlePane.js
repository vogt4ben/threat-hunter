import React from 'react';
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
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { scrollbarStyles } from './styles.js';

const MiddlePane = ({
  width,
  getRelatedFingerprints,
  selectedFingerprints,
  setSelectedFingerprints,
  handleFingerprintSelect,
  fingerprintSort,
  handleFingerprintSort,
}) => {
  return (
    <Box
      sx={{
        width: `${width}%`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box p={1} borderBottom={1} borderColor='divider' flexShrink={0}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size='small'>
            <InputLabel
              id='fingerprints-select-label'
              sx={{ fontSize: '0.75rem' }}
            >
              Pivot
            </InputLabel>
            <Select
              labelId='fingerprints-select-label'
              id='fingerprints-select'
              value='fingerprints'
              label='Pivot'
              onChange={() => {}}
              sx={{
                fontSize: '0.75rem',
                '.MuiSelect-select': {
                  py: 0.75,
                },
              }}
            >
              <MenuItem
                value='fingerprints'
                sx={{ fontSize: '0.75rem', py: 0.5 }}
              >
                Fingerprints
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          ...scrollbarStyles,
        }}
      >
        <Table
          size='small'
          stickyHeader
          sx={{ '& td, & th': { fontSize: '0.75rem' } }}
        >
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
                  size='small'
                  indeterminate={
                    selectedFingerprints.size > 0 &&
                    selectedFingerprints.size < getRelatedFingerprints.length
                  }
                  checked={
                    getRelatedFingerprints.length > 0 &&
                    selectedFingerprints.size === getRelatedFingerprints.length
                  }
                  onChange={event => {
                    if (event.target.checked) {
                      setSelectedFingerprints(
                        new Set(getRelatedFingerprints.map(f => f.id)),
                      );
                    } else {
                      setSelectedFingerprints(new Set());
                    }
                  }}
                  sx={{
                    p: 0.25,
                    '& .MuiSvgIcon-root': { fontSize: '1rem' },
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 0.75 }}>
                <Typography
                  variant='caption'
                  sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                >
                  Fingerprint ID
                </Typography>
              </TableCell>
              <TableCell align='center' sx={{ py: 0.75 }}>
                <TableSortLabel
                  active={fingerprintSort.field === 'confidence'}
                  direction={
                    fingerprintSort.field === 'confidence'
                      ? fingerprintSort.order
                      : 'asc'
                  }
                  onClick={() => handleFingerprintSort('confidence')}
                  size='small'
                >
                  <Typography
                    variant='caption'
                    sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Confidence
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align='center' sx={{ py: 0.75 }}>
                <TableSortLabel
                  active={fingerprintSort.field === 'eventCount'}
                  direction={
                    fingerprintSort.field === 'eventCount'
                      ? fingerprintSort.order
                      : 'asc'
                  }
                  onClick={() => handleFingerprintSort('eventCount')}
                  size='small'
                >
                  <Typography
                    variant='caption'
                    sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Event Count
                  </Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRelatedFingerprints.length > 0 ? (
              getRelatedFingerprints.map(fingerprint => (
                <TableRow
                  key={fingerprint.id}
                  hover
                  selected={selectedFingerprints.has(fingerprint.id)}
                  onClick={() => handleFingerprintSelect(fingerprint.id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    '& td': { border: 0, py: 0.25 },
                  }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      size='small'
                      checked={selectedFingerprints.has(fingerprint.id)}
                      onClick={e => e.stopPropagation()}
                      onChange={e => {
                        e.stopPropagation();
                        handleFingerprintSelect(fingerprint.id);
                      }}
                      sx={{
                        p: 0.25,
                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant='body2'
                      sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}
                    >
                      {fingerprint.id}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={fingerprint.confidence}
                      color={
                        fingerprint.confidence >= 90 ? 'success' : 'warning'
                      }
                      size='small'
                      sx={{
                        height: '16px',
                        '& .MuiChip-label': {
                          fontSize: '0.75rem',
                          px: 1,
                          py: 0,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={fingerprint.eventCount}
                      variant='outlined'
                      size='small'
                      color='primary'
                      sx={{
                        height: '16px',
                        '& .MuiChip-label': {
                          fontSize: '0.75rem',
                          px: 1,
                          py: 0,
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ fontSize: '0.75rem' }}
                  >
                    Select one or more rules to view related fingerprints
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MiddlePane;
