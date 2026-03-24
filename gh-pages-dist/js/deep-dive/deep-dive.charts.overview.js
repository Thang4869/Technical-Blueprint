// Deep Dive - Overview Chart
(function(){
    function renderOverviewChart() {
        const ctx = document.getElementById('overviewChart');
        if(!ctx) return;
        window.__dd_charts__.clearChart('overviewChart');

        const chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Entity Count', 'Fast-Pacing', 'Player Skill (Dodge)', 'Tactical Strategy', 'Story/Narrative', 'RNG Dependency'],
                datasets: [{
                    label: 'Bizarre Brigade Attributes',
                    data: [9.5, 8.5, 7.0, 6.0, 2.0, 8.0],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(79, 70, 229, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { font: { family: 'Inter', size: 12 }, color: '#475569' },
                        ticks: { display: false, min: 0, max: 10 }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Điểm đánh giá: ${context.raw}/10`;
                            }
                        }
                    }
                }
            }
        });

        window.__dd_charts__.setChart('overviewChart', chart);
    }

    // expose globally for existing callers
    window.renderOverviewChart = renderOverviewChart;
})();
