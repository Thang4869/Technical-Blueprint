(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.rendering = {
        id: 'rendering',
        title: '<span lang="vi">Phần 4: Rendering Pipeline</span><span lang="en">Part 4: Rendering Pipeline</span>',
        icon: '🎨',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Rendering & Asset Pipeline</h2>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 flex items-center"><span class="mr-2 text-indigo-500">🖼</span> Asset Strategy (Texture Atlas)</h3>
                                <p class="text-slate-600 text-sm mb-4"><span lang="vi">Với hàng ngàn sprite, việc bind/unbind texture mỗi frame cho từng object sẽ bóp nghẹt GPU. Cần gom toàn bộ sprite vào chung một</span><span lang="en">With thousands of sprites, binding/unbind textures per frame for each object will choke the GPU. Need to combine all sprites into one</span> <strong>Texture Atlas (Sprite Sheet)</strong>.</p>
                                <ul class="list-disc pl-5 text-sm text-slate-700 space-y-2">
                                    <li><span lang="vi">Generate assets 1 lần lúc loading screen.</span><span lang="en">Generate assets once at loading screen.</span></li>
                                    <li><span lang="vi">Lưu dưới dạng Texture Map duy nhất.</span><span lang="en">Save as a single Texture Map.</span></li>
                                    <li><span lang="vi">Render bằng UV Coordinates thay vì load file riêng lẻ.</span><span lang="en">Render using UV Coordinates instead of loading individual files.</span></li>
                                </ul>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 flex items-center"><span class="mr-2 text-indigo-500">⚡</span> Batch Rendering</h3>
                                <p class="text-slate-600 text-sm mb-4"><span lang="vi">Thay vì gọi lệnh Draw cho từng XP Gem, đẩy toàn bộ vị trí/UV của các gem cùng loại vào một Vertex Array/VBO và gọi Draw 1 lần duy nhất (Instanced Rendering).</span><span lang="en">Instead of calling Draw for each XP Gem, push all the positions/UVs of gems of the same type into a Vertex Array/VBO and call Draw only once (Instanced Rendering).</span></p>
                                <div class="bg-slate-100 p-2 rounded text-xs font-mono">
                                    // BAD: <br>
                                    for gem in gems: draw(gem)<br><br>
                                    // GOOD: <br>
                                    draw_instanced(gem_mesh, gem_positions_array)
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                            <h3 class="font-bold text-lg mb-4 text-center"><span lang="vi">CPU/GPU Budget Phân bố (Ước tính)</span><span lang="en">CPU/GPU Budget Distribution (Estimated)</span></h3>
                            <div class="chart-container">
                                <canvas id="renderChart"></canvas>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                            <h3 class="font-bold text-lg mb-2"><span lang="vi">Pixel-Art Constraints (Rất quan trọng)</span><span lang="en">Pixel-Art Constraints (Very important)</span></h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
                                <div>
                                    <strong class="block text-slate-900 mb-1">1. Integer Scaling:</strong>
                                    <span lang="vi">Render canvas ở độ phân giải thấp nội bộ (VD: 320x180), sau đó scale up lên màn hình (VD: x4 = 1280x720) để tránh vỡ pixel.</span><span lang="en">Render the canvas at a low internal resolution (eg: 320x180), then scale it up to the screen (eg: x4 = 1280x720) to avoid pixel breakage.</span>
                                </div>
                                <div>
                                    <strong class="block text-slate-900 mb-1">2. NEAREST Filtering:</strong>
                                    <span lang="vi">Luôn tắt Linear Interpolation / Anti-aliasing khi render textures (Sử dụng</span><span lang="en">Always turn off Linear Interpolation / Anti-aliasing when rendering textures (Use</span> <code>GL_NEAREST</code> <span lang="vi">hoặc cờ tương đương trong toolchain).</span><span lang="en">or equivalent flags in the toolchain).</span>
                                </div>
                                <div>
                                    <strong class="block text-slate-900 mb-1">3. Sub-pixel Movement:</strong>
                                    <span lang="vi">Logic game tính bằng float, nhưng khi truyền tọa độ vào Render Camera, phải</span><span lang="en">Game logic is in float, but when passing coordinates to Render Camera, right</span> <code>Math.floor()</code> hoặc <code>Math.round()</code> <span lang="vi">để tránh jitter.</span><span lang="en">to avoid jitter.</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Toolchain Suggestion -->
                        <div class="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <strong class="text-slate-800"><span lang="vi">Toolchain Đề xuất:</span><span lang="en">Toolchain Recommended:</span></strong> 
                            Engine: <code>pygame-ce / arcade (Python)</code> hoặc <code>Phaser (JS/Web)</code> <span lang="vi">| 
                            Hình ảnh:</span><span lang="en">| 
                            Image:</span> <code>Pillow / Canvas API</code> <span lang="vi">để generate,</span><span lang="en">to generate,</span> <code>Aseprite</code> <span lang="vi">làm key sprite. | 
                            Math:</span><span lang="en">make key sprite. | 
                            Math:</span> <code>numpy</code> <span lang="vi">(nếu Python).</span><span lang="en">(if Python).</span>
                        </div>
                    </div>
                `
    };
})();