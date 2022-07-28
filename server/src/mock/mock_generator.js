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

const paymentMethod = [
  '국민카드',
  '현금',
  '비씨카드',
  '우리카드',
  '하나카드',
  '카카오페이',
  '배민페이',
];

const contents = [
  '정순함박',
  '엄마밥상',
  '서브웨이',
  '버거킹',
  '북촌손만두',
  '치마오',
  '우테캠 월급',
  '맥도날드',
  '모스버거',
  '잠실 설렁탕',
  '병천 순대국',
  '만리장성',
  '롯데마트',
  '교통비',
  '감탄커피',
  '매머드커피',
  '망원 티라미수',
  '토도로끼',
  '용돈',
];

function getRandomDate(start, end) {
  const startDate = start.getTime();
  const endDate = end.getTime();

  return new Date(startDate + Math.random() * (endDate - startDate))
    .toLocaleDateString()
    .split('. ')
    .join('-')
    .slice(0, -1);
}

// for (let i = 0; i < 800; i++) {
//   const history = {
//     date: getRandomDate(new Date(2021, 7, 1), new Date()),
//     categoryId: Math.floor(Math.random() * 10 + 1),
//     content: contents[Math.floor(Math.random() * contents.length)],
//     paymentMethod:
//       paymentMethod[Math.floor(Math.random() * paymentMethod.length)],
//     price: Math.ceil((Math.random() * 300000) / 1000) * 1000,
//   };

//   history_DAO.insertHistory(history);
// }
