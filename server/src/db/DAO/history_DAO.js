import {
  addQuotesToString,
  timeConverter,
} from '../../utils/data_transformer.js';
import pool from '../loader.js';

const promisePool = pool.promise();

async function insertHistory(history) {
  try {
    const res = await promisePool.execute(
      `INSERT INTO HISTORY (${Object.keys(history).join()})
      VALUES (${Object.values(history).map(addQuotesToString).join()})`
    );

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

async function readHistoryByYearMonth(month, year) {
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

async function deleteHistoryById(id) {
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

async function updateHistoryById(history) {
  const options = Object.entries(history)
    .map(([key, value]) => `${key} = ${addQuotesToString(value)}`)
    .join();

  try {
    const res = await promisePool.execute(`
    UPDATE HISTORY
    SET ${options}
    WHERE id = ${history.id}`);

    console.log(res);
  } catch (e) {
    console.error(e);
  }
}

async function getRecentHistory(year, month, categoryId) {
  const RECENT_MONTH = 6;
  const date = timeConverter(new Date(year, month - 1));

  try {
    const res = await promisePool.execute(
      `SELECT h.id, h.date, h.content, h.paymentMethod, h.price, c.name as category, c.isIncome FROM HISTORY AS h
      LEFT JOIN CATEGORY AS c ON h.categoryId = c.id
      WHERE h.categoryId = ${categoryId} AND date > DATE_SUB("${date}", INTERVAL ${RECENT_MONTH} MONTH)
      ORDER BY date DESC
      `
    );

    return res[0];
  } catch (e) {
    console.error(e);
  }
}

export default {
  insertHistory,
  readHistoryByYearMonth,
  deleteHistoryById,
  updateHistoryById,
  getRecentHistory,
};
