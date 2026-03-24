import { wrapLabel } from './charts.helpers.js';
import { tooltipConfig } from './charts.tooltip.js';

export function initCharts() {
    try {
        const dnaLabels = [
            'Mật độ Quái vật (Entity Count)', 
            'Tốc độ Nhịp game (Pacing)', 
            'Kỹ năng Người chơi (Né tránh)', 
            'Tính Chiến thuật (Drafting)', 
            'Cốt truyện (Narrative)', 
            'Phụ thuộc RNG (May rủi)'
        ].map(wrapLabel);

        const ctxDnaEl = document.getElementById('dnaChart');
        if (ctxDnaEl) {
            const ctxDna = ctxDnaEl.getContext('2d');
            new Chart(ctxDna, {
                type: 'radar',
                data: {
                    labels: dnaLabels,
                    datasets: [{
                        label: 'Điểm Đặc Tính',
                        data: [9.5, 8.5, 7.0, 6.0, 2.0, 8.0],
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        borderColor: '#4f46e5',
                        pointBackgroundColor: '#4f46e5',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#4f46e5',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { r: { angleLines: { color: 'rgba(0,0,0,0.1)' }, grid: { color: 'rgba(0,0,0,0.1)' }, pointLabels: { font: { family: 'Inter', size: 12, weight: '600' }, color: '#475569' }, ticks: { display: false, min: 0, max: 10 } } },
                    plugins: { legend: { display: false }, tooltip: tooltipConfig }
                }
            });
        }

        const budgetLabels = [
            'Phát hiện Va chạm & Vật lý (CPU)',
            'Cập nhật Behavior AI (CPU)',
            'Lệnh Vẽ Render Batching (GPU)',
            'Dọn Rác Bộ Nhớ (GC)',
            'Logic Khác (UI/Audio)'
        ].map(wrapLabel);

        const ctxBudgetEl = document.getElementById('budgetChart');
        if (ctxBudgetEl) {
            const ctxBudget = ctxBudgetEl.getContext('2d');
            new Chart(ctxBudget, {
                type: 'doughnut',
                data: { labels: budgetLabels, datasets: [{ data: [45,25,20,5,5], backgroundColor: ['#e11d48','#f59e0b','#38bdf8','#94a3b8','#10b981'], borderWidth: 2, borderColor: '#ffffff', hoverOffset: 10 }] },
                options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'right', labels: { font: { family: 'Inter', size: 12 }, color: '#475569', usePointStyle: true, padding: 20 } }, tooltip: tooltipConfig } }
            });
        }

        const optLabels = [
            'Không Tối Ưu (Brute Force 1000 quái)',
            'Áp dụng Chia Lưới Không Gian (Spatial Grid)',
            'Hoàn thiện (Grid + Object Pooling + Batching)'
        ].map(wrapLabel);

        const ctxOptEl = document.getElementById('optimizationChart');
        if (ctxOptEl) {
            const ctxOpt = ctxOptEl.getContext('2d');
            new Chart(ctxOpt, {
                type: 'bar',
                data: { labels: optLabels, datasets: [{ label: 'Thời gian Render 1 Frame (ms)', data: [125.4, 28.5, 12.2], backgroundColor: ['rgba(225,29,72,0.8)','rgba(245,158,11,0.8)','rgba(16,185,129,0.8)'], borderColor: ['#e11d48','#f59e0b','#10b981'], borderWidth: 1, borderRadius: 4 }] },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Milliseconds (ms)', color: '#64748b' }, grid: { color: 'rgba(0,0,0,0.05)' } }, x: { grid: { display: false }, ticks: { font: { family: 'Inter' }, color: '#475569' } } }, plugins: { legend: { display: false }, tooltip: tooltipConfig } }
            });
        }
    } catch (e) {
        console.error('Chart init error', e);
    }
}

export default initCharts;