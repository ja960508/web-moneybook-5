import { createPaymentMethods } from '../../mock/mock_generator.js';

export function getPaymentMethods(req, res) {
  res.status(200).json(createPaymentMethods());
}

export function addPaymentMethod(req, res) {
  const { value } = req.body;

  res.status(201).json({ id: 1 });
}

export function removePaymentMethod(req, res) {
  const { id } = req.params;

  res.status(200).json({ message: '성공적으로 삭제했습니다.' });
}
