import pool from '../loader.js';

const promisePool = pool.promise();

async function readPaymentMethod() {
  try {
    const res = await promisePool.execute(`SELECT * FROM PAYMENT_METHOD`);

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

async function insertPaymentMethod(value) {
  try {
    await promisePool.execute(
      `INSERT INTO PAYMENT_METHOD (name)
      VALUES ("${value}")`
    );
    const res = await promisePool.execute(`SELECT LAST_INSERT_ID()`);

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

async function deletePaymentMethodById(id) {
  try {
    const res = await promisePool.execute(`
      DELETE FROM PAYMENT_METHOD
      WHERE id = ${id}
    `);

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

export default {
  readPaymentMethod,
  insertPaymentMethod,
  deletePaymentMethodById,
};
