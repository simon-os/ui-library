import { Collapse } from './components/collapse/collapse.js';
import { Accordion } from './components/accordion/accordion.js';
import { Dropdown } from './components/dropdown/dropdown.js';
import { Modal } from './components/modal/modal.js';
import { Select } from './components/select/select.js';
import { Tabs } from './components/tabs/tabs.js';
import { Parallax } from './scripts/parallax.js';
import { anchorSmoothScroll } from './scripts/anchor-smooth-scroll.js';
import {
  fadeIn, flip, zoomIn,
  stagger, wrapWordsInTag, fadeInText
} from './scripts/gsap-animation-kit.js';

gsap.registerPlugin(ScrollTrigger);

/** ----- Components ----- */

// Collapse
window.collapse = new Collapse('#collapse-group');

// Accordion
new Accordion('#accordion');

// Dropdown
new Dropdown('#dropdown-1');
new Dropdown('#dropdown-2', {
  closeOnClick: false
});

// Select
new Select('#select-1');
new Select('#select-2', {
  onSelect: (instance, target) => {
    console.log('Selected: ', target);
  }
});

// Tabs
new Tabs('#tabs-1');
new Tabs('#tabs-inner');
new Tabs('#tabs-2', {
  onSwitch: (instance, target) => {
    console.log('Tab switched to: ', target);
  }
});

// Modal
new Modal('#modal', '.modal-1-triggers', {
  onOpen: (instance, target) => {
    document.body.style.overflow = 'hidden';
  },
  onClose: (instance, target) => {
    document.body.style.overflow = 'auto';
  },
});

new Modal('#modal-2', '#modal-2-trigger');

/** ------ Scripts ------ */

// Parallax
new Parallax('[data-parallax]');

// Anchor smooth scroll
anchorSmoothScroll();
anchorSmoothScroll('.scroll-button', {
  behaviour: 'auto',
  attribute: 'data-target'
});

// GSAP Animation Kit
// Fade in
fadeIn({
  elems: '[data-fade-in]',
  duration: 1,
  ease: 'Power1.easeInOut',
});

fadeIn({
  elems: '[data-fade-up]',
  y: '10vh',
  duration: 1,
  ease: 'Power1.easeInOut',
});

fadeIn({
  elems: '[data-fade-down]',
  y: '-10vh',
  duration: 1,
});

fadeIn({
  elems: '[data-fade-right]',
  x: '-30%',
  y: 0,
  duration: 1,
});

fadeIn({
  elems: '[data-fade-left]',
  x: '30%',
  y: 0,
  duration: 1,
});

// Flip
flip({
  elems: '[data-flip-side]',
  rotateY: '-90deg',
  duration: 2,
  ease: 'elastic.out(1, 0.75)',
});

flip({
  elems: '[data-flip-top]',
  rotateX: '-90deg',
  duration: 2,
  ease: 'elastic.out(1, 0.75)',
});

// Zoom in
zoomIn({
  elems: '[data-zoom]',
  scale: .5,
  duration: .8,
});

// Stagger
stagger({
  container: '[data-stagger-container]',
  elems: '[data-stagger]',
  y: 20,
  start: 'top 70%',
  stagger: .3
});

// Text fade-in
fadeInText('[data-text-fade-in]', {
  targets: 'p, a, li',
  y: 20,
  x: 20,
  stagger: .08,
  duration: .8
});

// Animate separate words
wrapWordsInTag('.wrapped-text', {
  tag: 'i',
  outerTag: 'span',
});

stagger({
  container: '.wrapped-text',
  elems: 'i',
  y: '100%',
  stagger: .1,
  duration: .8,
  animateOpacity: false
});
