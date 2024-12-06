import React from 'react';
import { Box } from '@mui/material';
import { resizeHandleStyles } from './styles.js';

const ResizeHandle = ({ left, isResizing, onMouseDown }) => {
  return (
    <Box
      sx={{
        ...resizeHandleStyles(isResizing),
        position: 'absolute',
        left: `${left}%`,
        height: '100%',
        zIndex: 2,
      }}
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizeHandle;
