(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.overview = {
        id: 'overview',
        title: 'Phần 1: Tổng quan game',
        icon: '🎮',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-2">Tổng quan & Phân tích Thể loại</h2>
                        <p class="text-slate-600 mb-8">Báo cáo phân tích chuyên sâu phục vụ tái tạo game "Bizarre Brigade" - một minigame dạng Auto-shooter/Roguelite (Vampire Survivors-like).</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-indigo-700">Đặc tả hệ thống cơ bản</h3>
                                <ul class="space-y-3">
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Thể loại:</strong> Roguelite Survival, Top-down Auto-shooter.</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Góc nhìn:</strong> 2D Top-down (hoặc Isometric pseudo-2D), góc camera cố định track theo người chơi.</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Target Platform:</strong> PC/Console (chính), Mobile (hỗ trợ touch/virtual joystick).</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Nhịp độ (Pacing):</strong> Fast-paced, số lượng entity tăng theo cấp số nhân theo thời gian (Horde survival).</div></li>
                                </ul>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                <h3 class="font-bold text-lg mb-2 text-indigo-700 text-center">Core Gameplay Loop</h3>
                                <div class="bg-slate-50 rounded-lg p-4 font-mono text-sm text-center border border-slate-200">
                                    <div class="text-indigo-600 font-bold">1. Di chuyển (Né tránh/Gom quái)</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-red-500 font-bold">2. Tự động tấn công (Auto-cast)</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-emerald-500 font-bold">3. Thu thập XP/Gems</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-amber-500 font-bold">4. Level Up (Drafting Hệ thống Relic/Vũ khí)</div>
                                    <div class="text-slate-400 my-1">↻ (Lặp lại cho đến khi đánh Boss)</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 class="font-bold text-lg mb-4 text-center">Phân tích Thuộc tính Game</h3>
                            <div class="chart-container">
                                <canvas id="overviewChart"></canvas>
                            </div>
                            <p class="text-sm text-slate-500 mt-4 text-center">Biểu đồ thể hiện trọng tâm phát triển: Tập trung cực mạnh vào Action và Entity Count, yêu cầu tối ưu hóa cao thay vì logic phức tạp.</p>
                        </div>
                    </div>
                `
    };
})();