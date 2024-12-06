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
import { getWeightColor } from '../../utils/colorHelpers.js';
import { scrollbarStyles } from './styles.js';

const RiskContributorsPane = ({
  width,
  sortedContributors,
  selectedRisks,
  handleSelectAll,
  handleSelectRisk,
  handleSort,
  getSortDirection,
  getSortPriority,
}) => {
  return (
    <Box
      sx={{
        width: `${width}%`,
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',
        overflow: 'auto',
      }}
    >
      <Box p={1.5} borderBottom={1} borderColor='divider'>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='rules-select-label'>Pivot</InputLabel>
            <Select
              labelId='rules-select-label'
              id='rules-select'
              value='rules'
              label='Pivot'
              onChange={() => {}}
            >
              <MenuItem value='rules'>
                <Typography variant='body2'>Rules</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer
        component={Box}
        flex={1}
        overflow='auto'
        maxHeight='calc(100vh - 80px)'
        sx={{
          ...scrollbarStyles,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox' size='small'>
                <Checkbox
                  size='small'
                  indeterminate={
                    selectedRisks.size > 0 &&
                    selectedRisks.size < sortedContributors.length
                  }
                  checked={selectedRisks.size === sortedContributors.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell width='15%' align='center' size='small'>
                <TableSortLabel
                  active={getSortPriority('weight') !== null}
                  direction={getSortDirection('weight')}
                  onClick={() => handleSort('weight')}
                >
                  <Typography variant='body2'>Weight</Typography>
                  {getSortPriority('weight') && (
                    <Box component='span' sx={{ ml: 0.5, fontSize: '0.7rem' }}>
                      {getSortPriority('weight')}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
              <TableCell size='small'>
                <Typography variant='body2'>Rule</Typography>
              </TableCell>
              <TableCell width='20%' align='center' size='small'>
                <TableSortLabel
                  active={getSortPriority('affectedEndpoints') !== null}
                  direction={getSortDirection('affectedEndpoints')}
                  onClick={() => handleSort('affectedEndpoints')}
                >
                  <Typography variant='body2'>Count</Typography>
                  {getSortPriority('affectedEndpoints') && (
                    <Box component='span' sx={{ ml: 0.5, fontSize: '0.7rem' }}>
                      {getSortPriority('affectedEndpoints')}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedContributors.map(contributor => (
              <TableRow
                key={contributor.id}
                hover
                selected={selectedRisks.has(contributor.id)}
                onClick={() => handleSelectRisk(contributor.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <TableCell padding='checkbox' size='small'>
                  <Checkbox
                    size='small'
                    checked={selectedRisks.has(contributor.id)}
                    onClick={e => e.stopPropagation()}
                    onChange={e => {
                      e.stopPropagation();
                      handleSelectRisk(contributor.id);
                    }}
                  />
                </TableCell>
                <TableCell align='center' size='small'>
                  <Chip
                    label={contributor.weight}
                    color={getWeightColor(contributor.weight)}
                    size='small'
                  />
                </TableCell>
                <TableCell size='small'>
                  <Typography variant='body2' sx={{ fontSize: '0.875rem' }}>
                    {contributor.name}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {contributor.category}
                  </Typography>
                </TableCell>
                <TableCell align='center' size='small'>
                  <Chip
                    label={contributor.affectedEndpoints}
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
  );
};

export default RiskContributorsPane;
