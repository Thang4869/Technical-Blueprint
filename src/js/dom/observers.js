export function initObservers() {
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
}
