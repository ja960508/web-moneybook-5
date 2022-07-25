import pool from '../loader.js';

const promisePool = pool.promise();

async function getLastId(tableName) {
  try {
    const res = await promisePool.execute(`SELECT max(id) FROM ${tableName}`);

    return res[0][0]['max(id)'];
  } catch (e) {
    console.error(e);
  }
}

export default {
  getLastId,
};
