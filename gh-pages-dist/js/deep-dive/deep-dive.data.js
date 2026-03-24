// Deep Dive - Data (reportData) — assembled from per-section files to preserve global `reportData` identifier
var reportData = (function(){
    var s = window.__dd_sections__ || {};
    return {
        overview: s.overview || {},
        mechanics: s.mechanics || {},
        architecture: s.architecture || {},
        rendering: s.rendering || {},
        asset_strategy: s.asset_strategy || {},
        optimization: s.optimization || {},
        recreation: s.recreation || {}
    };
})();