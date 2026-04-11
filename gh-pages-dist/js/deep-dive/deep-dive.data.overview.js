(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.overview = {
        id: 'overview',
        title: '<span lang="vi">Phần 1: Tổng quan game</span><span lang="en">Part 1: Game overview</span>',
        icon: '🎮',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-2"><span lang="vi">Tổng quan & Phân tích Thể loại</span><span lang="en">Genre Overview & Analysis</span></h2>
                        <p class="text-slate-600 mb-8"><span lang="vi">Báo cáo phân tích chuyên sâu phục vụ tái tạo game "Bizarre Brigade" - một minigame dạng Auto-shooter/Roguelite (Vampire Survivors-like).</span><span lang="en">In-depth analysis report for recreating the game "Bizarre Brigade" - an Auto-shooter/Roguelite (Vampire Survivors-like) minigame.</span></p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-indigo-700"><span lang="vi">Đặc tả hệ thống cơ bản</span><span lang="en">Basic system specification</span></h3>
                                <ul class="space-y-3">
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong><span lang="vi">Thể loại:</span><span lang="en">Category:</span></strong> Roguelite Survival, Top-down Auto-shooter.</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong><span lang="vi">Góc nhìn:</span><span lang="en">Viewing angle:</span></strong> <span lang="vi">2D Top-down (hoặc Isometric pseudo-2D), góc camera cố định track theo người chơi.</span><span lang="en">2D Top-down (or Isometric pseudo-2D), fixed camera angle tracks the player.</span></div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Target Platform:</strong> <span lang="vi">PC/Console (chính), Mobile (hỗ trợ touch/virtual joystick).</span><span lang="en">PC/Console (main), Mobile (supports touch/virtual joystick).</span></div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong><span lang="vi">Nhịp độ (Pacing):</span><span lang="en">Pacing:</span></strong> <span lang="vi">Fast-paced, số lượng entity tăng theo cấp số nhân theo thời gian (Horde survival).</span><span lang="en">Fast-paced, the number of entities increases exponentially over time (Horde survival).</span></div></li>
                                </ul>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                <h3 class="font-bold text-lg mb-2 text-indigo-700 text-center">Core Gameplay Loop</h3>
                                <div class="bg-slate-50 rounded-lg p-4 font-mono text-sm text-center border border-slate-200">
                                    <div class="text-indigo-600 font-bold"><span lang="vi">1. Di chuyển (Né tránh/Gom quái)</span><span lang="en">1. Move (Dodge/Gather monsters)</span></div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-red-500 font-bold"><span lang="vi">2. Tự động tấn công (Auto-cast)</span><span lang="en">2. Auto-cast</span></div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-emerald-500 font-bold"><span lang="vi">3. Thu thập XP/Gems</span><span lang="en">3. Collect XP/Gems</span></div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-amber-500 font-bold"><span lang="vi">4. Level Up (Drafting Hệ thống Relic/Vũ khí)</span><span lang="en">4. Level Up (Drafting Relic Systems/Weapons)</span></div>
                                    <div class="text-slate-400 my-1"><span lang="vi">↻ (Lặp lại cho đến khi đánh Boss)</span><span lang="en">↻ (Repeat until boss fight)</span></div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 class="font-bold text-lg mb-4 text-center"><span lang="vi">Phân tích Thuộc tính Game</span><span lang="en">Game Attribute Analysis</span></h3>
                            <div class="chart-container">
                                <canvas id="overviewChart"></canvas>
                            </div>
                            <p class="text-sm text-slate-500 mt-4 text-center"><span lang="vi">Biểu đồ thể hiện trọng tâm phát triển: Tập trung cực mạnh vào Action và Entity Count, yêu cầu tối ưu hóa cao thay vì logic phức tạp.</span><span lang="en">The chart shows the development focus: Extremely strong focus on Action and Entity Count, requiring high optimization instead of complex logic.</span></p>
                        </div>
                    </div>
                `
    };
})();