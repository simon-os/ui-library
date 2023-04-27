/**
 * Add data-default to the specific item if you need it to be opened on load.
 * @closeOnClick allows to close dropdown after clicking on the item (true by default)
 * */

export class Dropdown {
  static $prev;
  static $overlay;
  trigger = '[data-trigger]';
  option = '[data-option]';

  constructor(el, options = {}) {
    if (!el) {
      throw new Error('Element selector not defined');
    }

    const {
      closeOnClick,
      onOpen, onClose,
      onInit, onDestroy
    } = options;

    this.el = el;
    this.closeOnClick = closeOnClick ?? true;

    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onInit = onInit;
    this.onDestroy = onDestroy;

    this.toggle = this.toggle.bind(this);
    this.init();
  }

  init() {
    this.$el = document.querySelector(this.el);
    if (!this.$el) return;

    this.createOverlay();

    this.$el
      .querySelector(this.trigger)
      ?.addEventListener('click', (ev) => {
        this.toggle(ev, this.$el);
      });

    if (this.closeOnClick) {
      this.$el
        .querySelectorAll(this.option)
        .forEach(($option) => {
          $option.addEventListener('click', (ev) => {
            this.toggle();
          });
        });
    }

    this.onInit?.(this);
  }

  toggle() {
    this.$el.classList.contains('active')
      ? this.close(Dropdown.$prev)
      : this.open();
  }

  open() {
    Dropdown.$prev && this.close(Dropdown.$prev);

    this.$el.classList.add('active');

    Dropdown.$prev = this.$el;
    document.body.append(Dropdown.$overlay);
    this.onOpen?.(this, this.$el);
  }

  close($target) {
    $target
      ? $target.classList.remove('active')
      : this.$el.classList.remove('active');

    Dropdown.$overlay.remove();
    this.onClose?.(this, $target ?? this.$el);
  }

  createOverlay() {
    Dropdown.$overlay = document.createElement('div');
    Dropdown.$overlay.dataset['overlay'] = '';

    Dropdown.$overlay.addEventListener('click', () => {
      this.close(Dropdown.$prev);
    });
  }

  destroy() {
    if (Dropdown.$prev && Dropdown.$prev.classList.contains('active')) {
      this.close(Dropdown.$prev);
    }

    this.$el.parentNode.replaceChild(this.$el.cloneNode(true), this.$el);
    this.onDestroy?.(this);
  }
}
