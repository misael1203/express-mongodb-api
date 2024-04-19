import { Connection } from "mysql2";
import IDatabase from "./IDatabase";

interface IMysqlDriver extends IDatabase
{
    // 
}

export default IMysqlDriver;