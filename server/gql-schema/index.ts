import * as graphql from 'graphql';
import {PetController, UserController} from '../modules/controllers';
import {UserModel} from "../modules/db/models/user";

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLID },
        fname: { type: GraphQLString },
        lname: { type: GraphQLString },
        pets: { type: new GraphQLList(GraphQLID) },
    })
});

const petType = new GraphQLObjectType( {
    name: 'Pet',
    fields: () => ({
        _id: { type: GraphQLID },
        petName: { type: GraphQLString },
        animal: { type: GraphQLString },
        age: {type: GraphQLInt},
        owner: { type: GraphQLID },

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: {id: {type: GraphQLID} },
            resolve:  async (parent, args) => {
                return await UserController.getUserById(args.id);
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve: async (parent, args) => {
                return await UserController.getUsers();
            }
        },
        pet: {
            type: petType,
            args: {id: {type: GraphQLID} },
            resolve: async (parent, args) => {
                return await PetController.getPetById(args.id);
            }
        },
        pets: {
            type: new GraphQLList(petType),
            resolve: async (parent, args) => {
                return await PetController.getPets();
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addUser: {
            type: userType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                fname: { type: new GraphQLNonNull(GraphQLString) },
                lname: { type: new GraphQLNonNull(GraphQLString) },
                pets: { type: new GraphQLList(GraphQLID) },
            },
            async resolve(parent, args) {
                return await UserController.addUser(<UserModel>args);
            }
        },
        editUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                fname: { type: new GraphQLNonNull(GraphQLString) },
                lname: { type: new GraphQLNonNull(GraphQLString) },
                pets: { type: new GraphQLList(GraphQLID) },
            },
            async resolve(parent, args) {
                return await UserController.updateUser(<UserModel>args);
            }
        },
        deleteUser: {
            type: userType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                return await UserController.deleteUser(args.id);
            }
        },
        addPet: {
            type: petType,
            args: {},
            async resolve(parent, args) {
                return '';
            }
        },
        editPet: {
            type: petType,
            args: {},
            async resolve(parent, args) {
                return '';
            }
        },
        deletePet: {
            type: petType,
            args: {},
            async resolve(parent, args) {
                return '';
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});


