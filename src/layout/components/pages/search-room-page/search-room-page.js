import './search-room-page.scss';

const names = {
  element: '.search-room-page',
  label: '.search-room-page__label',
  input: '.search-room-page__input',
  filterWrapper: '.search-room-page__filter',
  show: 'search-room-page__filter_show',
  showClass: 'search-room-page__filter_show',
};

class SearchRoomPage {
  initialization(element) {
    this.element = element;
    this.label = this.element.querySelector(names.label);
    this.input = this.element.querySelector(names.input);
    this.wrapper = this.element.querySelector(names.filterWrapper);
    this.filterHandler();
    this.filterShow();
    this.outFilterHandler();
    this.outFilterHandler();
  }

  filterHandler() {
    this.element.addEventListener('click', () => {
      this.filterShow();
    });
  }

  filterShow() {
    if (this.input.checked) {
      this.wrapper.classList.add(names.show);
    } else {
      this.wrapper.classList.remove(names.show);
    }
  }

  outFilterHandler() {
    document.addEventListener('click', (e) => {
      const outFilter = e.composedPath().includes(this.wrapper);
      const outLabel = e.composedPath().includes(this.label);
      if (!outFilter && !outLabel) {
        this.input.checked = false;
        this.wrapper.classList.remove(names.show);
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const filter = document.querySelector(names.element);
    const doFilter = new SearchRoomPage();
    doFilter.initialization(filter);
  }());
});
