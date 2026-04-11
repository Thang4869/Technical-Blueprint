(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.optimization = {
        id: 'optimization',
        title: '<span lang="vi">Phần 6: Tối ưu Hiệu năng</span><span lang="en">Part 6: Optimizing Performance</span>',
        icon: '🚀',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6"><span lang="vi">Chiến lược Tối ưu Hiệu năng (Bottleneck Resolution)</span><span lang="en">Bottleneck Resolution Strategy</span></h2>
                        <p class="text-slate-600 mb-6"><span lang="vi">Game với hàng ngàn Entity sẽ chết ở bước "Collision Detection" và "Memory Allocation" nếu code không khéo.</span><span lang="en">Games with thousands of Entities will die at the "Collision Detection" and "Memory Allocation" steps if the code is not skillful.</span></p>

                        <!-- Accordion Items -->
                        <div class="space-y-4">
                            
                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group" open>
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    <span lang="vi">1. Spatial Partitioning (Chia lưới không gian)</span><span lang="en">1. Spatial Partitioning (Spatial meshing)</span>
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <p class="mb-2"><strong><span lang="vi">Vấn đề:</span><span lang="en">Problem:</span></strong> <span lang="vi">Quét va chạm 1000 quái vật vs 1000 viên đạn cần N*M = 1.000.000 phép tính mỗi frame.</span><span lang="en">Collision scanning of 1000 monsters vs 1000 bullets requires N*M = 1,000,000 calculations per frame.</span></p>
                                    <p class="mb-2"><strong><span lang="vi">Giải pháp:</span><span lang="en">Solution:</span></strong> <code>Grid-based Spatial Hashing</code>.</p>
                                    <ul class="list-disc pl-5">
                                        <li><span lang="vi">Chia màn hình thành các ô lưới (Cell) kích thước bằng entity lớn nhất.</span><span lang="en">Divide the screen into grid cells the size of the largest entity.</span></li>
                                        <li><span lang="vi">Mỗi frame, map entity vào lưới tương ứng:</span><span lang="en">Each frame, map the entity to the corresponding grid:</span> <code>cell_x = x / cell_size</code></li>
                                        <li><span lang="vi">Khi đạn bay qua cell nào, chỉ kiểm tra va chạm với các entity nằm trong cell đó hoặc 8 cell xung quanh. Đưa độ phức tạp về gần mức O(N).</span><span lang="en">When a bullet passes through a cell, only check for collisions with entities located in that cell or the 8 surrounding cells. Bring complexity close to O(N).</span></li>
                                    </ul>
                                </div>
                            </details>

                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group">
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    <span lang="vi">2. Object Pooling (Bể chứa Object)</span><span lang="en">2. Object Pooling (Object Pooling)</span>
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <p class="mb-2"><strong><span lang="vi">Vấn đề:</span><span lang="en">Problem:</span></strong> <code>new Enemy()</code> <span lang="vi">và</span><span lang="en">and</span> <code>Destroy(Enemy)</code> <span lang="vi">liên tục gây ra Garbage Collection spike, làm game khựng (stutter).</span><span lang="en">Continuously causes Garbage Collection spike, causing the game to stall.</span></p>
                                    <p class="mb-2"><strong><span lang="vi">Giải pháp:</span><span lang="en">Solution:</span></strong></p>
                                    <ul class="list-disc pl-5 font-mono text-xs">
                                        <li><span lang="vi">Khởi tạo sẵn Array 2000 Enemy lúc loading. Cờ active = false.</span><span lang="en">Initialize Array 2000 Enemy at loading. Flag active = false.</span></li>
                                        <li><span lang="vi">Khi cần quái: Tìm quái inactive đầu tiên -> set vị trí -> active = true.</span><span lang="en">When you need monsters: Find the first inactive monster -> set position -> active = true.</span></li>
                                        <li><span lang="vi">Khi quái chết: Không xóa khỏi memory, chỉ set active = false.</span><span lang="en">When a monster dies: Do not delete from memory, only set active = false.</span></li>
                                    </ul>
                                </div>
                            </details>

                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group">
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    3. Data Structures & Math Optimization
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li><strong><span lang="vi">Tránh tính Căn bậc 2 (Square Root):</span><span lang="en">Avoid calculating Square Root:</span></strong> <span lang="vi">Khi so sánh khoảng cách để nhắm mục tiêu, dùng khoảng cách bình phương (</span><span lang="en">When comparing distances for targeting, use the squared distance (</span><code>dist_sq = dx*dx + dy*dy</code><span lang="vi">) thay vì</span><span lang="en">) instead of</span> <code>Math.sqrt()</code>.</li>
                                        <li><strong><span lang="vi">Sử dụng mảng 1D (Flat Arrays):</span><span lang="en">Using 1D arrays (Flat Arrays):</span></strong> <span lang="vi">CPU đọc mảng 1D liên tục trong RAM nhanh hơn rất nhiều so với mảng của các Object phức tạp (nhảy con trỏ bộ nhớ).</span><span lang="en">The CPU reads a continuous 1D array in RAM much faster than an array of complex Objects (jumping memory pointers).</span></li>
                                        <li><strong>C-Accelerated / Numpy:</strong> <span lang="vi">Nếu code bằng Python, đưa các vòng lặp tính vị trí hàng loạt vào thư viện numpy.</span><span lang="en">If coding in Python, include batch position calculation loops in the numpy library.</span></li>
                                    </ul>
                                </div>
                            </details>

                        </div>
                    </div>
                `
    };
})();