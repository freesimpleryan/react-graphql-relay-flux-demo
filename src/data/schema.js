import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {
    connectionDefinitions,
    connectionArgs,
    connectionFromPromisedArray
} from "graphql-relay";

let schema = (db) => {

    let store = {};

    let storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            linkConnection: {
                type: linkConnection.connectionType,
                args: connectionArgs, // first, last, etc.
                resolve: (_, args) => connectionFromPromisedArray(
                    db.collection("links").find({}).toArray(),
                    args
                )
            }
        })
    });


    let linkType = new GraphQLObjectType({
        name: 'Link',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
                resolve: (obj) => obj._id
            },
            title: {type: GraphQLString},
            url: {type: GraphQLString}
        })
    });

    let linkConnection = connectionDefinitions({
        name: 'Link',
        nodeType: linkType
    });

    let _schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "Query",
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            })
        }),

    });

    return _schema;
};

export default schema;