import {FastifyInstance} from "fastify";


export default async (server: FastifyInstance): Promise<void> => {
    server.route({
        url: '/users',
        logLevel: 'warn',
        method: ['GET', 'HEAD'],
        handler: async (req, res) => {
            return res.send({ date: new Date(), works: true});
        }
    });

    server.get('/users/:userId', {}, async (req, res) => {
        try {
            const _id = req.params.userId;
            console.log('id:', _id);

            const user = await server.db.models.User.findOne({
                _id
            });

            if (!user) {
                return res.send(404);
            }

            return res.code(200).send(user);
        } catch (error) {
            req.log.error(error);
            return res.send(400);
        }
    });
}


// export default fp( async (server, opts, next: nextCallback): Promise<void> => {
//     server.route({
//         url: '/users',
//         logLevel: 'warn',
//         method: ['GET', 'HEAD'],
//         handler: async (req, res) => {
//            return res.send({ date: new Date(), works: true});
//         }
//     });
//
//     server.get('/users/:userId', {}, async (req, res) => {
//         try {
//             const _id = req.params.userId;
//             console.log('id:', _id);
//
//             const user = await server.db.models.User.findOne({
//                 _id
//             });
//
//             if (!user) {
//                 return res.send(404);
//             }
//
//             return res.code(200).send(user);
//         } catch (error) {
//             req.log.error(error);
//             return res.send(400);
//         }
//     });
//
//     next();
// });
