import re

file_paths = ['src/html/infographic.html', 'gh-pages-dist/infographic/index.html']

db = {
    'Tổng Quan': 'Overview',
    'Cơ Chế': 'Mechanics',
    'Kiến Trúc': 'Architecture',
    'Tối Ưu': 'Optimization',
    'Liên hệ': 'Contact',
    'Bản Thuyết Minh Kỹ Thuật (Technical Blueprint)': 'Technical Blueprint',
    'Phân Tích Chuyên Sâu': 'Deep Dive',
    'Tài liệu phục vụ việc tái tạo kiến trúc hệ thống, gameplay loop và pipeline đồ họa cho dự án minigame Auto-shooter / Roguelite sinh tồn màn hình vỡ.': 'Documentation for recreating the system architecture, gameplay loop, and graphics pipeline for a bullet-heaven Auto-shooter / Roguelite minigame project.',
    'Nhận Diện Hệ Thống Lõi': 'Identify Core Systems',
    'Phân tích DNA của trò chơi để xác định trọng tâm phát triển. Game tập trung tuyệt đối vào nhịp độ và số lượng vật thể thay vì logic AI phức tạp.': 'Analyze the game\'s DNA to identify development focus. The game strictly focuses on pacing and entity count over complex AI logic.',
    'Ma Trận Đặc Tính Game': 'Game Feature Matrix',
    'Biểu đồ Radar thể hiện sự lệch pha cố ý về phía "Mật độ Quái vật" và "Tốc độ Nhịp game".': 'The Radar chart shows an intentional bias towards "Entity Count" and "Pacing".',
    'Đặc Tả Kỹ Thuật Cấp 1': 'Tier-1 Technical Specifications',
    'Thể loại:': 'Genre:',
    'Sự đánh đổi lớn nhất trong kiến trúc là hi sinh "Pathfinding (A*)" và "Vật lý phức tạp (Rigidbodies)" để đổi lấy khả năng kết xuất hàng nghìn quái vật (Hordes) cùng lúc. Thuật toán di chuyển chủ yếu dựa trên': 'The biggest architectural trade-off sacrifices "Pathfinding (A*)" and "Complex Physics (Rigidbodies)" to render thousands of monsters (Hordes) simultaneously. The movement algorithm mainly relies on',
    'Steering Behaviors cơ bản': 'basic Steering Behaviors',
    'Vòng Lặp Trải Nghiệm (Core Loop)': 'Core Experience Loop',
    'Sự thành công của game đến từ một chu trình lặp gây nghiện (Feedback Loop) được thiết kế cực kỳ chặt chẽ, lặp lại hàng trăm lần mỗi phiên chơi.': 'The game\'s success stems from an extremely tight, addictive Feedback Loop, repeating hundreds of times per session.',
    'Sinh Tồn & Di Chuyển': 'Survival & Movement',
    'Người chơi điều khiển hướng đi, né tránh bầy quái vật liên tục khép góc.': 'Players control movement, dodging waves of monsters continuously closing in.',
    'Tấn Công Tự Động': 'Auto-Attack',
    'Vũ khí tự động kích hoạt dựa trên Cooldown Timer và thuật toán nhắm mục tiêu.': 'Weapons auto-trigger based on Cooldown Timers and targeting algorithms.',
    'Thu Thập Tài Nguyên': 'Resource Collection',
    'Quái chết rớt XP Gem. Thu thập để làm đầy thanh kinh nghiệm.': 'Dead monsters drop XP Gems. Gather to fill the experience bar.',
    'Tạm Dừng & Lựa Chọn': 'Pause & Draft',
    'Level Up trigger UI Draft (RNG). Chọn Relic/Vũ khí mới và lặp lại vòng lặp.': 'Leveling up triggers a Draft UI (RNG). Pick a new Relic/Weapon and loop again.',
    'Hệ Thống Di Chuyển': 'Movement System',
    'Sử dụng': 'Uses',
    'thay vì Dynamic Body để kiểm soát tuyệt đối vector vận tốc. Va chạm giữa Player-Quái không cản đường (Non-blocking) mà chỉ trừ máu dạng Overlap Box.': 'instead of Dynamic Body for absolute velocity vector control. Player-Monster collisions are non-blocking; they only deal damage as an Overlap Box.',
    'Thuật Toán Ngắm Bắn': 'Targeting Algorithm',
    'Mỗi vũ khí có Logic riêng: Kẻ địch gần nhất (Nearest Euclidean), Kẻ địch máu cao nhất, Random hướng, hoặc bắn theo hướng Vector di chuyển của Player.': 'Each weapon has its own Logic: Nearest Euclidean, Highest HP, Random direction, or firing along the Player\'s movement vector.',
    'Phản Hồi UI/UX (Juiciness)': 'UI/UX Feedback (Juiciness)',
    'Yếu tố quyết định cảm giác "đã tay": Số sát thương bay lơ lửng (Floating Text Tweening), Hiệu ứng giật màn hình (Screen Shake) và Khựng hình siêu nhỏ (Hit Stop).': 'Factors deciding the "satisfying" feel: Floating damage numbers (Tweening), Screen Shake effects, and micro-hit stops (Hit Stop).',
    'OOP (Lập trình Hướng đối tượng) với cây kế thừa sâu sẽ triệt tiêu hiệu năng Cache của CPU. ECS biến toàn bộ game thành dữ liệu dạng lưới (Data-Oriented Design) để CPU xử lý hàng loạt.': 'Deeply inherited OOP kills CPU cache performance. ECS turns the entire game into a data grid (Data-Oriented Design) for batch processing by the CPU.',
    'Chỉ là định danh (Integer IDs). Không chứa bất kỳ Logic hay Dữ liệu nào.': 'Merely identifiers (Integer IDs). Contains no Logic or Data whatsoever.',
    'Chứa dữ liệu thuần túy (Structs/Arrays). Hoàn toàn không chứa phương thức (Methods).': 'Contains pure data (Structs/Arrays). Contains absolutely no Methods.',
    'Các hàm Logic chạy mỗi Frame, duyệt qua các mảng': 'Logic functions run every frame, iterating over arrays',
    'để tính toán.': 'to calculate.',
    'Tiến trình Game Loop': 'Game Loop Flow',
    'Phân Tích Thành Phần Vật Thể': 'Entity Component Analysis',
    'Chiến Lược': 'Strategy',
    'Hiệu Năng & Rendering': 'Performance & Rendering',
    'Phân tích ngân sách tài nguyên (Budget) và các kỹ thuật cốt lõi giúp thiết bị di động có thể render hàng ngàn vật thể mà không rớt khung hình.': 'Analyzing resource budgets and core techniques that allow mobile devices to render thousands of entities without frame drops.',
    'Ngân Sách Xử Lý (Per Frame)': 'Processing Budget (Per Frame)',
    'Hệ thống Va chạm và Cập nhật AI chiếm phần lớn CPU. Đòi hỏi cấu trúc dữ liệu phẳng.': 'Collision and AI Update systems consume most of the CPU. Requires flat data structures.',
    'GPU sẽ quá tải nếu gọi lệnh vẽ (Draw Call) cho từng quái vật riêng lẻ. Giải pháp:': 'The GPU overloads if sending distinct draw calls for each individual monster. Solution:',
    'Gom toàn bộ Asset vào 1 file hình lớn (Texture Atlas).': 'Pack all assets into a single large image file (Texture Atlas).',
    'Sử dụng Instanced Rendering: Vẽ 1 mesh hình vuông duy nhất, lặp lại N lần với mảng [X, Y, UV_Coords] truyền thẳng lên GPU.': 'Use Instanced Rendering: Draw a single quad mesh, repeated N times, sending an array of [X, Y, UV_Coords] directly to the GPU.',
    'Spatial Partitioning (Chia lưới không gian)': 'Spatial Partitioning (Grid)',
    'Thuật toán dò va chạm Brute-force (O(N^2)) sẽ làm sập game. Áp dụng': 'O(N^2) brute-force collision detection crashes the game. Applying',
    'Chia bản đồ thành các ô Grid. Map Entity ID vào cell tương ứng.': 'Divide the map into Grid cells. Map Entity IDs to their respective cells.',
    'Chỉ xét va chạm giữa các Entity nằm chung 1 cell hoặc 8 ô lân cận. Đưa độ phức tạp về mức tuyến tính ~O(N).': 'Only check collisions between entities sharing the same cell or its 8 neighbors. Reduces complexity to linear ~O(N).',
    'Object Pooling (Bể chứa Bộ nhớ)': 'Object Pooling (Memory Pool)',
    'Tránh khởi tạo (': 'Avoid instantiating (',
    ') và hủy (': ') and destroying (',
    ') rác bộ nhớ trong lúc chơi. Tạo sẵn mảng tĩnh 3000 con quái vật lúc Loading. Khi quái chết, ẩn đi (SetActive = false) thay vì xóa khỏi RAM, và tái sử dụng khi Spawn quái mới.': ') causing memory garbage during gameplay. Pre-allocate a static array of 3000 monsters upon loading. When a monster dies, hide it (SetActive = false) instead of removing it from RAM, and reuse it when spawning new monsters.',
    'Tác Động Của': 'Impact of',
    '(Thời gian Render Frame - ms)': '(Render Frame Time - ms)',
    'Mục tiêu là giữ tổng thời gian xử lý một Frame dưới 16.6ms để duy trì ổn định mức 60 FPS.': 'The goal is to keep total frame processing time under 16.6ms to maintain a stable 60 FPS.',
    'Chiến Lược Tái Tạo V1.0 (MVP Scope)': 'Recreation Strategy V1.0 (MVP Scope)',
    'Trước khi xây dựng nội dung khổng lồ, cần hoàn thiện một bộ khung MVP (Minimum Viable Product) cực kỳ vững chắc với đầy đủ tính năng kỹ thuật lõi.': 'Before building massive content, complete a rock-solid MVP framework with all core technical features.',
    'Phải Hoàn Thiện (Must-have)': 'Must Have',
    'Thuật toán Spatial Hashing Grid': 'Spatial Hashing Grid Algorithm',
    'Render Engine: Hỗ trợ Texture Batching': 'Render Engine: Texture Batching Support',
    'Player Movement (WASD) mượt mà': 'Smooth Player Movement (WASD)',
    'Logic Auto-attack cơ bản (Tìm mục tiêu gần nhất)': 'Basic Auto-attack Logic (Find nearest target)',
    'Trì Hoãn (Post-MVP)': 'Delay (Post-MVP)',
    'Animation Sprites phức tạp (Dùng hình học thay thế trước)': 'Complex Sprite Animations (Use placeholder geometry initially)',
    'Hệ thống nâng cấp Relic/Vũ khí đa dạng (Drafting UI)': 'Diverse Relic/Weapon Upgrade System (Drafting UI)',
    'Hệ thống Âm thanh đa kênh (Audio mixing)': 'Multi-channel Audio System (Audio mixing)',
    'Bạn có thể liên hệ để trao đổi về dự án, hợp tác hoặc yêu cầu code sample.': 'Feel free to reach out to discuss the project, collaborate, or request code samples.',
    'Báo cáo Phân tích Kiến trúc Hệ Thống Bizarre Brigade.': 'Bizarre Brigade System Architecture Analysis Report.',
    'Entity Mục Tiêu': 'Target Entity',
    'Mức Khung Hình Chuẩn': 'Target FPS',
    'Lõi': 'Core',
    'Cốt truyện (Narrative)': 'Narrative',
    'Phụ thuộc RNG (May rủi)': 'RNG Dependency',
    'Tính Chiến thuật (Drafting)': 'Drafting (Strategy)',
    'Mật độ Quái vật (Entity Count)': 'Entity Count',
    'Tốc độ Nhịp game (Pacing)': 'Pacing',
    'Kỹ năng Người chơi (Né tránh)': 'Player Skill (Dodging)'
}

css_snippet = '''
    <style>
        :root:not([lang="en"]) [lang="en"] { display: none !important; }
        :root[lang="en"] [lang="vi"] { display: none !important; }
        html:not([lang="en"]) [lang="en"] { display: none !important; }
        html[lang="en"] [lang="vi"] { display: none !important; }
    </style>
</head>'''

for path in file_paths:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Apply CSS
    if 'display: none !important;' not in content:
        content = content.replace('</head>', css_snippet)

    # 2. Iterate keys
    for vi, en in getattr(dict, 'items')(db):
        span_vi = f'<span lang="vi">{vi}</span>'
        span_en = f'<span lang="en">{en}</span>'
        replacement = f'{span_vi}{span_en}'
        if span_vi not in content:
            content = content.replace(vi, replacement)

    # Note: 'Khám phá chi tiết' already translated, 'Góc nhìn' already translated, etc.
    # We replaced them via the small script earlier successfully, but let's make sure.
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done translating everything!")
