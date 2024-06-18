import { connectDB } from "./connectDB.js";

let pool;
(async () => {
  pool = await connectDB();
})();

export async function queryDB(query, params) {
  try {
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
