import { Connection, ConnectionConfiguration, Request, TYPES } from "tedious";
import ISQLServer from "./Interfaces/ISQLServer";

class SQLServer implements ISQLServer {
    private connection: Connection | null = null;

    connect(): void {
        const DB_HOST: string = process.env.DB_HOST || '';
        const DB_USER: string = process.env.DB_USER || '';
        const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
        const DB_DATABASE: string = process.env.DB_DATABASE || '';

        const config: ConnectionConfiguration = {
            server: DB_HOST,
            authentication: {
                type: 'default',
                options: {
                    userName: DB_USER,
                    password: DB_PASSWORD
                }
            },
            options: {
                encrypt: true,
                database: DB_DATABASE,
                trustServerCertificate: true
            }
        };

        this.connection = new Connection(config);
        this.connection.connect((err) => {
            if (err) {
                console.error('Error al conectar a SQL Server:', err);
                return;
            }
            console.log('Conexión exitosa a SQL Server');
        });
    }

    close(): void {
        if (this.connection) {
            this.connection.close();
            console.log('Conexión cerrada a SQL Server');
        }
    }

    query(sql: string, values?: any[] | undefined): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.connection) {
                reject(new Error('La conexión a SQL Server no está establecida'));
                return;
            }

            const request = new Request(sql, (err, rowCount, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });

            if (values) {
                values.forEach((value, index) => {
                    request.addParameter(`param${index + 1}`, TYPES.NVarChar, value);
                });
            }

            this.connection?.execSql(request);
        });
    }
}

export default SQLServer;
