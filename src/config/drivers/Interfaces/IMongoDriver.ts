
import { Db } from "mongodb";
import IDatabase from "./IDatabase";

interface IMongoDriver extends IDatabase{
    db(): Db | null;
}

export default IMongoDriver;