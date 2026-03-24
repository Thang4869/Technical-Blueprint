(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.recreation = {
        id: 'recreation',
        title: 'Phần 7: Tái tạo (Recreation)',
        icon: '🔄',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Chiến lược Tái tạo (Recreation Strategy)</h2>
                        <p class="text-slate-600 mb-6">Xây dựng từng bước từ MVP (Minimum Viable Product) thay vì code toàn bộ tính năng cùng lúc.</p>

                        <div class="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm mb-6">
                            <h3 class="font-bold text-lg mb-3">MVP Scope (Version 0.1)</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="font-bold text-slate-700 border-b pb-1 mb-2">Bắt buộc có</h4>
                                    <ul class="list-none space-y-2 text-sm text-slate-600">
                                        <li><span class="text-emerald-500 mr-2">✔</span> Player di chuyển WASD mượt mà.</li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> 1 loại Enemy duy nhất (chạy theo player).</li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> 1 vũ khí auto-cast (VD: Bắn đạn ngẫu nhiên).</li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> Enemy chết rớt XP Gem.</li>
                                        <li><span class="text-emerald-500 mr-2">✔</span> Object Pooling cho Đạn & Enemy.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-700 border-b pb-1 mb-2">Tạm thời bỏ qua (Đơn giản hóa)</h4>
                                    <ul class="list-none space-y-2 text-sm text-slate-600">
                                        <li><span class="text-rose-500 mr-2">✖</span> Hoạt ảnh (Animation) phức tạp -> Dùng hình chữ nhật/Tròn có màu để test logic trước.</li>
                                        <li><span class="text-rose-500 mr-2">✖</span> Menu chính & Sound.</li>
                                        <li><span class="text-rose-500 mr-2">✖</span> Hệ thống trang bị đa dạng (Relic).</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-800 p-6 rounded-xl shadow-sm text-slate-100">
                            <h3 class="font-bold text-lg mb-4 text-amber-400">Mapping từ game gốc -> Hệ thống mới</h3>
                            <table class="w-full text-left text-sm">
                                <thead>
                                    <tr class="border-b border-slate-700 text-slate-400">
                                        <th class="pb-2">Yếu tố Bizarre Brigade</th>
                                        <th class="pb-2">Hệ thống lập trình tương ứng</th>
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