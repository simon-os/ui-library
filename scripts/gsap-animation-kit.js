const defaultDuration = 1;
const defaultEase = 'Power3.easeInOut';
const defaultActions = 'play none none none';
const defaultStagger = .12;
const defaultStart = '0 65%';

export function fadeIn(options = {}) {
  let { x } = options;
  const {
    elems, y, duration,
    ease, start, toggleActions
  } = options;

  const items = document.querySelectorAll(elems);
  if (!items) return;

  items.forEach((item) => {
    gsap.timeline({
      scrollTrigger: {
        start: start ?? defaultStart,
        toggleActions: toggleActions ?? defaultActions,
        trigger: item,
      }
    })
      .from(item, {
        y: y ?? 0,
        x: x ?? 0,
        autoAlpha: 0,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  })
}

export function flip(options = {}) {
  const {
    elems, rotateY, rotateX, duration,
    ease, start, toggleActions,
    animateOpacity = true,
  } = options;

  const items = document.querySelectorAll(elems);
  if (!items) return;

  items.forEach((item) => {
    gsap.set(item, { perspective: '2500px' })

    gsap.timeline({
      scrollTrigger: {
        start: start ?? defaultStart,
        toggleActions: toggleActions ?? defaultActions,
        trigger: item,
      }
    })
      .from(item, {
        rotateY: rotateY ?? 0,
        rotateX: rotateX ?? 0,
        autoAlpha: animateOpacity ? 0 : 1,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  })
}

export function zoomIn(options = {}) {
  const {
    elems, scale, duration,
    ease, start, toggleActions,
    animateOpacity = true,
  } = options;

  const items = document.querySelectorAll(elems);
  if (!items) return;

  items.forEach((item) => {
    gsap.timeline({
      scrollTrigger: {
        start: start ?? defaultStart,
        toggleActions: toggleActions ?? defaultActions,
        trigger: item,
      }
    })
      .from(item, {
        scale: scale ?? 0,
        autoAlpha: animateOpacity ? 0 : 1,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  })
}

export function stagger(options = {}) {
  const {
    container, elems, x, y, ease, duration,
    stagger, toggleActions, start,
    animateOpacity = true,
  } = options;

  // container is also a trigger for nested elements
  const $containers = document.querySelectorAll(container);
  if (!$containers) return;

  $containers.forEach(($container) => {
    const items = $container.querySelectorAll(`${container} ${elems}`);
    if (!items) return;

    gsap.timeline({
      scrollTrigger: {
        start: start ?? defaultStart,
        toggleActions: toggleActions ?? defaultActions,
        trigger: $container,
      }
    })
      .from(items, {
        y: y ?? 0,
        x: x ?? 0,
        autoAlpha: animateOpacity ? 0 : 1,
        stagger: stagger ?? defaultStagger,
        ease: ease ?? defaultEase,
        duration: duration ?? defaultDuration,
      });
  });
}

export function fadeInText(textContainers, options = {}) {
  const $textContainers = document.querySelectorAll(textContainers);
  if (!$textContainers) return;

  const {
    targets, x, y, duration,
    ease, stagger, start
  } = options;

  $textContainers.forEach(($container) => {
    let elems = $container.querySelectorAll(targets);

    gsap.timeline({
      scrollTrigger: {
        trigger: $container,
        start: start ?? defaultStart,
        toggleActions: "play none none none",
      }
    })
      .from(elems, {
        y: y ?? 0,
        x: x ?? 0,
        autoAlpha: 0,
        stagger: stagger ?? defaultStagger,
        duration: duration ?? defaultDuration,
        ease: ease ?? defaultEase
      });
  })
}

/**
 * Wraps words inside specified element in tag.
 * Parameter outerTag is optional, can be used for additional wrapping.
 */
export function wrapWordsInTag(elem, options = {}) {
  const { tag, outerTag } = options;

  const el = document.querySelector(elem);
  if (!el) return;

  const words = el.innerText.split(' ');
  el.innerText = '';

  words.forEach(word => {
    if (outerTag) {
      const container = document.createElement(outerTag);
      const wrap = document.createElement(tag);
      wrap.innerText = `${word} `;

      container.appendChild(wrap);
      el.appendChild(container);
      return;
    }

    const wrap = document.createElement(tag);
    wrap.innerText = `${word} `;
    el.appendChild(wrap);
  })
}

