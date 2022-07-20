import { createPaymentMethods } from '../../mock/mock_generator.js';

export function getPaymentMethods(req, res) {
  res.status(200).json(createPaymentMethods());
}

export function addPaymentMethod(req, res) {
  const { value } = req.body;

  res.status(201).json({ id: 1 });
}
