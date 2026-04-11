(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.mechanics = {
        id: 'mechanics',
        title: '<span lang="vi">Phần 2: Gameplay Mechanics</span><span lang="en">Part 2: Gameplay Mechanics</span>',
        icon: '⚙',
        content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6"><span lang="vi">Chi tiết Cơ chế Gameplay</span><span lang="en">Details of Gameplay Mechanics</span></h2>
                        
                        <div class="space-y-6">
                            <!-- Movement -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold mr-4">🏃</div>
                                    <h3 class="text-xl font-bold">Movement System</h3>
                                </div>
                                <p class="text-slate-600 mb-3"><span lang="vi">Hệ thống di chuyển tự do 2D (Free movement), không bị giới hạn bởi grid. Trọng tâm là sự mượt mà.</span><span lang="en">2D free movement system (Free movement), not limited by grid. The focus is on smoothness.</span></p>
                                <ul class="list-disc pl-5 text-slate-700 space-y-1">
                                    <li><strong>Input:</strong> Vector2 normalized (WASD hoặc Virtual Joystick).</li>
                                    <li><strong>Physics:</strong> <span lang="vi">Kinematic body. Xử lý va chạm đơn giản (AABB hoặc Circle vs Circle) giữa Player và Environment (tường bao).</span><span lang="en">Kinetic body. Simple collision handling (AABB or Circle vs Circle) between Player and Environment (boundary).</span> <em><span lang="vi">Va chạm Player - Enemy thường không chặn đường (non-blocking) mà chỉ tính hitbox trừ máu.</span><span lang="en">Player - Enemy collisions usually do not block the path (non-blocking) but only count the hitbox minus health.</span></em></li>
                                    <li><strong>Implement:</strong> <code>position += velocity * speed * deltaTime</code>.</li>
                                </ul>
                            </div>

                            <!-- Combat -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold mr-4">⚔</div>
                                    <h3 class="text-xl font-bold"><span lang="vi">Combat System (Vũ khí & Kỹ năng)</span><span lang="en">Combat System (Weapons & Skills)</span></h3>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="bg-slate-50 p-4 rounded border border-slate-200">
                                        <h4 class="font-bold text-slate-800 mb-2">Auto-cast & Cooldown</h4>
                                        <p class="text-sm text-slate-600"><span lang="vi">Vũ khí kích hoạt tự động dựa trên timer nội bộ. Mỗi vũ khí duy trì state: Cooldown, Casting, Active.</span><span lang="en">Weapons activate automatically based on internal timer. Each weapon maintains states: Cooldown, Casting, Active.</span></p>
                                    </div>
                                    <div class="bg-slate-50 p-4 rounded border border-slate-200">
                                        <h4 class="font-bold text-slate-800 mb-2">Targeting System</h4>
                                        <p class="text-sm text-slate-600"><span lang="vi">Thuật toán tìm mục tiêu: Gần nhất (Nearest), Máu cao nhất (Highest HP), Ngẫu nhiên (Random), hoặc theo Hướng di chuyển.</span><span lang="en">Target finding algorithm: Nearest, Highest HP, Random, or according to Movement Direction.</span></p>
                                    </div>
                                </div>
                                <p class="mt-4 text-sm text-slate-700 font-mono bg-slate-100 p-2 rounded"><strong>Projectile Pipeline:</strong> <span lang="vi">Spawn (từ Object Pool) -> Update (Di chuyển/Quỹ đạo) -> Check Collision (Overlap box/circle) -> Apply Damage (Trigger on-hit effect) -> Return to Pool.</span><span lang="en">Spawn (from Object Pool) -> Update (Movement/Trajectory) -> Check Collision (Overlap box/circle) -> Apply Damage (Trigger on-hit effect) -> Return to Pool.</span></p>
                            </div>

                            <!-- AI -->
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <div class="flex items-center mb-4">
                                    <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold mr-4">👾</div>
                                    <h3 class="text-xl font-bold">Enemy AI & Behavior</h3>
                                </div>
                                <p class="text-slate-600 mb-3"><span lang="vi">AI đơn giản nhưng số lượng lớn. Không dùng Pathfinding (A*) phức tạp để tiết kiệm CPU.</span><span lang="en">AI is simple but massive. Do not use complex Pathfinding (A*) to save CPU.</span></p>
                                <ul class="list-disc pl-5 text-slate-700 space-y-1 mb-3">
                                    <li><strong>Steering Behaviors:</strong> <span lang="vi">Chủ yếu dùng "Seek" (hướng thẳng đến Player).</span><span lang="en">Mainly use "Seek" (directly towards Player).</span></li>
                                    <li><strong>Swarming:</strong> <span lang="vi">Áp dụng bầy đàn nhẹ (Separation) để tránh việc hàng trăm quái vật tụ lại thành 1 điểm pixel duy nhất.</span><span lang="en">Apply light swarming (Separation) to avoid hundreds of monsters clustering into a single pixel.</span></li>
                                    <li><strong>State Machine (FSM):</strong> <span lang="vi">Spawn (animation) -> Chase (seek player) -> Attack (nếu player trong range) -> Die (drop XP, play effect).</span><span lang="en">Spawn (animation) -> Chase (seek player) -> Attack (if player is in range) -> Die (drop XP, play effect).</span></li>
                                </ul>
                            </div>

                            <!-- Progression & UI -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="text-lg font-bold mb-3 border-b pb-2">Progression (Leveling)</h3>
                                    <p class="text-sm text-slate-600">
                                        <span lang="vi">Thu thập XP Gem -> Thanh XP đầy -> Trigger</span><span lang="en">Collect XP Gem -> XP bar full -> Trigger</span> <code>GameState.PAUSED</code> <span lang="vi">-> Hiện UI Draft -> Chọn 1 trong 3/4 Relic hoặc Vũ khí (RNG roll có trọng số) -> Apply Modifier -> Resume game.</span><span lang="en">-> Show UI Draft -> Choose 1 of 3/4 Relics or Weapons (weighted RNG roll) -> Apply Modifier -> Resume game.</span>
                                    </p>
                                </div>
                                <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 class="text-lg font-bold mb-3 border-b pb-2">UI / UX Feedback</h3>
                                    <p class="text-sm text-slate-600">
                                        <strong>Floating Damage Text:</strong> <span lang="vi">Dùng object pool, tweening bay lên và mờ dần.</span><span lang="en">Using object pool, tweening floats and fades.</span>
                                        <br><strong>Screen Shake & Hit Stop:</strong> <span lang="vi">Cung cấp lực đánh (impact) khi tiêu diệt boss hoặc dính đòn.</span><span lang="en">Provides impact when killing a boss or getting hit.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
    };
})();