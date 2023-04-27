/**
 * Requires GSAP.
 * You can specify in html elements:
 * @data-x amount of displacement on x axis
 * @data-y amount of displacement on y axis
 * @data-trigger selector of an element that triggers parallax on scroll
 * @data-media on which screen width turn on parallax
 * @data-start scrolling position for starting parallax
 */

export class Parallax {
  constructor(elems) {
    this.$elems = document.querySelectorAll(elems);
    this.tweens = null;
    this.init();
  }

  init() {
    if (!this.$elems) return;

    this.tweens = [];
    this.$elems.forEach(($el) => {
      const x = $el.getAttribute('data-x');
      const y = $el.getAttribute('data-y');
      const trigger = $el.getAttribute('data-trigger');
      const start = $el.getAttribute('data-start');
      const mediaQuery = $el.getAttribute('data-media');

      const mm = gsap.matchMedia();
      mm.add(`(${mediaQuery || 'min-width: 0'})`, () => {
        this.tweens.push(
          gsap.to($el, {
            translateX: x ?? '0',
            translateY: y ?? '0',
            ease: 'none',
            scrollTrigger: {
              trigger: trigger ?? $el.parentNode,
              start: start ?? 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          })
        );
      });
    })
  }

  destroy() {
    this.tweens.forEach((tween) => {
      tween.restart();
      tween.kill();
    });
    this.tweens = null;
  }
}
