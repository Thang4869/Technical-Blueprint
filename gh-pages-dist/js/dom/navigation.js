export function initInPageNav() {
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
}
