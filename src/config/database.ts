import MongoDB from './drivers/mongodb';
import MysqlDB from './drivers/mysqldb';
import SQLServer from './drivers/sqlserverdb';

const driverType: string = process.env.DB_DRIVER || 'mysql';

const drivers: Record<string, any> = {
    mongodb: new MongoDB(),
    mysql: new MysqlDB(),
    sqlserver: new SQLServer(),
};

const selectedDriver: any = drivers[driverType.toLowerCase()];

if(!selectedDriver)  throw new Error(`${driverType} driver not found`);

selectedDriver.connect();

export default selectedDriver;
