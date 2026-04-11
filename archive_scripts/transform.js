const fs = require('fs');
const path = 'e:/2A/gh-pages-dist/infographic/index.html';
const srcPath = 'e:/2A/src/html/infographic.html';
let content = fs.readFileSync(path, 'utf8');

const cssSnippet = 
    <style>
        :root:not([lang="en"]) [lang="en"] { display: none !important; }
        :root[lang="en"] [lang="vi"] { display: none !important; }
        html:not([lang="en"]) [lang="en"] { display: none !important; }
        html[lang="en"] [lang="vi"] { display: none !important; }
    </style>
</head>;

if(!content.includes('display: none !important')) {
    content = content.replace('</head>', cssSnippet);
}

const db = {
    'Tổng Quan': 'Overview',
    'Cơ Chế': 'Mechanics',
    'Kiến Trúc': 'Architecture',
    'Tối Ưu': 'Optimization',
    'Liên hệ': 'Contact',
    'Bản Thuyết Minh Kỹ Thuật (Technical Blueprint)': 'Technical Blueprint',
    'Phân Tích Chuyên Sâu<br>': 'Deep Dive Analysis<br>',
    'Tài liệu phục vụ việc tái tạo kiến trúc hệ thống, gameplay loop và pipeline đồ họa cho dự án minigame Auto-shooter / Roguelite sinh tồn màn hình vỡ.': 'Documentation for recreating the system architecture, gameplay loop, and graphics pipeline for the bullet-heaven survival Auto-shooter / Roguelite minigame project.',
    'Entity Mục Tiêu': 'Target Entities',
    'Mức Khung Hình Chuẩn': 'Target Framerate',
    'Kiến Trúc Lõi': 'Core Architecture',
    'Khám phá chi tiết': 'Explore Details',
    'Nhận Diện Hệ Thống Lõi': 'Core System Identification',
    'Phân tích DNA của trò chơi để xác định trọng tâm phát triển. Game tập trung tuyệt đối vào nhịp độ và số lượng vật thể thay vì logic AI phức tạp.': 'Analyze the game\\'s DNA to identify development focus. The game strictly focuses on pacing and entity count over complex AI logic.',
    'Ma Trận Đặc Tính Game': 'Game Feature Matrix',
    'Biểu đồ Radar thể hiện sự lệch pha cố ý về phía "Mật độ Quái vật" và "Tốc độ Nhịp game".': 'The Radar Chart exhibits an intentional skew towards "Monster Density" and "Pacing Speed".',
    'Đặc Tả Kỹ Thuật Cấp 1': 'Tier-1 Technical Specifications',
    'Thể loại:': 'Genre:',
    'Góc nhìn:': 'Perspective:',
    'Nền tảng:': 'Platform:',
    'Cơ Chế Di Chuyển': 'Movement Mechanics',
    'Sự đánh đổi lớn nhất trong kiến trúc là hi sinh "Pathfinding (A*)" và "Vật lý phức tạp (Rigidbodies)" để đổi lấy khả năng kết xuất hàng nghìn quái vật (Hordes) cùng lúc. Thuật toán di chuyển chủ yếu dựa trên <em>Steering Behaviors cơ bản</em> (Seek target).': 'The biggest architectural trade-off sacrifices "Pathfinding (A*)" and "Complex Physics (Rigidbodies)" to render thousands of monsters (Hordes) simultaneously. The movement algorithm mainly relies on basic <em>Steering Behaviors</em> (Seek target).',
    'Vòng Lặp Trải Nghiệm (Core Loop)': 'Core Experience Loop',
    'Sự thành công của game đến từ một chu trình lặp gây nghiện (Feedback Loop) được thiết kế cực kỳ chặt chẽ, lặp lại hàng trăm lần mỗi phiên chơi.': 'The game\\'s success stems from an extremely tight, addictive Feedback Loop, repeating hundreds of times per session.',
    'Sinh Tồn & Di Chuyển': 'Survival & Movement',
    'Người chơi điều khiển hướng đi, né tránh bầy quái vật liên tục khép góc.': 'Players control the direction, dodging monsters that constantly close the gap.',
    'Tấn Công Tự Động': 'Auto Attack',
    'Vũ khí tự động kích hoạt dựa trên Cooldown Timer và thuật toán nhắm mục tiêu.': 'Weapons activate automatically based on Cooldown Timers and targeting algorithms.',
    'Thu Thập Tài Nguyên': 'Resource Collection',
    'Quái chết rớt XP Gem. Thu thập để làm đầy thanh kinh nghiệm.': 'Monsters drop XP Gems upon death. Collect to fill the experience bar.',
    'Tạm Dừng & Lựa Chọn': 'Pause & Select',
    'Level Up trigger UI Draft (RNG). Chọn Relic/Vũ khí mới và lặp lại vòng lặp.': 'Leveling up triggers RNG Draft UI. Select new Relics/Weapons and repeat the loop.',
    'Hệ Thống Di Chuyển': 'Movement System',
    'Sử dụng <strong>Kinematic Body</strong> thay vì Dynamic Body để kiểm soát tuyệt đối vector vận tốc. Va chạm giữa Player-Quái không cản đường (Non-blocking) mà chỉ trừ máu dạng Overlap Box.': 'Uses <strong>Kinematic Body</strong> instead of Dynamic Body for absolute velocity vector control. Player-Monster collisions are Non-blocking, dealing damage via Overlap Box.',
    'Thuật Toán Ngắm Bắn': 'Targeting Algorithm',
    'Mỗi vũ khí có Logic riêng: Kẻ địch gần nhất (Nearest Euclidean), Kẻ địch máu cao nhất, Random hướng, hoặc bắn theo hướng Vector di chuyển của Player.': 'Each weapon has its own Logic: Nearest Euclidean, Highest Health, Random direction, or firing along the Player\\'s Movement Vector.',
    'Phản Hồi UI/UX (Juiciness)': 'UI/UX Feedback (Juiciness)',
    'Yếu tố quyết định cảm giác "đã tay": Số sát thương bay lơ lửng (Floating Text Tweening), Hiệu ứng giật màn hình (Screen Shake) và Khựng hình siêu nhỏ (Hit Stop).': 'Key factors for a satisfying feel: Floating Damage Text Tweening, Screen Shake effects, and Micro-stutters (Hit Stop).',
    'Kiến Trúc ECS (Entity Component System)': 'ECS Architecture (Entity Component System)',
    'OOP (Lập trình Hướng đối tượng) với cây kế thừa sâu sẽ triệt tiêu hiệu năng Cache của CPU. ECS biến toàn bộ game thành dữ liệu dạng lưới (Data-Oriented Design) để CPU xử lý hàng loạt.': 'OOP (Object-Oriented Programming) with deep inheritance trees nullifies CPU Cache performance. ECS turns the entire game into a grid-like data format (Data-Oriented Design) for CPU batch processing.',
    'Entities': 'Entities',
    'Chỉ là định danh (Integer IDs). Không chứa bất kỳ Logic hay Dữ liệu nào.': 'Merely identifiers (Integer IDs). Contains no Logic or Data.',
    'Components': 'Components',
    'Chứa dữ liệu thuần túy (Structs/Arrays). Hoàn toàn không chứa phương thức (Methods).': 'Contains pure data (Structs/Arrays). Completely devoid of Methods.',
    'Systems': 'Systems',
    'Các hàm Logic chạy mỗi Frame, duyệt qua các mảng Components để tính toán.': 'Logic functions running every Frame, iterating over Component arrays to calculate.',
    'Tiến trình Game Loop': 'Game Loop Flow',
    'Phân Tích Thành Phần Vật Thể': 'Entity Composition Analysis',
    'Chiến Lược Tối Ưu Hiệu Năng & Rendering': 'Performance & Rendering Optimization Strategy',
    'Phân tích ngân sách tài nguyên (Budget) và các kỹ thuật cốt lõi giúp thiết bị di động có thể render hàng ngàn vật thể mà không rớt khung hình.': 'Analyze the resource budget and core techniques enabling mobile devices to render thousands of entities without dropping frames.',
    'Ngân Sách Xử Lý (Per Frame)': 'Processing Budget (Per Frame)',
    'Hệ thống Va chạm và Cập nhật AI chiếm phần lớn CPU. Đòi hỏi cấu trúc dữ liệu phẳng.': 'Collision and AI Update systems consume the most CPU. Requires flat data structures.',
    'Batch Rendering & Texture Atlas': 'Batch Rendering & Texture Atlas',
    'GPU sẽ quá tải nếu gọi lệnh vẽ (Draw Call) cho từng quái vật riêng lẻ. Giải pháp:': 'The GPU will bottleneck if Draw Calls are invoked for each monster individually. Solution:',
    'Gom toàn bộ Asset vào 1 file hình lớn (Texture Atlas).': 'Combine all Assets into a single large image file (Texture Atlas).',
    'Sử dụng Instanced Rendering: Vẽ 1 mesh hình vuông duy nhất, lặp lại N lần với mảng [X, Y, UV_Coords] truyền thẳng lên GPU.': 'Use Instanced Rendering: Draw a single quad mesh repeatedly N times, passing an [X, Y, UV_Coords] array directly to the GPU.',
    'Spatial Partitioning (Chia lưới không gian)': 'Spatial Partitioning',
    'Thuật toán dò va chạm Brute-force (O(N^2)) sẽ làm sập game. Áp dụng <strong>Spatial Hashing</strong>:': 'Brute-force collision detection (O(N^2)) will freeze the game. Apply <strong>Spatial Hashing</strong>:',
    'Chia bản đồ thành các ô Grid. Map Entity ID vào cell tương ứng.': 'Divide the map into Grid cells. Map Entity IDs to their respective cells.',
    'Chỉ xét va chạm giữa các Entity nằm chung 1 cell hoặc 8 ô lân cận. Đưa độ phức tạp về mức tuyến tính ~O(N).': 'Only process collisions between Entities in the same cell or the 8 neighboring cells. Reduces complexity to ~O(N).',
    'Object Pooling (Bể chứa Bộ nhớ)': 'Object Pooling',
    'Tránh khởi tạo (<code>new</code>) và hủy (<code>destroy</code>) rác bộ nhớ trong lúc chơi. Tạo sẵn mảng tĩnh 3000 con quái vật lúc Loading. Khi quái chết, ẩn đi (SetActive = false) thay vì xóa khỏi RAM, và tái sử dụng khi Spawn quái mới.': 'Avoid instantiating (<code>new</code>) and destroying (<code>destroy</code>) memory garbage during gameplay. Pre-allocate a static array of 3000 monsters upon Loading. When monsters die, hide them (SetActive = false) instead of clearing from RAM, and reuse them when Spawning new ones.',
    'Tác Động Của Tối Ưu (Thời gian Render Frame - ms)': 'Impact of Optimization (Frame Render Time - ms)',
    'Mục tiêu là giữ tổng thời gian xử lý một Frame dưới 16.6ms để duy trì ổn định mức 60 FPS.': 'The goal is to keep total Frame processing time under 16.6ms to maintain a stable 60 FPS.',
    'Chiến Lược Tái Tạo V1.0 (MVP Scope)': 'Recreation Strategy V1.0 (MVP Scope)',
    'Trước khi xây dựng nội dung khổng lồ, cần hoàn thiện một bộ khung MVP (Minimum Viable Product) cực kỳ vững chắc với đầy đủ tính năng kỹ thuật lõi.': 'Before building massive content, complete an extremely solid MVP (Minimum Viable Product) framework featuring all core technical capabilities.',
    'Phải Hoàn Thiện (Must-have)': 'Must-have',
    'ECS Core Framework (Arrays/Structs)': 'ECS Core Framework (Arrays/Structs)',
    'Thuật toán Spatial Hashing Grid': 'Spatial Hashing Grid Algorithm',
    'Render Engine: Hỗ trợ Texture Batching': 'Render Engine: Supports Texture Batching',
    'Player Movement (WASD) mượt mà': 'Smooth Player Movement (WASD)',
    '1 Base Enemy (AI Seekers) + Spawn Logic': '1 Base Enemy (AI Seekers) + Spawn Logic',
    'Logic Auto-attack cơ bản (Tìm mục tiêu gần nhất)': 'Basic Auto-attack Logic (Target Nearest)',
    'Trì Hoãn (Post-MVP)': 'Deferred (Post-MVP)',
    'Animation Sprites phức tạp (Dùng hình học thay thế trước)': 'Complex Sprite Animations (Use basic geometry initially)',
    'Hệ thống nâng cấp Relic/Vũ khí đa dạng (Drafting UI)': 'Diverse Relic/Weapon Upgrade System (Drafting UI)',
    'Save/Load State & Progression Meta-game': 'Save/Load State & Progression Meta-game',
    'Hệ thống Âm thanh đa kênh (Audio mixing)': 'Multi-channel Audio System (Audio mixing)',
    'Contact / Liên hệ': 'Contact',
    'Bạn có thể liên hệ để trao đổi về dự án, hợp tác hoặc yêu cầu code sample.': 'You can reach out to discuss the project, collaborate, or request code samples.',
    'Báo cáo Phân tích Kiến trúc Hệ Thống Bizarre Brigade.': 'Bizarre Brigade System Architecture Analysis Report.'
};

let keys = Object.keys(db).sort((a,b) => b.length - a.length);

keys.forEach(vi => {
    if(!content.includes('<span lang="vi">' + vi + '</span>')) {
        content = content.split(vi).join('<span lang="vi">' + vi + '</span><span lang="en">' + db[vi] + '</span>');
    }
});

fs.writeFileSync(path, content, 'utf8');

try {
    let srcContent = fs.readFileSync(srcPath, 'utf8');
    if(!srcContent.includes('display: none !important')) {
        srcContent = srcContent.replace('</head>', cssSnippet);
    }
    keys.forEach(vi => {
        if(!srcContent.includes('<span lang="vi">' + vi + '</span>')) {
            srcContent = srcContent.split(vi).join('<span lang="vi">' + vi + '</span><span lang="en">' + db[vi] + '</span>');
        }
    });
    fs.writeFileSync(srcPath, srcContent, 'utf8');
} catch (e) { }

console.log('Node transform finished');
