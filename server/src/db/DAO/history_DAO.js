import pool from '../loader.js';
const promisePool = pool.promise();

export async function insertHistory(history) {
  try {
    await promisePool.execute(
      `INSERT INTO HISTORY (${Object.keys(history).join()})
      VALUES (${Object.values(history)
        .map((value) => (typeof value === 'string' ? `"${value}"` : value))
        .join()})`
    );
  } catch (e) {
    console.error(e);
  }
}
