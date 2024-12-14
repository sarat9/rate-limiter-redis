const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "public")));

const rateLimiter = require('./middleware/ratelimitter/ratelimitter')
// const rateLimiter = require('./middleware/ratelimitter/fixedWindowRateLimiter')
// const rateLimiter = require('./middleware/ratelimitter/slidingWindowRateLimiter')
// const rateLimiter = require('./middleware/ratelimitter/tokenBucketRateLimiter')


// API Endpoints
app.get("/api/button1", rateLimiter, (req, res) => {
  res.json({ message: "API 1 called successfully!" });
});

app.get("/api/button2", rateLimiter, (req, res) => {
  res.json({ message: "API 2 called successfully!" });
});

app.get("/api/button3", rateLimiter, (req, res) => {
  res.json({ message: "API 3 called successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
