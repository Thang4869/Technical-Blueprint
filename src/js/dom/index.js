import { initTransitions } from './transitions.js';
import { initRippleLinks } from './ripple.js';
import { initInPageNav } from './navigation.js';
import { initObservers } from './observers.js';
import { initParallax } from './parallax.js';
import { initLangToggle } from './langToggle.js';

export function initDomHandlers(){
    initTransitions();
    initRippleLinks();
    initInPageNav();
    initObservers();
    initParallax();
    initLangToggle();
}
