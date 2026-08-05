import express from 'express';
import cors from 'cors';
import { connectSqlServer, sqlPool } from './sqlserver.js';
import pool from './database.js';

import 'dotenv/config';
import oracledb from 'oracledb';
import oracleConfig from './oracle.js';
import { getOracleTasks } from './oracleserver.js';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

//oracle test connection
const testOracleConnection = async () => {
    let connection;


    try {
        connection = await oracledb.getConnection(oracleConfig);

        const result = await connection.execute(
            'SELECT * FROM tasks'
        );

        console.log('Oracle connection successful:', result.rows);

    }   catch (error) {
        console.error('Oracle connection failed:', error);

    }   finally {
        if (connection) {
            await connection.close();
        }
    }
};

//Connect SQL Server
connectSqlServer();

testOracleConnection();

//postgreSQL API fetching
app.get('/api/tasks', async (req,res) => {
    try {
        const result = await pool.query (
            'SELECT * FROM tasks WHERE archived = FALSE ORDER BY id DESC'
        );

        res.json(result.rows);
    }   catch (error) {
        console.error('Failed to retrieve tasks: ', error);

        res.status(500).json({
            message: 'Failed to retrieve tasks',
        });
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json ({
                message: 'Task not found',
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to retrieve task: ', error);

        res.status(500).json({
            message: 'Failed to retrieve task',
        });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json ({
                message: 'Task not found',
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to delete task: ', error);

        res.status(500).json({
            message: 'Failed to delete task',
        });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { 
            title,
            description,
            category,
            priority,
            status,
            due_date
        } = req.body;

        const result = await pool.query(
            `INSERT INTO tasks (
            title,
            description,
            category,
            priority,
            status,
            due_date
        )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                title,
                description,
                category,
                priority,
                status,
                due_date,
            ]
        );
       res.status(201).json(result.rows[0]);
        
    }
    catch (error){
        console.error('Failed to create task: ', error);
    }
   
});            

app.put(`/api/tasks/:id`, async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            category,
            priority,
            status,
            due_date,
        } = req.body;

        const result = await pool.query(
           `UPDATE tasks
            SET title = $2,
                description = $3,
                category = $4,
                priority = $5,
                status = $6,
                due_date = $7
            WHERE id = $1
            RETURNING *`,
            [id, title, description, category, priority, status, due_date]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Task not found',
            })
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update task: ', error);

        res.status(500).json({
            message: 'Failed to update task',
        });
    }
});

app.patch(`/api/tasks/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const { status, archived } = req.body;

        console.log('PATCH body: ',req.body);
        console.log('PATCH id: ', id);

        const result = await pool.query(
            `UPDATE tasks
            SET status = COALESCE($2, status),
                archived = COALESCE($3, archived)
            WHERE id = $1
            RETURNING *`,
            [
                id, 
                status ?? null,
                archived ?? null]
        );

       if (result.rows.length === 0) {
  return res.status(404).json({
    message: 'Task not found',
  });
}

    res.json(result.rows[0]);
    } catch (error) {
        console.error('Failed to update task: ', error);

        res.status(500).json({
            message: 'Failed to update task',
        });
    }
})

//sql-server API fetching
app.get('/api/sqlserver/tasks', async (req, res) => {
    try {
        const result = await sqlPool
        .request()
        .query(`
            SELECT *
            FROM tasks
            WHERE archived = 0
            ORDER BY id DESC
        `);

        res.json(result.recordset);
        } catch (error) {
            console.error('Failed to retrieve tasks: ', error);
        
        res.status(500).json({
            message: 'Failed to retrieve tasks',
        });
        
    }
});


//oracle API fetching
app.get('/api/oracle/tasks', async (req, res) => {
    try {
        const tasks =await getOracleTasks();

        res.json(tasks);
    } catch (error) {
        console.error('Failed to retrieve Oracle tasks:', error);

        res.status(500).json({
            message: 'Failed to retrieve Oracle tasks',
        });
    }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});