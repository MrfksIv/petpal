import * as fp from 'fastify-plugin';
import { nextCallback } from 'fastify-plugin';


export default fp( async (server, opts, next: nextCallback): Promise<void> => {
    server.route({
        url: '/users',
        logLevel: 'warn',
        method: ['GET', 'HEAD'],
        handler: async (req, res) => {
           return res.send({ date: new Date(), works: true});
        }
    });
    next();
});
