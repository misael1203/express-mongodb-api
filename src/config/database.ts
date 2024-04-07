import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const uri:string = process.env.DB_URI || '';

const options:MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}

const client = new MongoClient(uri, options)

export default client;