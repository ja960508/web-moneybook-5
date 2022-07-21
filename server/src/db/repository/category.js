import category from '../../constant/category.js';

function checkCategoryTable(pool) {
  const promisePool = pool.promise();
  console.log('CATEGORY Table Checking...');

  return promisePool
    .execute(
      `CREATE TABLE IF NOT EXISTS CATEGORY (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(30) NOT NULL,
      isIncome BOOLEAN NOT NULL
    )`
    )
    .then(() =>
      promisePool.execute(
        `INSERT IGNORE INTO CATEGORY (id, name, isIncome) VALUES ${category
          .map((c, i) => `(${i + 1}, "${c.name}", ${c.isIncome})`)
          .join()}`
      )
    )
    .then(() => console.log('CATEGORY Table is Ready'))
    .catch((e) => console.log(e));
}

export default checkCategoryTable;
