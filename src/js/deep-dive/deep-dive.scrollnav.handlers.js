(function(){
    window.__dd_scrollnav__ = window.__dd_scrollnav__ || {};
    const s = window.__dd_scrollnav__;

    s.updateProgress = function(){
        const nav = s.nav;
        if (!nav) return;
        const ring = s.ring;
        const pctSpan = s.pctSpan;
        const C = s.C || 0;

        const scrollY = window.scrollY || window.pageYOffset;
        const total = Math.max(1, s.docHeight() - window.innerHeight);
        let pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
        const dash = C * (1 - pct/100);
        if (ring) ring.style.strokeDashoffset = dash;
        if (pctSpan) pctSpan.textContent = Math.round(pct) + '%';
        if (pct >= 99.5) nav.classList.add('bb-full'); else nav.classList.remove('bb-full');
    };

    s.handleClick = function(){
        const nav = s.nav;
        if (!nav) return;
        const scrollY = window.scrollY || window.pageYOffset;
        const total = Math.max(1, s.docHeight() - window.innerHeight);
        const pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
        if (pct >= 99.5) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        if (!s.sections || !s.sections.length) s.sections = s.collectSections();
        let idx = -1;
        for (let i=0;i<s.sections.length;i++){ if (s.sections[i].top <= scrollY + 8) idx = i; }
        if (idx === -1) { if (s.sections.length) window.scrollTo({ top: s.sections[0].top, behavior: 'smooth' }); else window.scrollTo({ top:0, behavior:'smooth' }); return; }
        const currentTop = s.sections[idx].top;
        if (Math.abs(scrollY - currentTop) > 8) { window.scrollTo({ top: currentTop, behavior: 'smooth' }); }
        else { const prev = Math.max(0, idx-1); if (idx === 0) window.scrollTo({ top:0, behavior:'smooth' }); else window.scrollTo({ top: s.sections[prev].top, behavior:'smooth' }); }
    };

    s.onScrollTick = function(){
        if (!s.ticking){ s.ticking = true; requestAnimationFrame(()=>{ s.updateProgress(); s.ticking=false; }); }
    };
})();