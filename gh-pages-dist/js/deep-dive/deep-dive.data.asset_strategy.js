(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.asset_strategy = {
        id: 'asset_strategy',
        title: '<span lang="vi">Phần 5: Chiến lược Asset</span><span lang="en">Part 5: Asset Strategy</span>',
        icon: '📦',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6"><span lang="vi">Chiến lược Asset (Hybrid Approach)</span><span lang="en">Asset Strategy (Hybrid Approach)</span></h2>
                        <p class="text-slate-600 mb-6"><span lang="vi">Để tối ưu quy trình phát triển (pipeline) và tiết kiệm dung lượng, hệ thống cần kết hợp giữa "Tạo ra bằng code" (Procedural) và "Tạo sẵn bằng tay" (Hand-crafted).</span><span lang="en">To optimize the development process (pipeline) and save space, the system needs to combine "Procedural" and "Hand-crafted".</span></p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Procedural -->
                            <div class="bg-white p-6 rounded-xl border-t-4 border-emerald-500 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-emerald-800"><span lang="vi">1. Generate bằng Code (Procedural/Runtime)</span><span lang="en">1. Generate by Code (Procedural/Runtime)</span></h3>
                                <ul class="space-y-4 text-sm text-slate-700">
                                    <li>
                                        <strong><span lang="vi">Terrain (Mặt đất):</span><span lang="en">Terrain (Ground):</span></strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Sử dụng OpenSimplex Noise hoặc Perlin Noise để trộn các Tile (Cỏ, Đất, Cát) tạo ra map vô tận một cách tự nhiên mà không tốn công vẽ map.</span><span lang="en">Use OpenSimplex Noise or Perlin Noise to mix Tiles (Grass, Soil, Sand) to naturally create endless maps without wasting the effort of drawing a map.</span></p>
                                    </li>
                                    <li>
                                        <strong>VFX & Particles:</strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Các hiệu ứng nổ, máu văng, tia lửa, hiệu ứng hút kinh nghiệm. Chỉ dùng các shape cơ bản (vuông, tròn nhỏ) và tính toán vật lý (gravity, fade out) trên GPU/Code.</span><span lang="en">Explosion effects, blood splashes, sparks, experience drain effects. Only use basic shapes (square, small circle) and physics calculations (gravity, fade out) on GPU/Code.</span></p>
                                    </li>
                                    <li>
                                        <strong><span lang="vi">Đạn đơn giản (Projectiles):</span><span lang="en">Simple bullets (Projectiles):</span></strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Laze, cầu lửa cơ bản có thể vẽ trực tiếp qua Primitives của engine, sau đó áp Bloom shader.</span><span lang="en">Lasers and basic fireballs can be drawn directly through the engine's Primitives, then apply the Bloom shader.</span></p>
                                    </li>
                                    <li>
                                        <strong><span lang="vi">Bảng màu động (Palettes):</span><span lang="en">Dynamic color palettes (Palettes):</span></strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Sử dụng shader để đổi màu quái vật (Palette Swap) biểu thị độ khó thay vì vẽ nhiều file png.</span><span lang="en">Use shaders to change monster color (Palette Swap) to indicate difficulty instead of drawing multiple png files.</span></p>
                                    </li>
                                </ul>
                            </div>

                            <!-- Manual -->
                            <div class="bg-white p-6 rounded-xl border-t-4 border-indigo-500 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-indigo-800"><span lang="vi">2. Asset tạo thủ công (Hand-crafted)</span><span lang="en">2. Hand-crafted assets</span></h3>
                                <ul class="space-y-4 text-sm text-slate-700">
                                    <li>
                                        <strong>Character Sprites (Player/Boss):</strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Các frame animation (Idle, Run, Attack) mang tính đặc trưng, cần Pixel artist vẽ tay (Aseprite) để đảm bảo chất lượng hình ảnh (Key visual).</span><span lang="en">The animation frames (Idle, Run, Attack) are unique and require hand-drawn Pixel artists (Aseprite) to ensure image quality (Key visual).</span></p>
                                    </li>
                                    <li>
                                        <strong>UI Icons (Relics/Weapons):</strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Biểu tượng trực quan trên menu Draft. Cần vẽ tay để người chơi dễ ghi nhớ.</span><span lang="en">Intuitive icons on the Draft menu. Needs to be hand drawn so players can easily remember.</span></p>
                                    </li>
                                    <li>
                                        <strong><span lang="vi">Background tĩnh (nếu có base camp):</span><span lang="en">Static background (if there is a base camp):</span></strong>
                                        <p class="text-slate-500 mt-1"><span lang="vi">Các khu vực có thiết kế đặc thù không thể random.</span><span lang="en">Areas with unique designs cannot be randomized.</span></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
    };
})();