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

export async function readHistoryByYearMonth(month, year) {
  try {
    const res = await promisePool.execute(
      `SELECT h.id, h.date, h.content, h.paymentMethod, h.price, c.name as category, c.isIncome FROM HISTORY AS h
         LEFT JOIN CATEGORY AS c ON h.categoryId = c.id
         WHERE MONTH(date) = ${month} AND YEAR(date) = ${year}
         ORDER BY date DESC
       `
    );

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

export async function deleteHistoryById(id) {
  try {
    const res = await promisePool.execute(
      `
      DELETE FROM HISTORY WHERE id = ${id}
      `
    );

    return res[0];
  } catch (e) {
    console.error(e);
  }
}
