(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.asset_strategy = {
        id: 'asset_strategy',
        title: 'Phần 5: Chiến lược Asset',
        icon: '📦',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Chiến lược Asset (Hybrid Approach)</h2>
                        <p class="text-slate-600 mb-6">Để tối ưu quy trình phát triển (pipeline) và tiết kiệm dung lượng, hệ thống cần kết hợp giữa "Tạo ra bằng code" (Procedural) và "Tạo sẵn bằng tay" (Hand-crafted).</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Procedural -->
                            <div class="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-emerald-800">1. Generate bằng Code (Procedural/Runtime)</h3>
                                <ul class="space-y-4 text-sm text-slate-700">
                                    <li>
                                        <strong>Terrain (Mặt đất):</strong>
                                        <p class="text-slate-500 mt-1">Sử dụng OpenSimplex Noise hoặc Perlin Noise để trộn các Tile (Cỏ, Đất, Cát) tạo ra map vô tận một cách tự nhiên mà không tốn công vẽ map.</p>
                                    </li>
                                    <li>
                                        <strong>VFX & Particles:</strong>
                                        <p class="text-slate-500 mt-1">Các hiệu ứng nổ, máu văng, tia lửa, hiệu ứng hút kinh nghiệm. Chỉ dùng các shape cơ bản (vuông, tròn nhỏ) và tính toán vật lý (gravity, fade out) trên GPU/Code.</p>
                                    </li>
                                    <li>
                                        <strong>Đạn đơn giản (Projectiles):</strong>
                                        <p class="text-slate-500 mt-1">Laze, cầu lửa cơ bản có thể vẽ trực tiếp qua Primitives của engine, sau đó áp Bloom shader.</p>
                                    </li>
                                    <li>
                                        <strong>Bảng màu động (Palettes):</strong>
                                        <p class="text-slate-500 mt-1">Sử dụng shader để đổi màu quái vật (Palette Swap) biểu thị độ khó thay vì vẽ nhiều file png.</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- Manual -->
                            <div class="bg-white p-6 rounded-xl border-t-4 border-indigo-500 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-indigo-800">2. Asset tạo thủ công (Hand-crafted)</h3>
                                <ul class="space-y-4 text-sm text-slate-700">
                                    <li>
                                        <strong>Character Sprites (Player/Boss):</strong>
                                        <p class="text-slate-500 mt-1">Các frame animation (Idle, Run, Attack) mang tính đặc trưng, cần Pixel artist vẽ tay (Aseprite) để đảm bảo chất lượng hình ảnh (Key visual).</p>
                                    </li>
                                    <li>
                                        <strong>UI Icons (Relics/Weapons):</strong>
                                        <p class="text-slate-500 mt-1">Biểu tượng trực quan trên menu Draft. Cần vẽ tay để người chơi dễ ghi nhớ.</p>
                                    </li>
                                    <li>
                                        <strong>Background tĩnh (nếu có base camp):</strong>
                                        <p class="text-slate-500 mt-1">Các khu vực có thiết kế đặc thù không thể random.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
    };
})();