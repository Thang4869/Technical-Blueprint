(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.rendering = {
        id: 'rendering',
        title: 'Phần 4: Rendering Pipeline',
        icon: '🎨',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Rendering & Asset Pipeline</h2>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 flex items-center"><span class="mr-2 text-indigo-500">🖼</span> Asset Strategy (Texture Atlas)</h3>
                                <p class="text-slate-600 text-sm mb-4">Với hàng ngàn sprite, việc bind/unbind texture mỗi frame cho từng object sẽ bóp nghẹt GPU. Cần gom toàn bộ sprite vào chung một <strong>Texture Atlas (Sprite Sheet)</strong>.</p>
                                <ul class="list-disc pl-5 text-sm text-slate-700 space-y-2">
                                    <li>Generate assets 1 lần lúc loading screen.</li>
                                    <li>Lưu dưới dạng Texture Map duy nhất.</li>
                                    <li>Render bằng UV Coordinates thay vì load file riêng lẻ.</li>
                                </ul>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 flex items-center"><span class="mr-2 text-indigo-500">⚡</span> Batch Rendering</h3>
                                <p class="text-slate-600 text-sm mb-4">Thay vì gọi lệnh Draw cho từng XP Gem, đẩy toàn bộ vị trí/UV của các gem cùng loại vào một Vertex Array/VBO và gọi Draw 1 lần duy nhất (Instanced Rendering).</p>
                                <div class="bg-slate-100 p-2 rounded text-xs font-mono">
                                    // BAD: <br>
                                    for gem in gems: draw(gem)<br><br>
                                    // GOOD: <br>
                                    draw_instanced(gem_mesh, gem_positions_array)
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                            <h3 class="font-bold text-lg mb-4 text-center">CPU/GPU Budget Phân bố (Ước tính)</h3>
                            <div class="chart-container">
                                <canvas id="renderChart"></canvas>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                            <h3 class="font-bold text-lg mb-2">Pixel-Art Constraints (Rất quan trọng)</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                                <div>
                                    <strong class="block text-slate-900 mb-1">1. Integer Scaling:</strong>
                                    Render canvas ở độ phân giải thấp nội bộ (VD: 320x180), sau đó scale up lên màn hình (VD: x4 = 1280x720) để tránh vỡ pixel.
                                </div>
                                <div>
                                    <strong class="block text-slate-900 mb-1">2. NEAREST Filtering:</strong>
                                    Luôn tắt Linear Interpolation / Anti-aliasing khi render textures (Sử dụng <code>GL_NEAREST</code> hoặc cờ tương đương trong toolchain).
                                </div>
                                <div>
                                    <strong class="block text-slate-900 mb-1">3. Sub-pixel Movement:</strong>
                                    Logic game tính bằng float, nhưng khi truyền tọa độ vào Render Camera, phải <code>Math.floor()</code> hoặc <code>Math.round()</code> để tránh jitter.
                                </div>
                            </div>
                        </div>
                        
                        <!-- Toolchain Suggestion -->
                        <div class="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <strong class="text-slate-800">Toolchain Đề xuất:</strong> 
                            Engine: <code>pygame-ce / arcade (Python)</code> hoặc <code>Phaser (JS/Web)</code> | 
                            Hình ảnh: <code>Pillow / Canvas API</code> để generate, <code>Aseprite</code> làm key sprite. | 
                            Math: <code>numpy</code> (nếu Python).
                        </div>
                    </div>
                `
    };
})();