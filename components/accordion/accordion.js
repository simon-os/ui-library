import { Collapse } from '../collapse/collapse.js';

/**
 * Add data-default to the specific item, if you need it to be opened on load.
 * */

export class Accordion extends Collapse {
  constructor(el, options = {}) {
    super(el, options);
    this.onSwitchActive = options.onSwitchActive;
  }

  init() {
    super.init();
    this.$elems.forEach(($el) => {
      if ($el.classList.contains('active')) {
        this.$currentActive = $el;
      }

      $el
        .querySelector(this.toggle)
        .addEventListener('click', (ev) => {
          this.switchActive(ev.currentTarget.closest(this.elems))
        });
    });
  }

  switchActive($target) {
    if (this.$currentActive && this.$currentActive !== $target) {
      this.close(
        this.$currentActive,
        this.$currentActive.querySelector(this.content)
      );
      this.$currentActive = $target.closest(this.elems);
    } else {
      this.$currentActive = this.$elems.find(($el) => $el.classList.contains('active'));
    }

    this.onSwitchActive?.(this, this.$currentActive);
  }

  destroy() {
    super.destroy();
  }
}
