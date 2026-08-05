import oracledb from 'oracledb';
import oracleConfig from './oracle.js';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export const getOracleTasks = async () => {
    let connection;

    try {
        connection = await oracledb.getConnection(oracleConfig);

        const result = await connection.execute(`
            SELECT
                id AS "id",
                title AS "title",
                description AS "description",
                category AS "category",
                priority AS "priority",
                status AS "status",
                due_date AS "due_date",
                created_at AS "created_at",
                archived AS "archived"
            FROM tasks
            WHERE archived = 0
            ORDER BY id DESC
        `);

        return result.rows;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};
