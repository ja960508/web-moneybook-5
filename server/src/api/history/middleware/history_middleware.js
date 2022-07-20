export function isValidHistory(req, res, next) {
  const historyContent = req.body;
  const requiredKeys = [
    'month',
    'year',
    'day',
    'category',
    'content',
    'paymentMethod',
    'isIncome',
    'price',
  ];
  const isValid = requiredKeys.every((key) => historyContent[key]);

  if (!isValid) {
    res.status(400).json({ message: '모든 항목이 채워져야합니다.' });
  } else {
    next();
  }
}
