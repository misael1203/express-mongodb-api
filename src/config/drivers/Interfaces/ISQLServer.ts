import IDatabase from "./IDatabase";

interface ISQLServer extends IDatabase
{
    query(sql: string, values?: any[]): Promise<any>;
}

export default ISQLServer;