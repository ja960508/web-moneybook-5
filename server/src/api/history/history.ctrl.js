import historyDAO from '../../db/DAO/history_DAO.js';
import {
  createBulkHistory,
  createRecentHistory,
} from '../../mock/mock_generator.js';

export async function getHistoryList(req, res) {
  const { month, year } = req.query;

  if (!(month && year)) {
    res.status(400).json({ message: 'month와 year가 모두 있어야 합니다.' });
  }

  const history = await historyDAO.readHistoryByYearMonth(month, year);

  res.status(200).json({
    year,
    month,
    history: history.map((item) => ({ ...item, day: item.date.getDate() })),
  });
}

export function addHistory(req, res) {
  const historyContent = req.body;

  res.status(201).json({ id: 1, ...historyContent });
}

export function removeHistory(req, res) {
  const { id } = req.params;

  res.status(200).json({ message: '성공적으로 삭제했습니다.' });
}

export function updateHistory(req, res) {
  const historyContent = req.body;
  const { id } = req.params;

  res.status(200).json({ id: 1, ...historyContent });
}

export function getRecentHistory(req, res) {
  const { year, month, category } = req.query;
  const startTime = getStartTime(year, month);
  const history = createRecentHistory(startTime);

  for (const year in history) {
    for (const month in history[year]) {
      history[year][month] = history[year][month].filter(
        (item) => item.category === category
      );
    }
  }

  res.status(200).json(history);
}

function getStartTime(year, month) {
  const startMonth = month - 6;

  if (startMonth <= 0) {
    return `${year - 1}-${startMonth + 12}`;
  }

  return `${year}-${startMonth < 10 ? '0' + startMonth : startMonth}`;
}
