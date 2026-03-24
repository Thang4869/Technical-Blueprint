(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.optimization = {
        id: 'optimization',
        title: 'Phần 6: Tối ưu Hiệu năng',
        icon: '🚀',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Chiến lược Tối ưu Hiệu năng (Bottleneck Resolution)</h2>
                        <p class="text-slate-600 mb-6">Game với hàng ngàn Entity sẽ chết ở bước "Collision Detection" và "Memory Allocation" nếu code không khéo.</p>

                        <!-- Accordion Items -->
                        <div class="space-y-4">
                            
                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group" open>
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    1. Spatial Partitioning (Chia lưới không gian)
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <p class="mb-2"><strong>Vấn đề:</strong> Quét va chạm 1000 quái vật vs 1000 viên đạn cần N*M = 1.000.000 phép tính mỗi frame.</p>
                                    <p class="mb-2"><strong>Giải pháp:</strong> <code>Grid-based Spatial Hashing</code>.</p>
                                    <ul class="list-disc pl-5">
                                        <li>Chia màn hình thành các ô lưới (Cell) kích thước bằng entity lớn nhất.</li>
                                        <li>Mỗi frame, map entity vào lưới tương ứng: <code>cell_x = x / cell_size</code></li>
                                        <li>Khi đạn bay qua cell nào, chỉ kiểm tra va chạm với các entity nằm trong cell đó hoặc 8 cell xung quanh. Đưa độ phức tạp về gần mức O(N).</li>
                                    </ul>
                                </div>
                            </details>

                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group">
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    2. Object Pooling (Bể chứa Object)
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <p class="mb-2"><strong>Vấn đề:</strong> <code>new Enemy()</code> và <code>Destroy(Enemy)</code> liên tục gây ra Garbage Collection spike, làm game khựng (stutter).</p>
                                    <p class="mb-2"><strong>Giải pháp:</strong></p>
                                    <ul class="list-disc pl-5 font-mono text-xs">
                                        <li>Khởi tạo sẵn Array 2000 Enemy lúc loading. Cờ active = false.</li>
                                        <li>Khi cần quái: Tìm quái inactive đầu tiên -> set vị trí -> active = true.</li>
                                        <li>Khi quái chết: Không xóa khỏi memory, chỉ set active = false.</li>
                                    </ul>
                                </div>
                            </details>

                            <details class="bg-white rounded-xl border border-slate-200 shadow-sm group">
                                <summary class="cursor-pointer font-bold p-4 bg-slate-50 rounded-t-xl hover:bg-slate-100">
                                    3. Data Structures & Math Optimization
                                </summary>
                                <div class="p-4 border-t border-slate-200 text-sm text-slate-700">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li><strong>Tránh tính Căn bậc 2 (Square Root):</strong> Khi so sánh khoảng cách để nhắm mục tiêu, dùng khoảng cách bình phương (<code>dist_sq = dx*dx + dy*dy</code>) thay vì <code>Math.sqrt()</code>.</li>
                                        <li><strong>Sử dụng mảng 1D (Flat Arrays):</strong> CPU đọc mảng 1D liên tục trong RAM nhanh hơn rất nhiều so với mảng của các Object phức tạp (nhảy con trỏ bộ nhớ).</li>
                                        <li><strong>C-Accelerated / Numpy:</strong> Nếu code bằng Python, đưa các vòng lặp tính vị trí hàng loạt vào thư viện numpy.</li>
                                    </ul>
                                </div>
                            </details>

                        </div>
                    </div>
                `
    };
})();