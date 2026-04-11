import os

paths = ['src/html/infographic.html', 'gh-pages-dist/infographic/index.html']

for path in paths:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # translation 1: Perspective
    text = text.replace(
        '<span lang="vi">Góc nhìn:</span><span lang="en">Perspective:</span></strong> Top-down 2D (Camera khóa theo Player).',
        '<span lang="vi">Góc nhìn:</span><span lang="en">Perspective:</span></strong> <span lang="vi">Top-down 2D (Camera khóa theo Player).</span><span lang="en">Top-down 2D (Camera locked to Player).</span>'
    )
    # translation 2: Platform
    text = text.replace(
        '<span lang="vi">Nền tảng:</span><span lang="en">Platform:</span></strong> PC (Bàn phím/Chuột) & Mobile (Virtual Joystick).',
        '<span lang="vi">Nền tảng:</span><span lang="en">Platform:</span></strong> <span lang="vi">PC (Bàn phím/Chuột) & Mobile (Virtual Joystick).</span><span lang="en">PC (Keyboard/Mouse) & Mobile (Virtual Joystick).</span>'
    )

    # Game Loop text translations
    replaces = [
        ('<span class="text-slate-500"># 1. Thu thập Input</span>', '<span class="text-slate-500"><span lang="vi"># 1. Thu thập Input</span><span lang="en"># 1. Collecting Input</span></span>'),
        ('<span class="text-slate-500"># 2. Cập nhật Logic (Logic Update)</span>', '<span class="text-slate-500"><span lang="vi"># 2. Cập nhật Logic (Logic Update)</span><span lang="en"># 2. Logic Update</span></span>'),
        ('<span class="text-slate-500"># Tái tạo lưới không gian cho Va chạm</span>', '<span class="text-slate-500"><span lang="vi"># Tái tạo lưới không gian cho Va chạm</span><span lang="en"># Rebuild Spatial Grid for Collision</span></span>'),
        ('<span class="text-slate-500"># 3. Kết xuất Đồ họa (Render Pipeline)</span>', '<span class="text-slate-500"><span lang="vi"># 3. Kết xuất Đồ họa (Render Pipeline)</span><span lang="en"># 3. Render Pipeline</span></span>')
    ]
    for old_s, new_s in replaces:
        text = text.replace(old_s, new_s)

    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(text)

print('Updated others!')
