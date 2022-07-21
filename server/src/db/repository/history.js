function checkHistoryTable(pool) {
  const promisePool = pool.promise();
  console.log('HISTORY Table Checking...');

  return promisePool
    .execute(
      `CREATE TABLE IF NOT EXISTS HISTORY (
      id INT PRIMARY KEY AUTO_INCREMENT,
      date DATE NOT NULL,
      categoryId INT,
      content VARCHAR(30) NOT NULL,
      paymentMethod VARCHAR(30) NOT NULL,
      price INT NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES CATEGORY(id)
    )`
    )
    .then(() => console.log('HISTORY Table is Ready'))
    .catch((e) => console.log(e));
}

export default checkHistoryTable;
