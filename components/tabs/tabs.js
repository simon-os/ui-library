/**
 * Add class 'active' to the specific tab-nav, if it needs to be opened by default.
 * */

export class Tabs {
  nav = '[data-nav]';
  navItem = 'data-nav-to';

  constructor(el, options = {}) {
    if (!el) {
      throw new Error('Element selector not defined');
    }

    const {
      onInit, onDestroy,
      onOpen, onClose, onSwitch
    } = options;

    this.el = el;
    this.onInit = onInit;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onSwitch = onSwitch;
    this.onDestroy = onDestroy;

    this.$prevTab = null;
    this.$prevNav = null;

    this.init();
  }


  init() {
    this.$root = document.querySelector(this.el);
    if (!this.$root) return;

    const navs =
      this.$root
          .querySelector(this.nav)
          .querySelectorAll(`[${this.navItem}]`);

    navs?.forEach(($nav, idx) => {
      idx === 0 && this.switch(this.$root, $nav);
      $nav.classList.contains('active') && this.switch(this.$root, $nav);

      $nav.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.switch(this.$root, $nav);
      })
    });

    this.onInit?.(this);
  }

  switch($root, $nav) {
    const $target = $root.querySelector($nav.getAttribute(this.navItem));
    if (!$target || $target === this.$prevTab) return;

    this.open($nav, $target);
    this.close(this.$prevNav, this.$prevTab);
    this.$prevTab = $target;
    this.$prevNav = $nav;

    this.onSwitch?.(this, $target);
  }

  open($nav, $target) {
    $nav?.classList?.add('active');
    $target?.classList?.add('active');
    this.onOpen?.(this, $target);
  }

  close($nav, $target) {
    $nav?.classList?.remove('active');
    $target?.classList?.remove('active');
    this.onClose?.(this, $target);
  }

  destroy() {
    this.$root.parentNode.replaceChild(
      this.$root.cloneNode(true), this.$root
    );
    this.onDestroy?.(this);
  }
}
