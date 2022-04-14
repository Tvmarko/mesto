export class Section {
    constructor({ items, renderer }, selector) {
      this._renderer = renderer;
      this._items = items;
      this._container = document.querySelector(selector);
    }
  
    renderItems(items) {
      items.forEach(item => this._renderer(item));
    }

    addItem(element) {
      this._container.prepend(element);
    }
  }
