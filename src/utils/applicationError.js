const applicationError = ({ message, status, name }) => ({
  message, status, name,
  stack: (new Error()).stack
});

module.exports = applicationError;