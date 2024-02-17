const upstastRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Cammands = "zrange" | "sismember" | "get" | "smembers";

export const fetchRedis = async (
  cammands: Cammands,
  ...argd: (string | number)[]
) => {};
