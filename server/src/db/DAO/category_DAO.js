import pool from '../loader.js';

const promisePool = pool.promise();

async function readAllCategory() {
  try {
    const res = await promisePool.execute(`
    SELECT * FROM CATEGORY;
  `);

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

export default {
  readAllCategory,
};
