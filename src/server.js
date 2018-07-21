import express from 'express';
import {MongoClient} from 'mongodb';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import fs from 'file-system';

let app = express();
app.use(express.static('public'));


const MONGO_PORT = "32768";
const dbName = "test";
const MONGO_URL = 'mongodb://localhost:' + MONGO_PORT;

(async () => {
    try {
        let db;
        let database = await MongoClient.connect(MONGO_URL);
        db = database.db(dbName);

        let Schema = schema(db);

        app.use('/graphql', GraphQLHTTP({
            schema: Schema,
            graphiql: true
        }));

        app.listen(3000, () => console.log("Listening on port 3000"));

        // Generate schema.json
        let json = await graphql(Schema, introspectionQuery);
        fs.writeFile('./src/data/schema.json', JSON.stringify(json, null, 2), err => {
            if (err) throw err;

            console.log("JSON schema created");
        })
    }
    catch(e){
        console.log(e);
    }

})();

