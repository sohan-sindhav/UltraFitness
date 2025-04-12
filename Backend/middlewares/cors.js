export const corsMiddleware = (req, res, next) => {
  // List of allowed origins
  const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"]; // Add more origins as needed
  const origin = req.headers.origin;

  // Check if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // Allow the specific origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies to be sent
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    ); // Allowed HTTP methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // Allowed headers
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Default for all others
  }

  // Handle preflight requests (necessary for sending cookies)
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Send response for preflight request
  }

  next(); // Proceed to the next middleware or route handler
};
