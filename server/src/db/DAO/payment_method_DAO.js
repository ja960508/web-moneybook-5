import pool from '../loader.js';

const promisePool = pool.promise();

async function readPaymentMethod() {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM PAYMENT_METHOD`);

    return rows;
  } catch (e) {
    console.error(e);
  }
}

async function insertPaymentMethod(value) {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO PAYMENT_METHOD (name)
      VALUES ("${value}")`
    );

    return rows;
  } catch (e) {
    console.error(e);
  }
}

async function deletePaymentMethodById(id) {
  try {
    const [rows] = await promisePool.execute(`
      DELETE FROM PAYMENT_METHOD
      WHERE id = ${id}
    `);

    return rows;
  } catch (e) {
    console.error(e);
  }
}

export default {
  readPaymentMethod,
  insertPaymentMethod,
  deletePaymentMethodById,
};
