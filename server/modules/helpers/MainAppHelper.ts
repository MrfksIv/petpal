import { Options } from 'fastify-session';

import {RedisHelper} from './RedisHelper';
import * as fastifySession from 'fastify-session';

const RedisStore = require('connect-redis')(fastifySession);


export class MainAppHelper {

    public static getSessionOptions(): Options {

        if (!process.env.SESSION_SECRET) {
            throw new Error('SESSION_SECRET is required in the .env file');
        }

        const redisStore = new RedisStore({
            // @ts-ignore
            client: RedisHelper.getClient(),
            ttl: 6000,
            prefix: 'web-session'
        });

        const opts = {
            secret: process.env.SESSION_SECRET,
            ttl: 6000,
            store: redisStore,
            cookie: {
                secure: false,
                httpOnly: true,
                domain: 'localhost',
                path: '/'

            }
        };

        return opts;
    }
}
