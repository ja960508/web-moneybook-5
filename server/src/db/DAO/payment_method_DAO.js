import pool from '../loader.js';

const promisePool = pool.promise();

export async function insertPaymentMethod(value) {
  try {
    const res = await promisePool.execute(
      `INSERT INTO PAYMENT_METHOD (name)
      VALUES ("${value}")`
    );

    return res[0];
  } catch (e) {
    console.error(e);
  }
}
