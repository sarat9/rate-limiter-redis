// Fixed-window rate limiting
const Redis = require("redis");

const redisClient = Redis.createClient();
redisClient.connect().catch(console.error); // Connect Redis


// Rate limiter middleware
const rateLimiter = async (req, res, next) => {
    const ipAddress = req.headers['x-forwared-for'] || req.connection.remoteAddress || req.ip;
  
  //   const key = `rate-limit:${ipAddress}:${req.path}`; // if ratelimit for each API
    const key = `rate-limit:${ipAddress}`; // if single ratelimit for all API
  
  
    const LIMIT = 5; // Max requests allowed
    const windowSeconds = 20; // Time window in seconds
    let ttl; // Time to Live
    
    // Increment the count in Redis
    const requestsCalled = await redisClient.incr(key);
  
    if (requestsCalled === 1) {
      // Set expiration for the key
      await redisClient.expire(key, windowSeconds);
      ttl = windowSeconds;
    }else{
      ttl = await redisClient.ttl(key);
    }
  
    if (requestsCalled > LIMIT) {
      return res.status(429).json({
        message: `Rate limit exceeded. Try again later.. Requested calls:${requestsCalled} TTL:${ttl}`,
      });
    }
  
    next();
  };


module.exports = rateLimiter;