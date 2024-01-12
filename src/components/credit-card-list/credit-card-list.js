import amex from '../../assets/img/americanexpress.png';
import diners from '../../assets/img/club_diners.png';
import discover from '../../assets/img/discover.png';
import jcb from '../../assets/img/jcb.png';
import maestro from '../../assets/img/maestro.png';
import visa from '../../assets/img/visa.png';
import mcard from '../../assets/img/mastercard.png';
import mir from '../../assets/img/mir.png';

export default class CardList {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.images = [
      {
        url: amex,
        id: 'AmericanExpress',
      },
      {
        url: diners,
        id: 'DinersClub',
      },
      {
        url: discover,
        id: 'Discover',
      },
      {
        url: jcb,
        id: 'JCB',
      },
      {
        url: maestro,
        id: 'Maestro',
      },
      {
        url: visa,
        id: 'Visa',
      },
      {
        url: mcard,
        id: 'MasterCard',
      },
      {
        url: mir,
        id: 'Mir',
      }];
    this.elements = [];

    this.findPaymentSystemDOM = this.findPaymentSystemDOM.bind(this);
    this.changeToColorAllImg = this.changeToColorAllImg.bind(this);
  }

  bindToDOM() {
    this.images.forEach((item) => {
      const img = new Image();
      img.src = item.url;
      img.className = 'bank-card-img';
      img.id = item.id;

      this.parentEl.appendChild(img);
    });
    this.elements = [...this.parentEl.children];
  }

  findPaymentSystemDOM(paySystem) {
    this.element = this.elements.find((item) => item.id === paySystem);

    this.changeToGreyAllImg();
    this.changeToColorOneImg();
  }

  changeToGreyAllImg() {
    this.elements.forEach((item) => item.classList.add('grey'));
  }

  changeToColorAllImg() {
    this.elements.forEach((item) => item.classList.remove('grey'));
  }

  changeToColorOneImg() {
    this.element.classList.remove('grey');
  }
}
