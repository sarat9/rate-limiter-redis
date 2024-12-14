# Rate Limitting with Redis


Rate limiting is an essential strategy for mitigating various online threats such as DDoS attacks, brute-force login attempts, and data scraping. By controlling the frequency of incoming requests, rate limiting helps maintain service availability and ensures fair resource distribution.

Additionally, rate limiting can be applied to manage membership-based access. For example:

Document Management: Allowing users to create up to 10 documents per hour.
API Queries: Restricting free-tier users to 5 API queries per day.
Resource Access: Enforcing usage limits on premium features or content access.
This approach ensures that applications remain protected while offering a controlled, scalable user experience.

**This repo is a demo of using ratelimiting by following algorithms**
![image](https://github.com/user-attachments/assets/d075f62f-b45b-48f1-8971-1c051f339365)



## Algorithms used for rate limiting

Rate-limiting algorithms are essential tools that enable organizations to control and limit the rate of incoming requests to their applications and systems. Different algorithms can be used depending on the specific needs of the application or system.

- Fixed-window rate limiting: 
This is a straightforward algorithm that counts the number of requests received within a fixed time window, such as one minute. Once the maximum number of requests is reached, additional requests are rejected until the next window begins. This algorithm is easy to implement and effective against DDoS attacks but may limit legitimate users.

- Sliding-window rate limiting: 
This algorithm tracks the number of requests received in the recent past using a sliding window that moves over time. This algorithm is more flexible than fixed-window rate limiting and can adjust to spikes in traffic, making it a better choice for applications with varying usage patterns. However, it may not be as effective against sustained attacks.

- Token bucket rate limiting: 
This maintains a token bucket that is refilled at a fixed rate. Each request consumes a token, and additional requests are denied once the bucket is empty. Token bucket rate limiting is suitable for handling bursts of traffic, as it can allow a certain number of requests to be processed simultaneously. However, it may not be as effective against sustained traffic.

- Leaky bucket rate limiting: 
Similar to token bucket rate limiting but puts requests into a “bucket” that gradually empties over time, allowing more requests to be processed. This algorithm is effective against bursts of traffic and helps to prevent overload, but it may not be as effective against sustained attacks.

Choosing the right rate-limiting algorithm depends on several factors, including the application’s traffic patterns and the desired level of protection against malicious activity. Organizations must strike a balance between protecting their systems and providing a good user experience. Regularly reviewing and updating rate-limiting policies is also essential to ensure that they remain effective against new and emerging threats.



## Links
- https://redis.io/glossary/rate-limiting/
- https://systemsdesign.cloud/SystemDesign/RateLimiter


## Videos
- All
https://www.youtube.com/watch?v=mQCJJqUfn9Y&t=71s
- Sliding-window rate limiting
https://www.youtube.com/watch?v=Ph9odgg8wQ0

- Token bucket rate limiting
https://www.youtube.com/watch?v=9sZtDWHloac
