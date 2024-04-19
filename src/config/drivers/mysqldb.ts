import mysql, { Connection, ConnectionOptions } from 'mysql2';
import IMysqlDriver from './Interfaces/IMysqlDriver';

class MysqlDB implements IMysqlDriver{
    private connection: Connection | null = null;

    connect(): void {
        const DB_HOST:string = process.env.DB_HOST || 'localhost'
        const DB_USER:string = process.env.DB_USER || ''
        const DB_PASSWORD:string = process.env.DB_PASSWORD || ''
        const DB_DATABASE:string = process.env.DB_DATABASE || ''

        const config: ConnectionOptions  = {
            host: DB_HOST,
            database: DB_DATABASE,
            user: DB_USER,
            password: DB_PASSWORD,
            port: 3306
        }

        this.connection = mysql.createConnection(config);
        this.connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a MySQL:', err);
                return;
            }
            console.log('Conexión exitosa a MySQL');
        });
    }

    close(): void {
        if (this.connection) {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error al cerrar la conexión a MySQL:', err);
                    return;
                }
                console.log('Conexión cerrada a MySQL');
            });
        }
    }
    
    query(sql: string, values?: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject(new Error('La conexión a MySQL no está establecida'));
                return;
            }

            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default MysqlDB;
