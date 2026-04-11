import io
import re

def process(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # ensure CSS is there once
    css_snippet = '''
    <style>
        :root:not([lang="en"]) [lang="en"] { display: none !important; }
        :root[lang="en"] [lang="vi"] { display: none !important; }
        html:not([lang="en"]) [lang="en"] { display: none !important; }
        html[lang="en"] [lang="vi"] { display: none !important; }
    </style>
</head>'''
    content = re.sub(r'(\s*<style>.*?display: none !important;.*?</style>\s*)+', '', content, flags=re.DOTALL)
    content = content.replace('</head>', css_snippet)

    db = {
        'Tổng Quan': 'Overview',
        'Cơ Chế': 'Mechanics',
        'Kiến Trúc': 'Architecture',
        'Tối Ưu': 'Optimization',
        'Liên hệ': 'Contact',
        'Bản Thuyết Minh Kỹ Thuật (Technical Blueprint)': 'Technical Blueprint',
        'Phân Tích Chuyên Sâu': 'Deep Dive',
        'Tài liệu phục vụ việc tái tạo kiến trúc hệ thống, gameplay loop và pipeline đồ họa cho dự án minigame Auto-shooter / Roguelite sinh tồn màn hình vỡ.': 'Documentation for recreating the system architecture, gameplay loop, and graphics pipeline for a bullet-heaven Auto-shooter / Roguelite minigame project.',
        'Khám phá chi tiết': 'Explore Details',
        'Cốt truyện (Narrative)': 'Narrative',
        'Phụ thuộc RNG (May rủi)': 'RNG Dependency',
        'Tính Chiến thuật (Drafting)': 'Drafting (Strategy)',
        'Mật độ Quái vật (Entity Count)': 'Entity Count',
        'Tốc độ Nhịp game (Pacing)': 'Pacing',
        'Kỹ năng Người chơi (Né tránh)': 'Player Skill (Dodging)',
        'Tiến trình Game Loop': 'Game Loop Flow',
        'Đặc Tả Kỹ Thuật Cấp 1': 'Tier-1 Technical Specifications',
        'Thể loại:': 'Genre:',
        'Góc nhìn:': 'Perspective:',
        'Nền tảng:': 'Platform:',
        'Top-down 2D (Camera khóa theo Player).': 'Top-down 2D (Camera locked to Player).',
        'PC (Bàn phím/Chuột) & Mobile (Virtual Joystick).': 'PC (Keyboard/Mouse) & Mobile (Virtual Joystick).',
        'Sự đánh đổi lớn nhất trong kiến trúc là hi sinh "Pathfinding (A*)" và "Vật lý phức tạp (Rigidbodies)" để đổi lấy khả năng kết xuất hàng nghìn quái vật (Hordes) cùng lúc. Thuật toán di chuyển chủ yếu dựa trên <em>Steering Behaviors cơ bản</em> (Seek target).': 'The biggest architectural trade-off sacrifices "Pathfinding (A*)" and "Complex Physics (Rigidbodies)" to render thousands of monsters (Hordes) simultaneously. The movement algorithm mainly relies on basic <em>Steering Behaviors</em> (Seek target).',
        'Vòng Lặp Trải Nghiệm (Core Loop)': 'Core Experience Loop',
        'Sự thành công của game đến từ một chu trình lặp gây nghiện (Feedback Loop) được thiết kế cực kỳ chặt chẽ, lặp lại hàng trăm lần mỗi phiên chơi.': 'The game''s success stems from an extremely tight, addictive Feedback Loop, repeating hundreds of times per session.',
        'Sinh Tồn & Di Chuyển': 'Survival & Movement',
        'Người chơi điều khiển hướng đi, né tránh bầy quái vật liên tục khép góc.': 'The player controls movement, dodging endless waves of monsters closing in.',
        'Tấn Công Tự Động': 'Auto-Attack',
        'Vũ khí tự động kích hoạt dựa trên Cooldown Timer và thuật toán nhắm mục tiêu.': 'Weapons auto-trigger based on Cooldown Timers and targeting algorithms.',
        'Thu Thập Tài Nguyên': 'Resource Gathering',
        'Quái chết rớt XP Gem. Thu thập để làm đầy thanh kinh nghiệm.': 'Dead monsters drop XP Gems. Gather them to fill the experience bar.',
        'Tạm Dừng & Lựa Chọn': 'Pause & Draft',
        'Level Up trigger UI Draft (RNG). Chọn Relic/Vũ khí mới và lặp lại vòng lặp.': 'Leveling up triggers a Draft UI (RNG). Pick a new Relic/Weapon and loop again.'
    }
    
    # manual replace tags
    for vi, en in db.items():
        # don't double replace
        if f'<span lang="vi">{vi}</span>' not in content:
            content = content.replace(vi, f'<span lang="vi">{vi}</span><span lang="en">{en}</span>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

process('src/html/infographic.html')
process('gh-pages-dist/infographic/index.html')
print('Completed applying missing translations!')

