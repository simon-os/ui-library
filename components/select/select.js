import { Dropdown } from '../dropdown/dropdown.js';

/**
 * Add data-default to the specific option, if you need it to be selected on load.
 * */

export class Select extends Dropdown {
  constructor(el, options = {}) {
    super(el, options);
    this.onSelect = options.onSelect;
  }

  init() {
    super.init();

    this.$input = this.$el.querySelector('[data-input]');
    this.selectDefault(this.$el);

    this.$el
      .querySelector('[data-content]')
      .addEventListener('click', (ev) => {
        const option = ev.target.closest(this.option);
        if (!option) return;

        this.select(
          this.$el.querySelector('[data-current]'),
          option
        );
      });
  }

  select($current, $option) {
    $current.innerHTML = $option.innerHTML;
    if ($option.dataset['value']) {
      $current.dataset['value'] = $option.dataset['value'];
      this.$input.value = $option.dataset['value'];
    }
    this.onSelect?.(this, $option);
  }

  selectDefault() {
    const defaultOption = this.$el.querySelector('[data-default]');
    if (defaultOption) {
      this.select(
        this.$el.querySelector('[data-current]'),
        defaultOption
      );
    }
  }
}
