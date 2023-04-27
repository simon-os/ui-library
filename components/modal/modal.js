/**
 * Provide selector for trigger elements.
 * You can trigger modal from several elements with a class selector, for example.
 * Takes transition-duration from provided selector css for overlay removal timeout.
 * */

export class Modal {
  closeBtn = '[data-close]';

  constructor(el, trigger, options = {}) {
    if (!el) {
      throw new Error('Element selector not defined');
    }
    if (!trigger) {
      throw new Error('Trigger selector not defined');
    }

    const {
      onOpen, onClose,
      onInit, onDestroy
    } = options;

    this.el = el;
    this.trigger = trigger;

    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onInit = onInit;
    this.onDestroy = onDestroy;

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.init();
  }

  init() {
    this.$el = document.querySelector(this.el);
    if (!this.$el) return;

    this.createOverlay();
    this.delay =
      parseFloat(
        getComputedStyle(this.$el)
          .transitionDuration
          .split(',')[0]
      );

    this.$triggers = document.querySelectorAll(this.trigger);
    this.$triggers.forEach(($trigger) => {
      $trigger.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.open();
      });
    });

    this.$closeBtn = this.$el.querySelector(this.closeBtn);
    this.$closeBtn?.addEventListener('click', this.close);

    this.onInit?.(this);
  }

  open() {
    this.$el.classList.add('active');
    document.body.append(this.$overlay);
    this.onOpen?.(this, this.$el);
  }

  close() {
    this.$el.classList.remove('active');
    this.$overlay.dataset['fadingOut'] = 'true';

    setTimeout(() => {
      this.$overlay.remove();
      delete this.$overlay.dataset['fadingOut'];
      this.onClose?.(this, this.$el);
    }, this.delay * 1000);
  }

  createOverlay() {
    this.$overlay = document.createElement('div');
    this.$overlay.dataset['modalOverlay'] = '';

    this.$overlay.addEventListener('click', () => {
      this.close();
    });
  }

  destroy() {
    this.close();
    this.$triggers.forEach(($trigger) => {
      $trigger.parentNode.replaceChild(
        $trigger.cloneNode(true),
        $trigger
      );
    });
    this.onDestroy?.(this);
  }
}
