import mysql, {Pool, PoolOptions, ResultSetHeader, RowDataPacket} from 'mysql2/promise';
import {DatabaseException} from "../errors/baseException";

export type ConnectionConfig = PoolOptions;

class Connection {
    private connection: Pool;
    private static instance: Connection;
    private readonly _defaultConfig: ConnectionConfig = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
        connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT!),
        dateStrings: true
    };

    private constructor(config?: ConnectionConfig) {
        if (config) this.connection = mysql.createPool(config);
        else this.connection = mysql.createPool(this.defaultConfig);
    }

    private get defaultConfig(): ConnectionConfig {
        return this._defaultConfig;
    }

    public static getInstance(config?: ConnectionConfig): Connection {
        if (!Connection.instance) {
            config ? Connection.instance = new Connection(config) : Connection.instance = new Connection();
        }
        return Connection.instance;
    }

    async query(sql: string, values?: any[]) {
        const conn = await this.connection.getConnection();
        let results: RowDataPacket[] = [];

        try {
            results = await (values ? conn.query(sql, values) : conn.query(sql)) as RowDataPacket[];
        } catch (err: any) {
            throw new DatabaseException(`DB connection error: ${err}`, err.code);
        } finally {
            conn.release();
        }
        return results;
    }

    async queryReturnHeader(sql: string, values?: any[]) {
        const conn = await this.connection.getConnection();
        let results: ResultSetHeader;

        try {
            [results] = await (values ? conn.query<ResultSetHeader>(sql, values) : conn.query<ResultSetHeader>(sql));
        } catch (err: any) {
            throw new DatabaseException(`DB connection error: ${err}`, err.code);
        } finally {
            conn.release();
        }
        return results;
    }
}

export const defaultConnection = Connection.getInstance();

export default Connection;