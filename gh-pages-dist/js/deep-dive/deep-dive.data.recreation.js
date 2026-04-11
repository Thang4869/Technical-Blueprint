(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.recreation = {
        id: 'recreation',
        title: '<span lang="vi">Phần 7: Tái tạo (Recreation)</span><span lang="en">Part 7: Recreation</span>',
        icon: '🔄',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6"><span lang="vi">Chiến lược Tái tạo (Recreation Strategy)</span><span lang="en">Recovery Strategy</span></h2>
                        <p class="text-slate-600 mb-6"><span lang="vi">Xây dựng từng bước từ MVP (Minimum Viable Product) thay vì code toàn bộ tính năng cùng lúc.</span><span lang="en">Build step by step from MVP (Minimum Viable Product) instead of coding the entire feature at once.</span></p>

                        <div class="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm mb-6">
                            <h3 class="font-bold text-lg mb-3">MVP Scope (Version 0.1)</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="font-bold text-slate-700 border-b pb-1 mb-2"><span lang="vi">Bắt buộc có</span><span lang="en">Must have</span></h4>
                                    <ul class="list-none space-y-2 text-sm text-slate-600">
                                        <li><span class="text-emerald-500 mr-2">✔</span> <span lang="vi">Player di chuyển WASD mượt mà.</span><span lang="en">Player moves WASD smoothly.</span></li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> <span lang="vi">1 loại Enemy duy nhất (chạy theo player).</span><span lang="en">1 unique type of Enemy (runs after the player).</span></li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> <span lang="vi">1 vũ khí auto-cast (VD: Bắn đạn ngẫu nhiên).</span><span lang="en">1 auto-cast weapon (eg: Shoots random bullets).</span></li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> <span lang="vi">Enemy chết rớt XP Gem.</span><span lang="en">Enemy death drops XP Gem.</span></li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> <span lang="vi">Object Pooling cho Đạn & Enemy.</span><span lang="en">Object Pooling for Bullets & Enemy.</span></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-700 border-b pb-1 mb-2"><span lang="vi">Tạm thời bỏ qua (Đơn giản hóa)</span><span lang="en">Ignore for now (Simplify)</span></h4>
                                    <ul class="list-none space-y-2 text-sm text-slate-600">
                                        <li><span class="text-rose-500 mr-2">✖</span> <span lang="vi">Hoạt ảnh (Animation) phức tạp -> Dùng hình chữ nhật/Tròn có màu để test logic trước.</span><span lang="en">Complex Animation -> Use colored rectangles/circles to test logic first.</span></li>
                                        <li><span class="text-rose-500 mr-2">✖</span> <span lang="vi">Menu chính & Sound.</span><span lang="en">Main Menu & Sound.</span></li>
                                        <li><span class="text-rose-500 mr-2">✖</span> <span lang="vi">Hệ thống trang bị đa dạng (Relic).</span><span lang="en">Diverse equipment system (Relic).</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-xl shadow-sm text-slate-100">
                            <h3 class="font-bold text-lg mb-4 text-amber-400"><span lang="vi">Mapping từ game gốc -> Hệ thống mới</span><span lang="en">Mapping from the original game -> New system</span></h3>
                            <table class="w-full text-left text-sm">
                                <thead>
                                    <tr class="border-b border-slate-700 text-slate-400">
                                        <th class="pb-2"><span lang="vi">Yếu tố Bizarre Brigade</span><span lang="en">Bizarre Brigade element</span></th>
                                        <th class="pb-2"><span lang="vi">Hệ thống lập trình tương ứng</span><span lang="en">Corresponding programming system</span></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-700/50">
                                    <tr><td class="py-2">Companions / Dream Seekers</td><td class="py-2 font-mono text-emerald-300">WeaponComponent + AutoTargetSystem</td></tr>
                                    <tr><td class="py-2">Relics (Passive buff)</td><td class="py-2 font-mono text-emerald-300">ModifierData + StatCalculationSystem</td></tr>
                                    <tr><td class="py-2">Hordes of Enemies</td><td class="py-2 font-mono text-emerald-300">ObjectPool + SpatialGridHash + BatchRender</td></tr>
                                    <tr><td class="py-2">Level Up Draft UI</td><td class="py-2 font-mono text-emerald-300">GameState.PAUSE + UIManager.ShowDraft()</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
    };
})();