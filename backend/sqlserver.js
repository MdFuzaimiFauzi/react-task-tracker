import 'dotenv/config';
import sql from 'mssql';

const config = {
  user: 'tasktracker_user',
  password: process.env.SQLSERVER_PASSWORD,
  server: 'RND-FUZAIMI',
  port: 1433,
  database: 'task_tracker_sqlserver',
  options: {
    trustServerCertificate: true,
  },
};

console.log('SQL Server host:', config.server);
console.log('SQL Server database:', config.database);

export const sqlPool = new sql.ConnectionPool(config);

export const connectSqlServer = async () => {
  try {
    await sqlPool.connect();
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('SQL Server connection failed:', error);
  }
};