import React from 'react';
import { Box } from '@mui/material';
import { resizeHandleStyles } from './styles.js';

const ResizeHandle = ({ left, isResizing, onMouseDown }) => {
  return (
    <Box
      sx={{
        ...resizeHandleStyles(isResizing),
        height: '100%',
        zIndex: 2,
      }}
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizeHandle;
