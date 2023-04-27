/**
 * @behaviour smoothness of the scroll (auto or [smooth] by default)
 * @attribute custom attribute to get target ([href] by default)
 */
export function anchorSmoothScroll(elems, options = {}) {
  const { behaviour, attribute } = options;

  const $elems = document.querySelectorAll(elems ?? 'a[href^="#"]');
  if (!$elems) return;

  $elems.forEach(($el) => {
    $el.addEventListener('click', (ev) => {
      ev.preventDefault();

      const target = $el.getAttribute(attribute ?? 'href');
      if (!target || target === '#') return;

      document
        .querySelector(target)
        ?.scrollIntoView({
          behavior: behaviour ?? 'smooth'
        });
    })
  });
}
