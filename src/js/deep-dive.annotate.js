// Deep Dive - Annotate / Reveal Observer
(function(){
    function annotate(root=document){
        try {
            // Ensure a global reveal observer exists for dynamic elements
            if (!window._bbRevealObserver) {
                const opts = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 };
                window._bbRevealObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                            entry.target.classList.add('stagger-in');
                            entry.target.classList.remove('reveal-on-scroll');
                            window._bbRevealObserver.unobserve(entry.target);
                        }
                    });
                }, opts);
            }
            const selectors = ['section','.bg-white','.tech-card','.chart-container','.fade-in','.max-w-4xl','.bg-indigo-600','.bg-slate-800','.bg-slate-900','.bg-indigo-50'];
            selectors.forEach(s => (root.querySelectorAll(s)||[]).forEach(el => {
                if (!el.classList.contains('reveal-on-scroll')) el.classList.add('reveal-on-scroll');
                if (!el.classList.contains('stagger-item')) el.classList.add('stagger-item');
                try { window._bbRevealObserver.observe(el); } catch(e){}
            }));

            // Parallax targets (decorative patterns / blobs)
            (root.querySelectorAll('.header-pattern, .absolute')||[]).forEach((el,i) => {
                if (!el.dataset.parallaxSpeed) el.dataset.parallaxSpeed = (i % 2 === 0) ? '0.06' : '0.12';
                el.classList.add('parallax');
            });

            // Convert images to lazy-friendly pattern if present
            (root.querySelectorAll('img')||[]).forEach(img => {
                if (img.dataset.src || img.loading === 'lazy') return;
                const src = img.getAttribute('src');
                if (src) {
                    img.dataset.src = src;
                    img.removeAttribute('src');
                    img.loading = 'lazy';
                    img.classList.add('lazy-img');
                }
            });

            // Reveal elements already in viewport immediately
            (root.querySelectorAll('.reveal-on-scroll')||[]).forEach(el => {
                try {
                    const r = el.getBoundingClientRect();
                    if (r.top < window.innerHeight && r.bottom > 0) {
                        el.classList.add('revealed','stagger-in');
                        el.classList.remove('reveal-on-scroll');
                        try { window._bbRevealObserver.unobserve(el); } catch(e){}
                    }
                } catch(e){}
            });
        } catch (e) { console.error('Annotate error', e); }
    }

    document.addEventListener('DOMContentLoaded', () => {
        annotate();
        const main = document.getElementById('main-content');
        if (main) {
            const mo = new MutationObserver(muts => {
                muts.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) annotate(n); }));
            });
            mo.observe(main, { childList: true, subtree: true });
        }
    });
})();