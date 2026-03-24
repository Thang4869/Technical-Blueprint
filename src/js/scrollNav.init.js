import { scrollnav } from './scrollNav.core.js';
import { updateProgress, handleClick, onScrollTick } from './scrollNav.handlers.js';

export function initScrollNav() {
    const nav = document.getElementById('bbScrollNav');
    if (!nav) return;
    const ring = nav.querySelector('.bb-ring');
    const pctSpan = nav.querySelector('.percent');
    const arrowSpan = nav.querySelector('.arrow');
    const R = 18; const C = 2*Math.PI*R;
    if (ring) ring.style.strokeDasharray = C;

    scrollnav.nav = nav; scrollnav.ring = ring; scrollnav.pctSpan = pctSpan; scrollnav.arrowSpan = arrowSpan; scrollnav.C = C;

    scrollnav.collectSections();
    window.addEventListener('resize', () => { scrollnav.collectSections(); updateProgress(); });

    nav.addEventListener('click', handleClick);
    nav.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } });

    window.addEventListener('scroll', onScrollTick, { passive: true });
    updateProgress();

    const mo = new MutationObserver(()=>{ scrollnav.sections = scrollnav.collectSections(); });
    mo.observe(document.body, { childList: true, subtree: true });
}

export default initScrollNav;
