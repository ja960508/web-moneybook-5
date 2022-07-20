export function createBulkHistory(year, month) {
  const result = {
    year,
    month,
    history: [],
  };

  for (let i = 0; i < 15; i++) {
    result.history.push({
      id: i,
      day: Math.floor(Math.random() * 30 + 1),
      content: `history${i}`,
      category: '카테고리',
      isIncome: Boolean(Math.round(Math.random())),
      price: Math.floor(Math.random() * 300000 + 1000),
      paymentMethod: '현금',
    });
  }

  return result;
}
