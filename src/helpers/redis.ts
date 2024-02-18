const upstastRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Cammands = "zrange" | "sismember" | "get" | "smembers";

export const fetchRedis = async (
  cammands: Cammands,
  ...args: (string | number)[]
) => {
  const commandUrl = `${upstastRedisUrl}/${cammands}/${args.join("/")}`;
  const restResponse = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!restResponse.ok) {
    throw new Error(
      `ERROR executing Redis command : ${restResponse.statusText}`
    );
  }

  const data = await restResponse.json();

  return data.result;
};
