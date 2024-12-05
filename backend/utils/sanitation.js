// utils/sanitization.js
function sanitizeString(input) {
  return input.trim().replace(/[<>;]/g, ''); // Remove potentially harmful characters
}

function sanitizeEmail(input) {
  // Basic sanitation for email (you can add further checks for a valid email format)
  return input.trim().toLowerCase().replace(/[<>;]/g, ''); // Remove harmful characters and convert to lowercase
}

module.exports = { sanitizeString, sanitizeEmail };
