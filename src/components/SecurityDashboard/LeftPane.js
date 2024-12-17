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

const LeftPane = ({
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
        overflow: 'hidden',
      }}
    >
      <Box p={1} borderBottom={1} borderColor='divider' flexShrink={0}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='rules-select-label' sx={{ fontSize: '0.75rem' }}>
              Pivot
            </InputLabel>
            <Select
              labelId='rules-select-label'
              id='rules-select'
              value='rules'
              label='Pivot'
              onChange={() => {}}
              sx={{
                fontSize: '0.75rem',
                '.MuiSelect-select': {
                  py: 0.75,
                },
              }}
            >
              <MenuItem value='rules' sx={{ fontSize: '0.75rem', py: 0.5 }}>
                Rules
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
              <TableCell padding='checkbox' size='small'>
                <Checkbox
                  size='small'
                  indeterminate={
                    selectedRisks.size > 0 &&
                    selectedRisks.size < sortedContributors.length
                  }
                  checked={selectedRisks.size === sortedContributors.length}
                  onChange={handleSelectAll}
                  sx={{
                    p: 0.25,
                    '& .MuiSvgIcon-root': { fontSize: '1rem' },
                  }}
                />
              </TableCell>
              <TableCell
                width='15%'
                align='center'
                size='small'
                sx={{ py: 0.75 }}
              >
                <TableSortLabel
                  active={getSortPriority('weight') !== null}
                  direction={getSortDirection('weight')}
                  onClick={() => handleSort('weight')}
                  size='small'
                >
                  <Typography
                    variant='caption'
                    sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Weight
                  </Typography>
                  {getSortPriority('weight') && (
                    <Box component='span' sx={{ ml: 0.5, fontSize: '0.7rem' }}>
                      {getSortPriority('weight')}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
              <TableCell size='small' sx={{ py: 0.75 }}>
                <Typography
                  variant='caption'
                  sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                >
                  Rule
                </Typography>
              </TableCell>
              <TableCell
                width='20%'
                align='center'
                size='small'
                sx={{ py: 0.75 }}
              >
                <TableSortLabel
                  active={getSortPriority('affectedEndpoints') !== null}
                  direction={getSortDirection('affectedEndpoints')}
                  onClick={() => handleSort('affectedEndpoints')}
                  size='small'
                >
                  <Typography
                    variant='caption'
                    sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                  >
                    Count
                  </Typography>
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
                  '& td': { border: 0, py: 0.25 },
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
                    sx={{
                      p: 0.25,
                      '& .MuiSvgIcon-root': { fontSize: '1rem' },
                    }}
                  />
                </TableCell>
                <TableCell align='center' size='small'>
                  <Chip
                    label={contributor.weight}
                    color={getWeightColor(contributor.weight)}
                    size='small'
                    sx={{
                      height: '16px',
                      '& .MuiChip-label': { fontSize: '0.75rem', px: 1, py: 0 },
                    }}
                  />
                </TableCell>
                <TableCell size='small'>
                  <Typography
                    variant='body2'
                    sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}
                  >
                    {contributor.name}
                  </Typography>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ fontSize: '0.7rem', lineHeight: 1.2 }}
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
                    sx={{
                      height: '16px',
                      '& .MuiChip-label': { fontSize: '0.75rem', px: 1, py: 0 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default LeftPane;
