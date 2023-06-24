import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

const checkTableQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'users'
  )
`;

const deleteTableQuery = `
  DROP TABLE IF EXISTS users
`;

const createTableQuery = `
  CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`;

async function deleteAndCreateUsersTable() {
  try {
    const client = await pool.connect();

    const { rows } = await client.query(checkTableQuery);
    const tableExists = rows[0].exists;

    if (tableExists) {
      await client.query(deleteTableQuery);
      console.log("Users table deleted successfully!");
    }

    await client.query(createTableQuery);
    console.log("Users table created successfully!");

    client.release();
  } catch (error) {
    console.error("Error deleting and creating users table:", error);
  } finally {
    pool.end();
  }
}

(async () => {
  await deleteAndCreateUsersTable();
  process.exit();
})();
