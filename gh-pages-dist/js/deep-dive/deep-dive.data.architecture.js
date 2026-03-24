(function(){
    window.__dd_sections__ = window.__dd_sections__ || {};
    window.__dd_sections__.architecture = {
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
    };
})();