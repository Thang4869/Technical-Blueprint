export function initRippleLinks() {
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
}
