import { createBulkHistory } from '../../mock/history.js';

export function getHistoryList(req, res) {
  const { month, year } = req.query;

  if (!(month && year)) {
    res.status(400).json({ message: 'month와 year가 모두 있어야 합니다.' });
  }

  res.json(createBulkHistory(year, month));
}
