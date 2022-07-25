import paymentMethodDAO from '../../db/DAO/payment_method_DAO.js';

export async function getPaymentMethods(req, res) {
  const paymentMethod = await paymentMethodDAO.readPaymentMethod();
  res.status(200).json(paymentMethod);
}

export async function addPaymentMethod(req, res) {
  const { value } = req.body;
  const id = await paymentMethodDAO.insertPaymentMethod(value);

  res.status(201).json({ id: id[0]['LAST_INSERT_ID()'] });
}

export async function removePaymentMethod(req, res) {
  const { id } = req.params;
  await paymentMethodDAO.deletePaymentMethodById(id);

  res.status(200).json({ id });
}
