function checkPaymentMethodTable(pool) {
  const promisePool = pool.promise();
  console.log('PAYMENT_METHOD Table Checking...');

  return promisePool
    .execute(
      `CREATE TABLE IF NOT EXISTS PAYMENT_METHOD (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(30)
    )`
    )
    .then(() => console.log('PAYMENT_METHOD Table is Ready'))
    .catch((e) => console.log(e));
}

export default checkPaymentMethodTable;
