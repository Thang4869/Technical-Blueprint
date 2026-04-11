import re

file_path = r'e:\2A\gh-pages-dist\infographic\index.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add CSS directly if not present
css_snippet = '''
    <style>
        :root:not([lang="en"]) [lang="en"] { display: none !important; }
        :root[lang="en"] [lang="vi"] { display: none !important; }
        html:not([lang="en"]) [lang="en"] { display: none !important; }
        html[lang="en"] [lang="vi"] { display: none !important; }
    </style>
</head>'''
content = content.replace('</head>', css_snippet)

translations = {
    'Tổng Quan': '<span lang="vi">Tổng Quan</span><span lang="en">Overview</span>',
    'Cơ Chế': '<span lang="vi">Cơ Chế</span><span lang="en">Mechanics</span>',
    'Kiến Trúc': '<span lang="vi">Kiến Trúc</span><span lang="en">Architecture</span>',
    'Tối Ưu': '<span lang="vi">Tối Ưu</span><span lang="en">Optimization</span>',
    'Liên hệ': '<span lang="vi">Liên hệ</span><span lang="en">Contact</span>',
    'Bản Thuyết Minh Kỹ Thuật (Technical Blueprint)': '<span lang="vi">Bản Thuyết Minh Kỹ Thuật (Technical Blueprint)</span><span lang="en">Technical Blueprint</span>',
    'Phân Tích Chuyên Sâu<br>': '<span lang="vi">Phân Tích Chuyên Sâu<br></span><span lang="en">Deep Dive Analysis<br></span>',
    'Tài liệu phục vụ việc tái tạo kiến trúc hệ thống, gameplay loop và pipeline đồ họa cho dự án minigame Auto-shooter / Roguelite sinh tồn màn hình vỡ.': '<span lang="vi">Tài liệu phục vụ việc tái tạo kiến trúc hệ thống, gameplay loop và pipeline đồ họa cho dự án minigame Auto-shooter / Roguelite sinh tồn màn hình vỡ.</span><span lang="en">Documentation for recreating the system architecture, gameplay loop, and graphics pipeline for the bullet-heaven survival Auto-shooter / Roguelite minigame project.</span>',
    'Entity Mục Tiêu': '<span lang="vi">Entity Mục Tiêu</span><span lang="en">Target Entities</span>',
    'Mức Khung Hình Chuẩn': '<span lang="vi">Mức Khung Hình Chuẩn</span><span lang="en">Target Framerate</span>',
    'Kiến Trúc Lõi': '<span lang="vi">Kiến Trúc Lõi</span><span lang="en">Core Architecture</span>',
    'Khám phá chi tiết': '<span lang="vi">Khám phá chi tiết</span><span lang="en">Explore Details</span>',
    'Nhận Diện Hệ Thống Lõi': '<span lang="vi">Nhận Diện Hệ Thống Lõi</span><span lang="en">Core System Identification</span>',
}

for vi, bi in translations.items():
    content = content.replace(vi, bi)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
