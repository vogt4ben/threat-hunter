import React, { useState } from 'react';
import {
  Box,
  Chip,
  Stack,
  Typography,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { scrollbarStyles } from './styles.js';

const FilterPopper = ({ items, open, anchorEl, onClose, title }) => {
  if (!open) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement='bottom-start'
      style={{ zIndex: 1300 }}
    >
      <Paper
        elevation={3}
        onMouseEnter={() => {}}
        onMouseLeave={onClose}
        sx={{
          p: 1,
          mt: 0.5,
          maxHeight: 300,
          maxWidth: 400,
          overflow: 'auto',
          ...scrollbarStyles,
        }}
      >
        <Typography
          variant='caption'
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'text.secondary',
            display: 'block',
            mb: 0.5,
          }}
        >
          {title} ({items.length})
        </Typography>
        <List dense disablePadding>
          {items.map((item, index) => (
            <ListItem
              key={item.id}
              disableGutters
              sx={{
                py: 0.25,
                borderBottom: index < items.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant='caption'
                    sx={{
                      fontSize: '0.75rem',
                      display: 'block',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name || item.id}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Popper>
  );
};

const FilterBar = ({
  selectedRules = [],
  selectedFingerprints = [],
  onRemoveRule,
  onRemoveFingerprint,
  onClearAll,
}) => {
  const [rulesAnchorEl, setRulesAnchorEl] = useState(null);
  const [fingerprintsAnchorEl, setFingerprintsAnchorEl] = useState(null);

  const hasFilters =
    selectedRules.length > 0 || selectedFingerprints.length > 0;

  const handleRulesMouseEnter = event => {
    setRulesAnchorEl(event.currentTarget);
  };

  const handleFingerprintsMouseEnter = event => {
    setFingerprintsAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        minHeight: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        flexWrap='wrap'
        sx={{ gap: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FilterListIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
          <Typography
            variant='caption'
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            Filters:
          </Typography>
        </Box>

        {!hasFilters && (
          <Typography
            variant='caption'
            sx={{
              fontSize: '0.75rem',
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            No active filters
          </Typography>
        )}

        {selectedRules.length > 0 && (
          <>
            <Box onMouseLeave={() => setRulesAnchorEl(null)}>
              <Chip
                onMouseEnter={handleRulesMouseEnter}
                label={
                  <Box
                    component='span'
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Typography component='span' sx={{ fontSize: '0.75rem' }}>
                      Rules:
                    </Typography>
                    <Typography
                      component='span'
                      sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                    >
                      {selectedRules.length} selected
                    </Typography>
                  </Box>
                }
                onDelete={() =>
                  selectedRules.forEach(rule => onRemoveRule(rule.id))
                }
                deleteIcon={<CloseIcon sx={{ fontSize: '0.875rem' }} />}
                size='small'
                variant='outlined'
                sx={{
                  height: '20px',
                  '& .MuiChip-label': { px: 1 },
                  '& .MuiChip-deleteIcon': {
                    fontSize: '0.875rem',
                    width: '16px',
                    height: '16px',
                    margin: '0 4px 0 -4px',
                  },
                }}
              />
              <FilterPopper
                items={selectedRules}
                open={Boolean(rulesAnchorEl)}
                anchorEl={rulesAnchorEl}
                onClose={() => setRulesAnchorEl(null)}
                title='Selected Rules'
              />
            </Box>
          </>
        )}

        {selectedFingerprints.length > 0 && (
          <>
            <Box onMouseLeave={() => setFingerprintsAnchorEl(null)}>
              <Chip
                onMouseEnter={handleFingerprintsMouseEnter}
                label={
                  <Box
                    component='span'
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <Typography component='span' sx={{ fontSize: '0.75rem' }}>
                      Fingerprints:
                    </Typography>
                    <Typography
                      component='span'
                      sx={{ fontSize: '0.75rem', fontWeight: 500 }}
                    >
                      {selectedFingerprints.length} selected
                    </Typography>
                  </Box>
                }
                onDelete={() =>
                  selectedFingerprints.forEach(fp => onRemoveFingerprint(fp.id))
                }
                deleteIcon={<CloseIcon sx={{ fontSize: '0.875rem' }} />}
                size='small'
                variant='outlined'
                sx={{
                  height: '20px',
                  '& .MuiChip-label': { px: 1 },
                  '& .MuiChip-deleteIcon': {
                    fontSize: '0.875rem',
                    width: '16px',
                    height: '16px',
                    margin: '0 4px 0 -4px',
                  },
                }}
              />
              <FilterPopper
                items={selectedFingerprints}
                open={Boolean(fingerprintsAnchorEl)}
                anchorEl={fingerprintsAnchorEl}
                onClose={() => setFingerprintsAnchorEl(null)}
                title='Selected Fingerprints'
              />
            </Box>
          </>
        )}

        {hasFilters && (
          <Chip
            label={
              <Typography sx={{ fontSize: '0.75rem' }}>Clear all</Typography>
            }
            onClick={onClearAll}
            size='small'
            variant='outlined'
            color='error'
            sx={{
              height: '20px',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        )}
      </Stack>

      {hasFilters && (
        <Button
          variant='contained'
          color='primary'
          size='small'
          startIcon={<AddIcon sx={{ fontSize: '0.875rem' }} />}
          sx={{
            fontSize: '0.75rem',
            py: 0.25,
            height: '20px',
            minHeight: 0,
            lineHeight: 1.2,
            ml: 2,
            '& .MuiButton-startIcon': {
              marginRight: 0.5,
              marginLeft: -0.25,
            },
          }}
        >
          Create Policy from Filters
        </Button>
      )}
    </Box>
  );
};

export default FilterBar;
