import * as Redis from 'redis';
import {RedisClient, RetryStrategy} from 'redis';

export class RedisHelper {

    private static redisClient: RedisClient | null = null;

    private static getRedisClientInt(): RedisClient {
        if (RedisHelper.redisClient == null) {
            RedisHelper.redisClient = this.createRedisClient();
        }

        return RedisHelper.redisClient;
    }

    public static getClient(): RedisClient {
        return this.getRedisClientInt();
    }

    public static createRedisClient(): RedisClient {
        let port: number;
        let host: string;

        try {
            port = Number(process.env.REDIS_PORT);
            if (Number.isNaN(port)) {
                throw new Error('REDIS_PORT must be defined in the .env file');
            }
            host = process.env.REDIS_HOST || 'localhost';
        } catch (err) {
            throw err;
        }

        const redisClientInt = Redis.createClient({

            port: port,
            host: host,
            retry_strategy: ((options) => {
                // tslint:disable-next-line no-any
                if (options.error && (options.error as any).code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with
                    // a individual error
                    throw new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    // with a individual error
                    throw new Error('Retry time exhausted');
                }
                if (options.attempt > 10) {
                    // End reconnecting with built in error
                    throw new Error('Could not connect to redis after 10 retries.');
                }

                // reconnect after
                return Math.min(options.attempt * 100, 3000);
            }) as RetryStrategy
        });

        redisClientInt.on('error', (err) => {
            throw err;
        });

        return redisClientInt;
    }
}
