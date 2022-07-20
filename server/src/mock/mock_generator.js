function createHistories() {
  const result = [];
  const categories = [
    '생활',
    '의료/건강',
    '쇼핑/뷰티',
    '교통',
    '식비',
    '문화/여가',
    '미분류',
  ];

  for (let i = 0; i < 15; i++) {
    result.push({
      id: i,
      day: Math.floor(Math.random() * 30 + 1),
      content: `history${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      isIncome: Boolean(Math.round(Math.random())),
      price: Math.floor(Math.random() * 300000),
      paymentMethod: '현금',
    });
  }

  return result;
}

export function createBulkHistory(year, month) {
  const result = {
    year,
    month,
    history: createHistories(),
  };

  return result;
}

export function createRecentHistory(startTime) {
  const [year, month] = startTime.split('-').map(Number);
  const result = {};
  result[year] = {};

  if (month + 6 > 12) {
    result[year + 1] = {};
  }

  for (let i = 0; i < 7; i++) {
    if (month + i > 12) {
      result[year + 1][month + i - 12] = createHistories();
    } else {
      result[year][month + i] = createHistories();
    }
  }

  return result;
}

export function createPaymentMethods() {
  const methods = { 1: '비씨카드', 2: '현대카드', 3: '현금', 4: '우리카드' };

  return methods;
}
