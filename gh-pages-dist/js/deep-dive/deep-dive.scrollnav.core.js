(function(){
    window.__dd_scrollnav__ = window.__dd_scrollnav__ || {};
    const s = window.__dd_scrollnav__;
    s.sections = s.sections || [];
    s.ticking = s.ticking || false;

    s.docHeight = function(){
        return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    };

    s.collectSections = function(){
        let els = Array.from(document.querySelectorAll('.section-target'));
        if (!els.length) els = Array.from(document.querySelectorAll('main h2, main h3'));
        const arr = els.map(e => ({ el: e, top: e.getBoundingClientRect().top + window.scrollY })).filter(x=>!isNaN(x.top));
        const uniq = [];
        arr.sort((a,b)=>a.top-b.top).forEach(x=>{ if (!uniq.length || Math.abs(uniq[uniq.length-1].top - x.top) > 6) uniq.push(x); });
        s.sections = uniq;
        return uniq;
    };
})();