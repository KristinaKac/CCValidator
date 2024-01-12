import { isValidCreditCard, isPaymentSystem } from '../js/validator';

test('must be true, if the number is valid', () => {
  const result = isValidCreditCard('5595081890776495');
  expect(result).toBe(true);
});

test('must be false, if the number is invalid', () => {
  const result = isValidCreditCard('559508189077649599');
  expect(result).toBe(false);
});

test('must be "MasterCard"', () => {
  const result = isPaymentSystem('5521225945146472');
  expect(result).toBe('MasterCard');
});

test('must be "undefined"', () => {
  const result = isPaymentSystem('55212259451464724');
  expect(result).toBe(undefined);
});
