import CreditCardForm from '../components/credit-card-form/credit-card-form';
import CardList from '../components/credit-card-list/credit-card-list';

const list = document.querySelector('.card-list');
const form = document.querySelector('.form-widget');

const cardList = new CardList(list);
cardList.bindToDOM();

const creditCardForm = new CreditCardForm(
  form,
  cardList.findPaymentSystemDOM,
  cardList.changeToColorAllImg,
);
creditCardForm.bindToDOM();
