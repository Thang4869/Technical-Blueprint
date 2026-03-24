export function initParallax() {
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
}
