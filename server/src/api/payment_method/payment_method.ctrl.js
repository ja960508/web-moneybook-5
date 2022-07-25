import commonDAO from '../../db/DAO/common_DAO.js';
import paymentMethodDAO from '../../db/DAO/payment_method_DAO.js';

export async function getPaymentMethods(req, res) {
  const paymentMethod = await paymentMethodDAO.readPaymentMethod();
  res.status(200).json(paymentMethod);
}

export async function addPaymentMethod(req, res) {
  const { value } = req.body;
  await paymentMethodDAO.insertPaymentMethod(value);
  const id = await commonDAO.getLastId('PAYMENT_METHOD');

  res.status(201).json({ id });
}

export async function removePaymentMethod(req, res) {
  const { id } = req.params;
  await paymentMethodDAO.deletePaymentMethodById(id);

  res.status(200).json({ id });
}
