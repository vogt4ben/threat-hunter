// Helper function to get color based on weight
export const getWeightColor = weight => {
  if (weight >= 9) return 'error';
  if (weight >= 5) return 'warning';
  if (weight >= 1) return 'info';
  if (weight < 0) return 'error'; // For negative weights
  return 'default';
};

// Helper function to get color based on HTTP method
export const getMethodColor = method => {
  const colors = {
    GET: 'info',
    POST: 'success',
    PUT: 'warning',
    DELETE: 'error',
  };
  return colors[method] || 'default';
};
