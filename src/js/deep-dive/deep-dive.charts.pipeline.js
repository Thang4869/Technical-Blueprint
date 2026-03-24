// Deep Dive - Rendering Pipeline Chart
(function(){
    function renderPipelineChart() {
        const ctx = document.getElementById('renderChart');
        if(!ctx) return;
        window.__dd_charts__.clearChart('renderChart');

        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Physics & Collision (CPU)', 'Entity Update (CPU)', 'Render/Draw Calls (GPU)', 'Garbage Collection', 'Game Logic (Audio/UI)'],
                datasets: [{
                    data: [45, 25, 20, 5, 5],
                    backgroundColor: ['#ef4444','#f59e0b','#3b82f6','#64748b','#10b981'],
                    borderWidth: 1,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { family: 'Inter', size: 12 },
                            color: '#475569',
                            usePointStyle: true,
                            padding: 20,
                            generateLabels: function(chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map(function(label, i) {
                                        const meta = chart.getDatasetMeta(0);
                                        const style = meta.controller.getStyle(i);
                                        return {
                                            text: `${label} (${data.datasets[0].data[i]}%)`,
                                            fillStyle: style.backgroundColor,
                                            hidden: false,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: Chiếm ${context.raw}% budget`;
                            }
                        }
                    }
                }
            }
        });

        window.__dd_charts__.setChart('renderChart', chart);
    }

    // expose globally for existing callers
    window.renderPipelineChart = renderPipelineChart;
})();
