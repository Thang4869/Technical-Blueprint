// Deep Dive - Scroll Navigation
(function(){
    const nav = document.getElementById('bbScrollNav');
    if (!nav) return;
    const ring = nav.querySelector('.bb-ring');
    const pctSpan = nav.querySelector('.percent');
    const R = 18; const C = 2*Math.PI*R;
    ring.style.strokeDasharray = C;

    function docHeight(){ return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); }
    function collectSections(){
        let els = Array.from(document.querySelectorAll('.section-target'));
        if (!els.length) els = Array.from(document.querySelectorAll('main h2, main h3'));
        const arr = els.map(e => ({ el: e, top: e.getBoundingClientRect().top + window.scrollY })).filter(x=>!isNaN(x.top));
        const uniq = [];
        arr.sort((a,b)=>a.top-b.top).forEach(x=>{ if (!uniq.length || Math.abs(uniq[uniq.length-1].top - x.top) > 6) uniq.push(x); });
        return uniq;
    }

    let sections = collectSections();
    window.addEventListener('resize', () => { sections = collectSections(); updateProgress(); });

    function updateProgress(){
        const scrollY = window.scrollY || window.pageYOffset;
        const total = Math.max(1, docHeight() - window.innerHeight);
        let pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
        const dash = C * (1 - pct/100);
        ring.style.strokeDashoffset = dash;
        pctSpan.textContent = Math.round(pct) + '%';
        if (pct >= 99.5) nav.classList.add('bb-full'); else nav.classList.remove('bb-full');
    }

    function handleClick(){
        const scrollY = window.scrollY || window.pageYOffset;
        const total = Math.max(1, docHeight() - window.innerHeight);
        const pct = Math.min(100, Math.max(0, (scrollY / total) * 100));
        if (pct >= 99.5) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        if (!sections || !sections.length) sections = collectSections();
        let idx = -1;
        for (let i=0;i<sections.length;i++){ if (sections[i].top <= scrollY + 8) idx = i; }
        if (idx === -1) { if (sections.length) window.scrollTo({ top: sections[0].top, behavior: 'smooth' }); else window.scrollTo({ top:0, behavior:'smooth' }); return; }
        const currentTop = sections[idx].top;
        if (Math.abs(scrollY - currentTop) > 8) { window.scrollTo({ top: currentTop, behavior: 'smooth' }); }
        else { const prev = Math.max(0, idx-1); if (idx === 0) window.scrollTo({ top:0, behavior:'smooth' }); else window.scrollTo({ top: sections[prev].top, behavior:'smooth' }); }
    }

    nav.addEventListener('click', handleClick);
    nav.addEventListener('keydown', (e)=>{ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } });
    let ticking = false;
    window.addEventListener('scroll', ()=>{ if (!ticking){ ticking = true; requestAnimationFrame(()=>{ updateProgress(); ticking=false; }); } }, { passive: true });
    updateProgress();
    const mo = new MutationObserver(()=>{ sections = collectSections(); });
    mo.observe(document.body, { childList: true, subtree: true });
})();