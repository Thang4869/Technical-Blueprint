// Deep Dive - DOM initialization
document.addEventListener('DOMContentLoaded', () => {
    // keep existing transition-link behavior
    document.querySelectorAll('a.transition-link').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('#') || this.target === '_blank') return;
            e.preventDefault();
            document.body.classList.add('page-fade');
            setTimeout(() => { window.location.href = href; }, 220);
        });
    });

    // sidebar slide-in
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.add('sidebar-hidden');
        requestAnimationFrame(() => {
            sidebar.classList.remove('sidebar-hidden');
            sidebar.classList.add('sidebar-enter');
        });
    }

    // back home zoom-out button
    const backBtn = document.getElementById('backHomeBtn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                window.location.href = 'infographic.html';
                return;
            }
            // animate main area zooming out slightly then navigate
            const main = document.querySelector('main');
            if (main) {
                main.classList.add('zoom-out-active');
                setTimeout(() => { window.location.href = 'infographic.html'; }, 340);
            } else {
                window.location.href = 'infographic.html';
            }
        });
    }

    // initialize app UI
    try { initApp(); } catch (e) { console.error('initApp error', e); }
});