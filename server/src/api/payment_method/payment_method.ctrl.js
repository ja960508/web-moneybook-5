import { createPaymentMethods } from '../../mock/mock_generator.js';

export function getPaymentMethods(req, res) {
  res.status(200).json(createPaymentMethods());
}
