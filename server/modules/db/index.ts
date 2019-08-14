import { Model } from 'mongoose';
import * as Mongoose from 'mongoose';
import * as fp from 'fastify-plugin';
import { UserModel, User } from './models/user';
import { FastifyInstance } from 'fastify';

export interface Models {
    User: Model<UserModel>;
}

export interface Db {
    models: Models;
}

export default fp( async (fastify: FastifyInstance, opts: {uri: string}, next): Promise<void> => {
    Mongoose.connection.on('connected', () => {
        fastify.log.info({actor: 'MongoDB'}, 'connected');
    });

    Mongoose.connection.on('disconnected', () => {
        fastify.log.info({actor: 'MongoDB'}, 'disconnected');
    });

    await Mongoose.connect(
        opts.uri,
        {
            useNewUrlParser: true,
            keepAlive: true
        }
    );

    const models: Models = {
        User: User
    };

    fastify.decorate('db', {models});
    next();
});
