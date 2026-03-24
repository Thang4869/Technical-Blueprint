export function initTransitions() {
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
}
