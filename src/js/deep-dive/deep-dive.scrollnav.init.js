(function(){
    const nav = document.getElementById('bbScrollNav');
    if (!nav) return;
    const ring = nav.querySelector('.bb-ring');
    const pctSpan = nav.querySelector('.percent');
    const R = 18; const C = 2*Math.PI*R;
    if (ring) ring.style.strokeDasharray = C;

    window.__dd_scrollnav__ = window.__dd_scrollnav__ || {};
    const s = window.__dd_scrollnav__;
    s.nav = nav; s.ring = ring; s.pctSpan = pctSpan; s.C = C;

    s.collectSections();
    window.addEventListener('resize', () => { s.collectSections(); s.updateProgress(); });

    nav.addEventListener('click', s.handleClick);
    nav.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); s.handleClick(); } });

    window.addEventListener('scroll', s.onScrollTick, { passive: true });
    s.updateProgress();
    const mo = new MutationObserver(()=>{ s.sections = s.collectSections(); });
    mo.observe(document.body, { childList: true, subtree: true });
})();