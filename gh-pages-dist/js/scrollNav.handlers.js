import { scrollnav } from './scrollNav.core.js';

export function updateProgress(){
    const nav = scrollnav.nav;
    if (!nav) return;
    const ring = scrollnav.ring;
    const pctSpan = scrollnav.pctSpan;
    const C = scrollnav.C || 0;

    const scrollY = window.scrollY || window.pageYOffset;
    const total = Math.max(1, scrollnav.docHeight() - window.innerHeight);
    let pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
    const dash = C * (1 - pct/100);
    if (ring) ring.style.strokeDashoffset = dash;
    if (pctSpan) pctSpan.textContent = Math.round(pct) + '%';
    if (pct >= 99.5) { nav.classList.add('bb-full'); } else { nav.classList.remove('bb-full'); }
}

export function handleClick(){
    const nav = scrollnav.nav;
    if (!nav) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const total = Math.max(1, scrollnav.docHeight() - window.innerHeight);
    const pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
    if (pct >= 99.5) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    if (!scrollnav.sections || !scrollnav.sections.length) scrollnav.sections = scrollnav.collectSections();
    let idx = -1;
    for (let i=0;i<scrollnav.sections.length;i++){ if (scrollnav.sections[i].top <= scrollY + 8) idx = i; }
    if (idx === -1) { if (scrollnav.sections.length) window.scrollTo({ top: scrollnav.sections[0].top, behavior: 'smooth' }); else window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const currentTop = scrollnav.sections[idx].top;
    if (Math.abs(scrollY - currentTop) > 8) { window.scrollTo({ top: currentTop, behavior: 'smooth' }); }
    else { const prev = Math.max(0, idx - 1); if (idx === 0) { window.scrollTo({ top: 0, behavior: 'smooth' }); } else { window.scrollTo({ top: scrollnav.sections[prev].top, behavior: 'smooth' }); } }
}

export function onScrollTick(){
    if (!scrollnav.ticking){ scrollnav.ticking = true; requestAnimationFrame(()=>{ updateProgress(); scrollnav.ticking=false; }); }
}
