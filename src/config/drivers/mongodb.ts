import { MongoClient, MongoClientOptions, ServerApiVersion, Db, Collection } from "mongodb";
import IMongoDriver from "./Interfaces/IMongoDriver";

class MongoDB implements IMongoDriver {
    private client: MongoClient | null = null;
    private dbInstance: Db | null = null;

    async connect(): Promise<void> {
        // mongodb://localhost:27017/your-database
        const DB_HOST:string = process.env.DB_HOST || ''
        const DB_USER:string = process.env.DB_USER || ''
        const DB_PASSWORD:string = process.env.DB_PASSWORD || ''
        const DB_DATABASE:string = process.env.DB_DATABASE || ''
        const DB_MONGO_CLUSTER:string = process.env.DB_MONGO_CLUSTER || ''
        const DB_PARAMETERS:string = process.env.DB_PARAMETERS || ''

        const url: string = `${DB_HOST}://${DB_USER}:${DB_PASSWORD}@${DB_MONGO_CLUSTER}/?${DB_PARAMETERS}`;

        const options: MongoClientOptions = {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        };

        try {
            this.client = await MongoClient.connect(url, options);
            this.dbInstance = this.client.db(DB_DATABASE);
            console.log('Conexión exitosa a MongoDB');
        } catch (error) {
            console.error('Error al conectar a MongoDB:', error);
            throw error;
        }
    }   

    async close(): Promise<void> {
        if (this.client) {
            await this.client.close();
        }
    }

    db(): Db | null {
        return this.dbInstance
    }

    collection(name: string): Collection<any> | null {
        if (this.dbInstance) {
            return this.dbInstance.collection(name);
        }
        return null;
    }
}

export default MongoDB;
