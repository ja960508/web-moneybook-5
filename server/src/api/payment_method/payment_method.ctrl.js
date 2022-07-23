import paymentMethodDAO from '../../db/DAO/payment_method_DAO.js';

export async function getPaymentMethods(req, res) {
  const paymentMethod = await paymentMethodDAO.readPaymentMethod();
  res.status(200).json(paymentMethod);
}

export function addPaymentMethod(req, res) {
  const { value } = req.body;

  res.status(201).json({ id: 1 });
}

export function removePaymentMethod(req, res) {
  const { id } = req.params;

  res.status(200).json({ message: '성공적으로 삭제했습니다.' });
}
