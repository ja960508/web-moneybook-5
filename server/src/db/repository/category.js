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
    .then(() => console.log('CATEGORY Table is Ready'))
    .catch((e) => console.log(e));
}

export default checkCategoryTable;
