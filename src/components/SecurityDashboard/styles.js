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
  width: '16px',
  transform: 'translateX(-50%)',
  cursor: 'col-resize',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    '&::before': {
      opacity: 1,
      background: theme => theme.palette.primary.main,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '8px',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    borderRadius: '2px',
    background: theme => theme.palette.divider,
    opacity: 0.8,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '8px',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    borderRadius: '2px',
    background: theme => theme.palette.primary.main,
    opacity: isResizing ? 1 : 0,
  },
});
