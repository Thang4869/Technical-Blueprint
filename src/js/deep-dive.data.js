// Deep Dive - Data (reportData)
const reportData = {
            overview: {
                id: 'overview',
                title: 'Phần 1: Tổng quan game',
                icon: '🎮',
                content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-2">Tổng quan & Phân tích Thể loại</h2>
                        <p class="text-slate-600 mb-8">Báo cáo phân tích chuyên sâu phục vụ tái tạo game "Bizarre Brigade" - một minigame dạng Auto-shooter/Roguelite (Vampire Survivors-like).</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 class="font-bold text-lg mb-4 text-indigo-700">Đặc tả hệ thống cơ bản</h3>
                                <ul class="space-y-3">
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Thể loại:</strong> Roguelite Survival, Top-down Auto-shooter.</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Góc nhìn:</strong> 2D Top-down (hoặc Isometric pseudo-2D), góc camera cố định track theo người chơi.</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Target Platform:</strong> PC/Console (chính), Mobile (hỗ trợ touch/virtual joystick).</div></li>
                                    <li class="flex items-start"><span class="text-indigo-500 mr-2">▪</span> <div><strong>Nhịp độ (Pacing):</strong> Fast-paced, số lượng entity tăng theo cấp số nhân theo thời gian (Horde survival).</div></li>
                                </ul>
                            </div>
                            
                            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                <h3 class="font-bold text-lg mb-2 text-indigo-700 text-center">Core Gameplay Loop</h3>
                                <div class="bg-slate-50 rounded-lg p-4 font-mono text-sm text-center border border-slate-200">
                                    <div class="text-indigo-600 font-bold">1. Di chuyển (Né tránh/Gom quái)</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-red-500 font-bold">2. Tự động tấn công (Auto-cast)</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-emerald-500 font-bold">3. Thu thập XP/Gems</div>
                                    <div class="text-slate-400 my-1">↓</div>
                                    <div class="text-amber-500 font-bold">4. Level Up (Drafting Hệ thống Relic/Vũ khí)</div>
                                    <div class="text-slate-400 my-1">↻ (Lặp lại cho đến khi đánh Boss)</div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 class="font-bold text-lg mb-4 text-center">Phân tích Thuộc tính Game</h3>
                            <div class="chart-container">
                                <canvas id="overviewChart"></canvas>
                            </div>
                            <p class="text-sm text-slate-500 mt-4 text-center">Biểu đồ thể hiện trọng tâm phát triển: Tập trung cực mạnh vào Action và Entity Count, yêu cầu tối ưu hóa cao thay vì logic phức tạp.</p>
                        </div>
                    </div>
                `
            },
            mechanics: {
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
            },
            architecture: {
                id: 'architecture',
                title: 'Phần 3: Kiến trúc Hệ thống',
                icon: '🏗',
                content: `
                    <div class="max-w-4xl mx-auto fade-in">
                        <h2 class="text-3xl font-bold text-slate-900 mb-4">System Architecture (ECS Approach)</h2>
                        <p class="text-slate-600 mb-6">Đối với game thể loại Horde Survival (hàng ngàn entities trên màn hình), OOP truyền thống (Deep inheritance) sẽ gây crash cache CPU. <strong>Entity Component System (ECS)</strong> là bắt buộc.</p>

                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                            <h3 class="font-bold text-lg mb-4 text-center">Data-Oriented Design (ECS Blueprint)</h3>
                            
                            <!-- Interactive CSS Grid Diagram -->
                            <div class="grid grid-cols-3 gap-4 text-center">
                                <div class="col-span-3 bg-slate-800 text-white p-3 rounded font-bold shadow-md">
                                    WORLD / GAME STATE
                                </div>
                                
                                <!-- Entities -->
                                <div class="bg-indigo-100 border border-indigo-300 rounded p-4 flex flex-col items-center ecs-block">
                                    <div class="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold mb-2">E</div>
                                    <h4 class="font-bold text-indigo-900">Entities</h4>
                                    <p class="text-xs text-indigo-700 mt-2">Chỉ là các Integer IDs (e.g., ID: 1042).</p>
                                </div>

                                <!-- Components -->
                                <div class="bg-emerald-100 border border-emerald-300 rounded p-4 flex flex-col items-center ecs-block">
                                    <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-2">C</div>
                                    <h4 class="font-bold text-emerald-900">Components</h4>
                                    <p class="text-xs text-emerald-700 mt-2">Dữ liệu thuần túy (Struct/Data Class).</p>
                                </div>

                                <!-- Systems -->
                                <div class="bg-rose-100 border border-rose-300 rounded p-4 flex flex-col items-center ecs-block">
                                    <div class="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold mb-2">S</div>
                                    <h4 class="font-bold text-rose-900">Systems</h4>
                                    <p class="text-xs text-rose-700 mt-2">Logic xử lý mảng Components.</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Component Breakdown Table -->
                        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
                            <h3 class="font-bold text-lg mb-4">Component Breakdown</h3>
                            <div class="overflow-x-auto">
                                <table class="w-full text-left text-sm text-slate-700">
                                    <thead class="bg-slate-100 border-b border-slate-200">
                                        <tr>
                                            <th class="p-3">Entity Type</th>
                                            <th class="p-3">Required Components</th>
                                            <th class="p-3">Systems (Logic)</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-200">
                                        <tr>
                                            <td class="p-3 font-bold text-indigo-600">Player</td>
                                            <td class="p-3 font-mono text-xs">Transform, Velocity, Input, Health, Collider, XPCollector</td>
                                            <td class="p-3">InputSystem, MovementSys, CollisionSys</td>
                                        </tr>
                                        <tr>
                                            <td class="p-3 font-bold text-red-600">Enemy</td>
                                            <td class="p-3 font-mono text-xs">Transform, Velocity, Health, Collider, AI_Follow, DamageBox</td>
                                            <td class="p-3">AISystem, MovementSys, CombatSys</td>
                                        </tr>
                                        <tr>
                                            <td class="p-3 font-bold text-amber-500">Projectile</td>
                                            <td class="p-3 font-mono text-xs">Transform, Velocity, Collider, Damage, Lifetime</td>
                                            <td class="p-3">ProjectileSys, CollisionSys, CombatSys</td>
                                        </tr>
                                        <tr>
                                            <td class="p-3 font-bold text-emerald-600">XP Gem</td>
                                            <td class="p-3 font-mono text-xs">Transform, XPValue, MagneticRange</td>
                                            <td class="p-3">MagnetSystem, PickupSystem</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Game Loop Architecture -->
                        <div class="bg-slate-800 text-slate-100 p-6 rounded-xl shadow-sm font-mono text-sm">
                            <h3 class="font-bold text-lg mb-4 text-emerald-400 font-sans border-b border-slate-700 pb-2">Main Game Loop Structure</h3>
                            <pre class="whitespace-pre-wrap"><code>while is_running:
                                dt = calculate_delta_time()
                                
                                # 1. Input Processing
                                process_inputs()
                                
                                if state == PLAYING:
                                    # 2. Logic Update (Fixed Timestep suggested for physics)
                                    spawn_system.update(dt)
                                    ai_system.update(dt)
                                    movement_system.update(dt)
                                    spatial_hash.rebuild() # Update grid collision
                                    collision_system.update() # Broadphase -> Narrowphase
                                    combat_system.update() # Calculate HP, apply damage
                                    death_system.update() # Return to pool, drop XP
                                    
                                # 3. Render Pipeline
                                renderer.clear()
                                renderer.draw_background()
                                renderer.draw_entities_batched(sorted_by_y_for_depth)
                                renderer.draw_ui(state)
                                renderer.swap_buffers()</code>
                            </pre>
                        </div>
                    </div>
                `
            },
            rendering: {
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
            },
            asset_strategy: {
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
            },
            optimization: {
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
            },
            recreation: {
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
            },
        };