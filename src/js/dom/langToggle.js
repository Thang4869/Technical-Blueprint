export function initLangToggle() {
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
}
