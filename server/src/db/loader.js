import mysql from 'mysql2';
import checkCategoryTable from './repository/category.js';
import checkHistoryTable from './repository/history.js';
import checkPaymentMethodTable from './repository/payment_method.js';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

(async function init() {
  await checkCategoryTable(pool);
  await checkHistoryTable(pool);
  await checkPaymentMethodTable(pool);
})();

export default pool;
