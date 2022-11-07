import './room.scss';

const names = {
  element: '.room',
  prev: '.room_prev > i',
  next: '.room_next > i',
  radio: '.room__slider-input',
  radioHandler: 'room__slider-input',
  images: '.room__image',
  hidden: 'room__image_hidden',
  price: '.room__price-value',
  reviewValue: '.room__review-value',
  reviewText: '.room__review-description',
};

class Room {
  initialization(element) {
    this.element = element;
    this.next = this.element.querySelector(names.next);
    this.prev = this.element.querySelector(names.prev);
    this.radio = this.element.querySelectorAll(names.radio);
    this.images = this.element.querySelectorAll(names.images);
    this.price = this.element.querySelector(names.price);
    this.reviewValue = this.element.querySelector(names.reviewValue);
    this.reviewText = this.element.querySelector(names.reviewText);
    this.nextHandler();
    this.prevHandler();
    this.activeRadio();
    this.activeImage();
    this.radioHandler();
    this.priceValidation();
    this.reviewTextValidation();
  }

  radioHandler() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains(names.radioHandler)) {
        this.activeImage();
      }
    });
  }

  nextHandler() {
    if (this.next) {
      this.next.addEventListener('click', () => {
        let id = this.activeRadio();

        id += 1;

        if (id > this.radio.length - 1) {
          id = 0;
        }

        this.radioUpdate(id);
        this.activeImage();
      });
    }
  }

  prevHandler() {
    if (this.prev) {
      this.prev.addEventListener('click', () => {
        let id = this.activeRadio();

        id -= 1;

        if (id < 0) {
          id = this.radio.length - 1;
        }

        this.radioUpdate(id);
        this.activeImage();
      });
    }
  }

  activeRadio() {
    if (this.radio.length === 0) {
      return null;
    }

    let id = 0;

    this.radio.forEach((element, index) => {
      if (element.checked) {
        id = index;
      }
    });

    if (!id) {
      id = 0;
    }

    this.radio[id].checked = true;
    return id;
  }

  radioUpdate(id) {
    this.radio.forEach((element, index) => {
      if (index === id) {
        element.checked = true;
      }
    });
  }

  activeImage() {
    const id = this.activeRadio();

    if (id !== null) {
      this.images.forEach((element) => {
        element.classList.add(names.hidden);
      });
      this.images[id].classList.remove(names.hidden);
    }

    if (this.images.length === 1) {
      this.images[0].classList.remove(names.hidden);
    }
  }

  priceValidation() {
    this.price.innerHTML = `${new Intl.NumberFormat('ru-RU').format(+this.price.dataset.price)}₽`;
  }

  reviewTextValidation() {
    let text = 'Отзывов';

    if (+this.reviewValue.dataset.review === 1) {
      text = 'Отзыв';
    }

    if (+this.reviewValue.dataset.review > 1) {
      text = 'Отзыва';
    }

    if (+this.reviewValue.dataset.review > 4) {
      text = 'Отзывов';
    }

    this.reviewText.innerHTML = text;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const room = document.querySelectorAll(names.element);
    room.forEach((dropdown) => {
      const doRoom = new Room();
      doRoom.initialization(dropdown);
    });
  }());
});
