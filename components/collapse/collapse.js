/**
 * Provide unique selector for the wrapper of collapse elements.
 * If needed, apply styles to the inner content wrapper for proper height calculations.
 * */

export class Collapse {
  elems = '[data-collapse]';
  toggle = '[data-toggle]';
  content = '[data-content]';

  constructor(el, options = {}) {
    if (!el) {
      throw new Error('Element selector not defined');
    }

    const {
      onOpen, onClose, onInit, onDestroy
    } = options;

    this.container = el;
    this.onInit = onInit;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onDestroy = onDestroy;

    this.init();
  }

  init() {
    this.$elems = [
      ...document.querySelectorAll(`${this.container ?? ''} ${this.elems}`)
    ];
    if (!this.$elems) return;

    this.onInit?.(this);

    this.$elems.forEach(($el) => {
      const $toggle = $el.querySelector(this.toggle);
      const $content = $el.querySelector(this.content);

      $toggle.addEventListener('click', () => {
        this.toggleActive($el, $content);
      });

      if ($el.classList.contains('active')) {
        this.close($el, $content);
      }
      if ($el.hasAttribute('data-default')) {
        this.open($el, $content);
      }
    })
  }

  toggleActive($el, $content) {
    if ($el.classList.contains('active')) {
      this.close($el, $content);
    } else {
      this.open($el, $content);
    }
  }

  open($el, $content) {
    $el.classList.add('active');
    $content.style.maxHeight = $content.scrollHeight + 'px';
    this.onOpen?.(this, $el);
  }

  close($el, $content) {
    $el.classList.remove('active');
    $content.style.maxHeight = null;
    this.onClose?.(this, $el);
  }

  destroy() {
    this.$elems.forEach(($el) => {
      $el.classList.add('active');
      const $content = $el.querySelector(this.content);
      $content.style.maxHeight = $content.scrollHeight + 'px';
      $el.parentNode.replaceChild($el.cloneNode(true), $el);
    })
    this.onDestroy?.(this);
  }
}
