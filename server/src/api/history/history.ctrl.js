import historyDAO from '../../db/DAO/history_DAO.js';

export async function getHistoryList(req, res) {
  const { month, year } = req.query;

  if (!(month && year)) {
    res.status(400).json({ message: 'month와 year가 모두 있어야 합니다.' });
  }

  const history = await historyDAO.readHistoryByYearMonth(month, year);

  res.status(200).json({ history });
}

export async function addHistory(req, res) {
  const history = req.body;
  const { insertId } = await historyDAO.insertHistory(history);

  res.status(201).json({ id: insertId, ...history });
}

export async function removeHistory(req, res) {
  const { id } = req.params;
  await historyDAO.deleteHistoryById(id);

  res.status(200).json({ message: '성공적으로 삭제했습니다.' });
}

export async function updateHistory(req, res) {
  const historyContent = req.body;
  const { id } = req.params;
  await historyDAO.updateHistoryById(historyContent);

  res.status(200).json({ id, ...historyContent });
}

export async function getRecentHistory(req, res) {
  const { year, month, categoryId } = req.query;
  const data = await historyDAO.getRecentHistory(year, month, categoryId);
  const history = {};

  data.forEach((item) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth() + 1;

    if (!history[year]) {
      history[year] = {};
    }

    if (!history[year][month]) {
      history[year][month] = [];
    }

    history[year][month].push(item);
  });

  res.status(200).json(history);
}
