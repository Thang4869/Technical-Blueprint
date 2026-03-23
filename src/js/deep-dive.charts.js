// Deep Dive - Charts
let chartsInstance = {}; // Store chart instances to destroy them properly

function clearChart(id) {
    if (chartsInstance[id]) {
        try { chartsInstance[id].destroy(); } catch(e){}
        chartsInstance[id] = null;
    }
}

function renderOverviewChart() {
    const ctx = document.getElementById('overviewChart');
    if(!ctx) return;
    clearChart('overviewChart');

    chartsInstance['overviewChart'] = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Entity Count', 'Fast-Pacing', 'Player Skill (Dodge)', 'Tactical Strategy', 'Story/Narrative', 'RNG Dependency'],
            datasets: [{
                label: 'Bizarre Brigade Attributes',
                data: [9.5, 8.5, 7.0, 6.0, 2.0, 8.0],
                backgroundColor: 'rgba(79, 70, 229, 0.2)', // Indigo
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
}

function renderPipelineChart() {
    const ctx = document.getElementById('renderChart');
    if(!ctx) return;
    clearChart('renderChart');

    chartsInstance['renderChart'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Physics & Collision (CPU)', 'Entity Update (CPU)', 'Render/Draw Calls (GPU)', 'Garbage Collection', 'Game Logic (Audio/UI)'],
            datasets: [{
                data: [45, 25, 20, 5, 5],
                backgroundColor: [
                    '#ef4444', // Red (Danger)
                    '#f59e0b', // Amber
                    '#3b82f6', // Blue
                    '#64748b', // Slate
                    '#10b981'  // Emerald
                ],
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
}