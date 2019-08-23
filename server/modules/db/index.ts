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
        console.log('connected to mongoDB...')
    });

    Mongoose.connection.on('disconnected', () => {
        fastify.log.info({actor: 'MongoDB'}, 'disconnected');
        console.log('disconnected from mongoDB...')
    });

    await Mongoose.connect(
        process.env.MONGODB_URI as string,
        {
            useNewUrlParser: true,
            keepAlive: true,
            useFindAndModify: false
        }
    );

    const models: Models = {
        User: User
    };

    fastify.decorate('db', {models});
    next();
});
