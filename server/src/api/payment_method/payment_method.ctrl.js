import historyDAO from '../../db/DAO/history_DAO.js';
import paymentMethodDAO from '../../db/DAO/payment_method_DAO.js';

export async function getPaymentMethods(req, res) {
  const paymentMethod = await paymentMethodDAO.readPaymentMethod();
  res.status(200).json(paymentMethod);
}

export async function addPaymentMethod(req, res) {
  const { value } = req.body;
  const { insertId } = await paymentMethodDAO.insertPaymentMethod(value);

  res.status(201).json({ id: insertId });
}

export async function removePaymentMethod(req, res) {
  const { id } = req.params;
  const value = await paymentMethodDAO.getPaymentMethodById(id);

  await Promise.all([
    paymentMethodDAO.deletePaymentMethodById(id),
    historyDAO.deletePaymentMethodInHistory(value[0].name),
  ]);

  res.status(200).json({ id });
}
