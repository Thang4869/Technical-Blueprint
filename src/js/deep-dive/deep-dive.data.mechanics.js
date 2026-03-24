(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.mechanics = {
        id: 'mechanics',
        title: 'Phần 2: Gameplay Mechanics',
        icon: '⚙',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Chi tiết Cơ chế Gameplay</h2>
                        
                        <div class="space-y-6">
                            <!-- Movement -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mr-4">🏃</div>
                                    <h3 class="text-xl font-bold">Movement System</h3>
                                </div>
                                <p class="text-slate-600 mb-3">Hệ thống di chuyển tự do 2D (Free movement), không bị giới hạn bởi grid. Trọng tâm là sự mượt mà.</p>
                                <ul class="list-disc pl-5 text-slate-700 space-y-1">
                                    <li><strong>Input:</strong> Vector2 normalized (WASD hoặc Virtual Joystick).</li>
                                    <li><strong>Physics:</strong> Kinematic body. Xử lý va chạm đơn giản (AABB hoặc Circle vs Circle) giữa Player và Environment (tường bao). <em>Va chạm Player - Enemy thường không chặn đường (non-blocking) mà chỉ tính hitbox trừ máu.</em></li>
                                    <li><strong>Implement:</strong> <code>position += velocity * speed * deltaTime</code>.</li>
                                </ul>
                            </div>

                            <!-- Combat -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold mr-4">⚔</div>
                                    <h3 class="text-xl font-bold">Combat System (Vũ khí & Kỹ năng)</h3>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-slate-50 p-4 rounded border border-slate-200">
                                        <h4 class="font-bold text-slate-800 mb-2">Auto-cast & Cooldown</h4>
                                        <p class="text-sm text-slate-600">Vũ khí kích hoạt tự động dựa trên timer nội bộ. Mỗi vũ khí duy trì state: Cooldown, Casting, Active.</p>
                                    </div>
                                    <div class="bg-slate-50 p-4 rounded border border-slate-200">
                                        <h4 class="font-bold text-slate-800 mb-2">Targeting System</h4>
                                        <p class="text-sm text-slate-600">Thuật toán tìm mục tiêu: Gần nhất (Nearest), Máu cao nhất (Highest HP), Ngẫu nhiên (Random), hoặc theo Hướng di chuyển.</p>
                                    </div>
                                </div>
                                <p class="mt-4 text-sm text-slate-700 font-mono bg-slate-100 p-2 rounded"><strong>Projectile Pipeline:</strong> Spawn (từ Object Pool) -> Update (Di chuyển/Quỹ đạo) -> Check Collision (Overlap box/circle) -> Apply Damage (Trigger on-hit effect) -> Return to Pool.</p>
                            </div>

                            <!-- AI -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold mr-4">👾</div>
                                    <h3 class="text-xl font-bold">Enemy AI & Behavior</h3>
                                </div>
                                <p class="text-slate-600 mb-3">AI đơn giản nhưng số lượng lớn. Không dùng Pathfinding (A*) phức tạp để tiết kiệm CPU.</p>
                                <ul class="list-disc pl-5 text-slate-700 space-y-1 mb-3">
                                    <li><strong>Steering Behaviors:</strong> Chủ yếu dùng "Seek" (hướng thẳng đến Player).</li>
                                    <li><strong>Swarming:</strong> Áp dụng bầy đàn nhẹ (Separation) để tránh việc hàng trăm quái vật tụ lại thành 1 điểm pixel duy nhất.</li>
                                    <li><strong>State Machine (FSM):</strong> Spawn (animation) -> Chase (seek player) -> Attack (nếu player trong range) -> Die (drop XP, play effect).</li>
                                </ul>
                            </div>

                            <!-- Progression & UI -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="text-lg font-bold mb-3 border-b pb-2">Progression (Leveling)</h3>
                                    <p class="text-sm text-slate-600">
                                        Thu thập XP Gem -> Thanh XP đầy -> Trigger <code>GameState.PAUSED</code> -> Hiện UI Draft -> Chọn 1 trong 3/4 Relic hoặc Vũ khí (RNG roll có trọng số) -> Apply Modifier -> Resume game.
                                    </p>
                                </div>
                                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="text-lg font-bold mb-3 border-b pb-2">UI / UX Feedback</h3>
                                    <p class="text-sm text-slate-600">
                                        <strong>Floating Damage Text:</strong> Dùng object pool, tweening bay lên và mờ dần.
                                        <br><strong>Screen Shake & Hit Stop:</strong> Cung cấp lực đánh (impact) khi tiêu diệt boss hoặc dính đòn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    };
})();