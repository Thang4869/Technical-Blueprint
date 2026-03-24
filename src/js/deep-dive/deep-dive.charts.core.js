// Deep Dive - Charts Core (stores chart instances and helpers)
window.__dd_charts__ = window.__dd_charts__ || (function(){
    const instances = Object.create(null);

    function clearChart(id) {
        const c = instances[id];
        if (c) {
            try { c.destroy(); } catch(e) {}
            instances[id] = null;
        }
    }

    function setChart(id, chart) {
        instances[id] = chart;
    }

    function getChart(id) {
        return instances[id] || null;
    }

    return { clearChart, setChart, getChart };
})();
