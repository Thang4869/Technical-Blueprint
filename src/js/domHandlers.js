export function initDomHandlers() {
    // external page links with fade
    document.querySelectorAll('a.transition-link').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || this.target === '_blank') return;
            if (this.classList.contains('ripple-link')) return;
            e.preventDefault();
            document.body.classList.add('page-fade');
            setTimeout(() => { window.location.href = href; }, 220);
        });
    });

    // ripple links (expand circle effect)
    document.querySelectorAll('a.ripple-link').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || this.target === '_blank') return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            e.preventDefault();
            const rect = this.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const overlay = document.createElement('div');
            overlay.className = 'ripple-overlay';
            document.body.appendChild(overlay);
            const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2;
            overlay.style.width = overlay.style.height = maxDim + 'px';
            overlay.style.left = (cx - maxDim/2) + 'px';
            overlay.style.top = (cy - maxDim/2) + 'px';
            requestAnimationFrame(() => {
                overlay.style.transform = 'scale(1)';
                overlay.style.opacity = '1';
            });
            setTimeout(() => {
                document.body.classList.add('page-fade');
                setTimeout(() => { window.location.href = href; }, 120);
            }, 520);
        });
    });

    // in-page navigation with smooth scroll + highlight + URL hash handling
    (function(){
        const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
        function goToHash(hash, options = {highlight: true, push: true, smooth: true}){
            if (!hash || !hash.startsWith('#')) return;
            const target = document.querySelector(hash);
            if (!target) return;
            if (options.smooth) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else target.scrollIntoView({ block: 'start' });

            if (options.highlight) {
                const prevPosition = window.getComputedStyle(target).position;
                if (prevPosition === 'static') target.style.position = 'relative';
                target.classList.add('section-highlight');
                setTimeout(() => {
                    target.classList.remove('section-highlight');
                    if (prevPosition === 'static') target.style.position = '';
                }, 700);
            }

            if (options.push) {
                try { history.pushState(null, '', hash); } catch (e) { location.hash = hash; }
            }
        }

        navLinks.forEach(a => {
            a.addEventListener('click', function (e){
                const hash = this.getAttribute('href');
                if (!hash || !hash.startsWith('#')) return;
                e.preventDefault();
                goToHash(hash, { highlight: true, push: true, smooth: true });
            });
        });

        window.addEventListener('popstate', () => {
            const hash = location.hash || '#overview';
            goToHash(hash, { highlight: true, push: false, smooth: false });
        });

        if (location.hash) {
            setTimeout(() => { goToHash(location.hash, { highlight: true, push: false, smooth: false }); }, 60);
        }
    })();

    // --- On-scroll reveal (IntersectionObserver) ---
    const ioOptions = { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.classList.add('stagger-in');
                entry.target.classList.remove('reveal-on-scroll');
                revealObserver.unobserve(entry.target);
            }
        });
    }, ioOptions);
    document.querySelectorAll('.reveal-on-scroll, .stagger-item').forEach(el => revealObserver.observe(el));

    // --- Parallax (uses rAF, lightweight) ---
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax-speed]'));
    if (parallaxEls.length) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        function onScroll() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    parallaxEls.forEach(el => {
                        const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
                        const rect = el.getBoundingClientRect();
                        const offset = (window.scrollY - (rect.top + window.scrollY - window.innerHeight/2)) * speed;
                        el.style.transform = `translateY(${offset}px)`;
                    });
                    ticking = false;
                });
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // --- Lazy loading for images/backgrounds ---
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.dataset.src) {
                el.src = el.dataset.src;
                el.addEventListener('load', () => el.classList.add('loaded'));
            }
            if (el.dataset.bgSrc) {
                el.style.backgroundImage = `url('${el.dataset.bgSrc}')`;
                el.classList.add('loaded');
            }
            lazyObserver.unobserve(el);
        });
    }, { rootMargin: '0px 0px 150px 0px', threshold: 0.01 });
    document.querySelectorAll('img[data-src], [data-bg-src]').forEach(el => lazyObserver.observe(el));

    // --- Language toggle initialization ---
    (function(){
        try {
            const btnVi = document.getElementById('langVi');
            const btnEn = document.getElementById('langEn');
            if (!btnVi || !btnEn) return;

            function setLang(code){
                document.documentElement.lang = code;
                localStorage.setItem('bb-lang', code);
                btnVi.classList.toggle('active', code === 'vi');
                btnEn.classList.toggle('active', code === 'en');
                btnVi.setAttribute('aria-pressed', code === 'vi');
                btnEn.setAttribute('aria-pressed', code === 'en');
            }

            const stored = localStorage.getItem('bb-lang');
            const initial = stored || document.documentElement.lang || 'vi';
            setLang(initial);

            btnVi.addEventListener('click', () => setLang('vi'));
            btnEn.addEventListener('click', () => setLang('en'));
        } catch (e) { /* silent */ }
    })();
}