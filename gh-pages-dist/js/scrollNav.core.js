export const scrollnav = {
    sections: [],
    ticking: false,
    nav: null,
    ring: null,
    pctSpan: null,
    arrowSpan: null,
    C: 0,
    docHeight() { return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight); },
    collectSections() {
        let els = Array.from(document.querySelectorAll('.section-target'));
        if (!els.length) els = Array.from(document.querySelectorAll('main h2, main h3'));
        const arr = els.map(e => ({ el: e, top: e.getBoundingClientRect().top + window.scrollY })).filter(x=>!isNaN(x.top));
        const uniq = [];
        arr.sort((a,b)=>a.top-b.top).forEach(x=>{ if (!uniq.length || Math.abs(uniq[uniq.length-1].top - x.top) > 6) uniq.push(x); });
        this.sections = uniq;
        return uniq;
    }
};
