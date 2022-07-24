import categoryDAO from '../../db/DAO/category_DAO.js';

export async function getAllCategory(req, res) {
  const category = await categoryDAO.readAllCategory();

  res.status(200).json(category);
}
