import pool from '../loader.js';

const promisePool = pool.promise();

export async function readPaymentMethod() {
  try {
    const res = await promisePool.execute(`SELECT * FROM PAYMENT_METHOD`);

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

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
