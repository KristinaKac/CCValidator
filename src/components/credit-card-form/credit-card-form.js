import { isValidCreditCard, isPaymentSystem } from '../../js/validator';

export default class CreditCardForm {
  constructor(parentEl, findPaymentSystemDOM, changeToColorAllImg) {
    this.parentEl = parentEl;

    this.findPaymentSystemDOM = findPaymentSystemDOM;
    this.changeToColorAllImg = changeToColorAllImg;

    this.onSubmit = this.onSubmit.bind(this);
  }

  static get markup() {
    return `
        <form class="form">
            <input class="input" type="text" placeholder="Credit card number" required>
            <button class="btn" ">Click to Validate</button>
        </form>
        `;
  }

  static get inputSelector() {
    return '.input';
  }

  static get buttonSelector() {
    return '.btn';
  }

  static get formSelector() {
    return '.form';
  }

  bindToDOM() {
    this.parentEl.innerHTML = CreditCardForm.markup;

    this.element = this.parentEl.querySelector(CreditCardForm.formSelector);
    this.input = this.parentEl.querySelector(CreditCardForm.inputSelector);
    this.button = this.parentEl.querySelector(CreditCardForm.buttonSelector);

    this.element.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    if (isValidCreditCard(this.input.value)) {
      this.input.classList.remove('invalid');
      this.input.classList.add('valid');

      const paySystem = isPaymentSystem(this.input.value);

      if (typeof paySystem !== 'undefined') {
        this.findPaymentSystemDOM(paySystem);
      } else {
        this.changeToColorAllImg();
      }
    } else {
      this.input.classList.remove('valid');
      this.input.classList.add('invalid');

      this.changeToColorAllImg();
    }
  }
}
