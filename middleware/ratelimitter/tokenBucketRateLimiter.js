// Token Bucket Rate Limiter

const Redis = require("redis");

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error); // Connect Redis

const tokenBucketRateLimiter = async (req, res, next) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const key = `token-bucket:${ipAddress}`;

    const CAPACITY = 5; // Max tokens
    const REFILL_RATE = 1; // Tokens added per second
    const REFILL_INTERVAL = 1000; // Refilling interval in ms
  
    const now = Date.now();
    const lastRefill = await redisClient.hGet(key, "lastRefill") || now;

    const tokensLeft = parseInt((await redisClient.hGet(key, "tokens")) || CAPACITY);

    // Calculate new tokens based on time passed
    const timePassed = (now - lastRefill) / REFILL_INTERVAL;
    const newTokens = Math.min(CAPACITY, tokensLeft + Math.floor(timePassed)*REFILL_RATE);

    
    // Update Redis with new tokens and last refill time
    await redisClient.hSet(key, "tokens", newTokens);
    await redisClient.hSet(key, "lastRefill", now);
  
    if (newTokens <= 0) {
      return res.status(429).json({
        message: `Rate limit exceeded. No tokens left.`,
      });
    }
  
    // Consume a token
    await redisClient.hIncrBy(key, "tokens", -1);
    next();
  };
  


  module.exports = tokenBucketRateLimiter;