// Module manager - initializes the split modules
import { initErrorOverlay } from './errorOverlay.js';
import { initDomHandlers } from './domHandlers.js';
import initCharts from './charts.init.js';
import initScrollNav from './scrollNav.js';
import initAnnotate from './annotate.js';

// Initialize error overlay immediately so runtime errors are caught
initErrorOverlay();

// When DOM is ready, initialize the rest
document.addEventListener('DOMContentLoaded', () => {
    try {
        initDomHandlers();
    } catch (e) { console.error('initDomHandlers error', e); }

    try {
        initCharts();
    } catch (e) { console.error('initCharts error', e); }

    try {
        initScrollNav();
    } catch (e) { console.error('initScrollNav error', e); }

    try {
        initAnnotate();
    } catch (e) { console.error('initAnnotate error', e); }
});

export default {};