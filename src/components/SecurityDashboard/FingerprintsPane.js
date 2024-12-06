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

const FingerprintsPane = ({
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
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Box p={2} borderBottom={1} borderColor='divider'>
        <Box sx={{ minWidth: 120, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id='fingerprints-select-label'>Pivot</InputLabel>
            <Select
              labelId='fingerprints-select-label'
              id='fingerprints-select'
              value='fingerprints'
              label='Pivot'
              onChange={() => {}}
            >
              <MenuItem value='fingerprints'>
                <em>Fingerprints</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant='h6' color='text.primary'>
          Related Fingerprints
        </Typography>
      </Box>
      <TableContainer
        component={Box}
        flex={1}
        overflow='auto'
        sx={scrollbarStyles}
      >
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox
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
                />
              </TableCell>
              <TableCell>Fingerprint ID</TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={fingerprintSort.field === 'confidence'}
                  direction={
                    fingerprintSort.field === 'confidence'
                      ? fingerprintSort.order
                      : 'asc'
                  }
                  onClick={() => handleFingerprintSort('confidence')}
                >
                  Confidence
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>
                <TableSortLabel
                  active={fingerprintSort.field === 'eventCount'}
                  direction={
                    fingerprintSort.field === 'eventCount'
                      ? fingerprintSort.order
                      : 'asc'
                  }
                  onClick={() => handleFingerprintSort('eventCount')}
                >
                  Event Count
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
                  }}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      checked={selectedFingerprints.has(fingerprint.id)}
                      onClick={e => e.stopPropagation()}
                      onChange={e => {
                        e.stopPropagation();
                        handleFingerprintSelect(fingerprint.id);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{fingerprint.id}</Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={fingerprint.confidence}
                      color={
                        fingerprint.confidence >= 90 ? 'success' : 'warning'
                      }
                      size='small'
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={fingerprint.eventCount}
                      variant='outlined'
                      size='small'
                      color='primary'
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  <Typography color='text.secondary' sx={{ py: 4 }}>
                    Select one or more rules to view related fingerprints
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FingerprintsPane;
