export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
    },
  },
};

export const resizeHandleStyles = isResizing => ({
  width: '12px',
  transform: 'translateX(-50%)',
  cursor: 'col-resize',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 2,
    height: '100%',
    bgcolor: isResizing ? 'primary.main' : 'divider',
    transition: 'background-color 0.2s',
  },
  '&:hover::after': {
    bgcolor: 'primary.main',
    width: 2,
  },
});
