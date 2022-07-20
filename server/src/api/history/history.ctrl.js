import { createBulkHistory } from '../../mock/history.js';

export function getHistoryList(req, res) {
  const { month, year } = req.query;

  if (!(month && year)) {
    res.status(400).json({ message: 'month와 year가 모두 있어야 합니다.' });
  }

  res.json(createBulkHistory(year, month));
}

export function addHistory(req, res) {
  const historyContent = req.body;

  res.json({ id: 1, ...historyContent });
}

export function removeHistory(req, res) {
  const { id } = req.query;

  res.status(200);
}

export function updateHistory(req, res) {
  const historyContent = req.body;
  const { id } = req.params;

  res.status(200).json({ id: 1, ...historyContent });
}
