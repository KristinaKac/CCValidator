import db from '../db.json';

export function isValidCreditCard([...cardNumberString]) {
  let sum = '';
  const cardNumber = cardNumberString.map((item) => Number(item));
  const parity = ((cardNumber.length - 2) % 2);

  for (let i = cardNumber.length - 2; i >= 0; i -= 1) {
    if (i % 2 === parity) {
      sum += (cardNumber[i] * 2).toString();
    } else {
      sum += cardNumber[i].toString();
    }
  }
  const arrSum = Array.from(sum).map((item) => Number(item));

  const total = arrSum.reduce((acc, item) => acc + item, 0);

  let checkDigit = total % 10;

  if (checkDigit !== 0) {
    checkDigit = 10 - (total % 10);
  }

  return cardNumber[cardNumber.length - 1] === checkDigit;
}

export function isPaymentSystem(cardNumberString) {
  let paymentSystem;

  /* eslint-disable-next-line */
  for (const [key, value] of Object.entries(db)) {
    const result = value.startWith.find((item) => cardNumberString.startsWith(item.toString()));

    if (result && value.length.includes(cardNumberString.length)) {
      paymentSystem = key;
    }
  }
  return paymentSystem;
}
