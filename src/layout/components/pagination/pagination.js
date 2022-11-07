import './pagintion.scss';
import './pagination-plugin-style.scss';
import 'paginationjs';

const names = {
  element: '.pagination',
  paginationContainer: '.pagination__pages',
  paginationFooter: '.pagination__description',
};

class Pagination {
  constructor() {
    this.settings = {
      pageSize: 12,
      pageArr: 12,
    };
  }

  initialization(element) {
    this.element = element;
    this.validationData();
    this.pagiation = $(this.element.querySelector(names.paginationContainer)).pagination({
      dataSource: this.settings.pageArr,
      pageSize: this.settings.pageSize,
      pageRange: 1,
      totalNumber: 1,
      prevText: 'arrow_back',
      nextText: 'arrow_forward',
      showPrevious: true,
      showNext: true,
      callback(data) {
        const response = `${data['0']} - ${data[data.length - 1]}`;
        element.querySelector(names.paginationFooter).innerHTML = `${response} из ${this.dataSource.length > 100 ? '100+' : data.length} вариантов аренды`;
      },
    });
  }

  validationData() {
    const pages = +this.element.dataset.pages;
    const size = +this.element.dataset.size;
    if (!Number.isInteger(pages)) {
      this.settings = {
        pageSize: 12,
        pageArr: this.addArr(100),
      };
    }
    if (!Number.isInteger(size)) {
      this.settings = {
        pageSize: 12,
        pageArr: this.addArr(100),
      };
    }

    if (pages === 0 || size === 0) {
      this.settings = {
        pageSize: 1,
        pageArr: [1],
      };
    }

    this.settings = {
      pageSize: size,
      pageArr: this.addArr(pages),
    };
  }

  addArr(num) {
    const arr = [];
    for (let i = 1; i <= num; i += 1) {
      arr.push(i);
    }
    return arr;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  (function handler() {
    const doPagination = document.querySelectorAll(names.element);
    doPagination.forEach((pagination) => {
      const doPaginationDo = new Pagination();
      doPaginationDo.initialization(pagination);
    });
  }());
});
