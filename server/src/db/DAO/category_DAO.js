import pool from '../loader.js';

const promisePool = pool.promise();

async function readAllCategory() {
  try {
    const [rows] = await promisePool.execute(`
    SELECT * FROM CATEGORY;
  `);

    return rows;
  } catch (e) {
    console.error(e);
  }
}

export default {
  readAllCategory,
};
