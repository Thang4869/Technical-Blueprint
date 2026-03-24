// Deep Dive - UI & Navigation
let currentTab = 'overview';

function initApp() {
    renderNav();
    switchTab('overview');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

function renderNav() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;
    navMenu.innerHTML = '';
    
    Object.values(reportData).forEach(item => {
        const btn = document.createElement('button');
        btn.className = `w-full text-left px-6 py-3 text-sm flex items-center transition-colors hover:bg-slate-50 ${currentTab === item.id ? 'nav-active' : 'text-slate-600'}`;
        btn.onclick = () => {
            switchTab(item.id);
            if(window.innerWidth < 768) toggleSidebar(); // Close sidebar on mobile
        };
        btn.innerHTML = `<span class="mr-3 text-lg">${item.icon}</span> <span class="truncate">${item.title}</span>`;
        navMenu.appendChild(btn);
    });
}

function switchTab(tabId) {
    currentTab = tabId;
    renderNav();
    
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    mainContent.innerHTML = reportData[tabId].content;

    // apply staggered entrance to items inside mainContent
    requestAnimationFrame(() => applyStagger(mainContent));

    // Trigger specific logic per view
    setTimeout(() => {
        if(tabId === 'overview') renderOverviewChart();
        if(tabId === 'rendering') renderPipelineChart();
    }, 50); // Small delay to let DOM render
}

function applyStagger(container) {
    if (!container) return;
    // find elements to stagger: charts and tech cards
    const items = container.querySelectorAll('.chart-container, .bg-white, .tech-card, .fade-in');
    items.forEach((el, i) => {
        el.classList.add('stagger-item');
        setTimeout(() => { el.classList.add('stagger-in'); }, i * 80);
    });
    // remove classes after animation to keep DOM clean
    setTimeout(() => {
        items.forEach(el => el.classList.remove('stagger-item'));
    }, Math.min(2000, items.length * 120 + 600));
}