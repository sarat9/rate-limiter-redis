// Sliding Window Rate Limiter

const Redis = require("redis");

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error); // Connect Redis


const slidingWindowRateLimiter = async (req, res, next) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const key = `rate-limit:${ipAddress}`;
  
    const LIMIT = 5; // Max requests allowed
    const WINDOW_MS = 20; // 20 seconds
  
    const now = Date.now(); // Current timestamp
    const startWindow = now - WINDOW_MS;
  
    // Remove expired requests from the window
    await redisClient.zRemRangeByScore(key, 0, startWindow);
  
    // Count the remaining requests within the window
    const requestCount = await redisClient.zCard(key);
  
    if (requestCount >= LIMIT) {
      return res.status(429).json({
        message: `Rate limit exceeded. ${requestCount} requests within sliding window of ${WINDOW_MS}s`,
      });
    }
  
    // Add current request timestamp to the window
    await redisClient.zAdd(key, [{ score: now, value: now.toString() }]);
    await redisClient.expire(key, WINDOW_MS);
  
    next();
  };
  

  module.exports = slidingWindowRateLimiter;