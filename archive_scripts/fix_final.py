import os

files = [
    'src/html/infographic.html',
    'gh-pages-dist/infographic/index.html'
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix 1: Góc nhìn
        content = content.replace('<strong>Góc nhìn:</strong> Top-down 2D (Camera khóa theo Player).', '<strong><span lang=\"vi\">Góc nhìn:</span><span lang=\"en\">View:</span></strong> <span lang=\"vi\">Top-down 2D (Camera khóa theo Player).</span><span lang=\"en\">Top-down 2D (Camera locked to Player).</span>')
        
        # Fix 2: Nền tảng
        content = content.replace('<strong>Nền tảng:</strong> PC (Bàn phím/Chuột) & Mobile (Virtual Joystick).', '<strong><span lang=\"vi\">Nền tảng:</span><span lang=\"en\">Platform:</span></strong> <span lang=\"vi\">PC (Bàn phím/Chuột) & Mobile (Virtual Joystick).</span><span lang=\"en\">PC (Keyboard/Mouse) & Mobile (Virtual Joystick).</span>')

        # Fix 3: Chiến lược tái tạo
        content = content.replace('<span lang=\"vi\">Chiến Lược</span><span lang=\"en\">Strategy</span> Tái Tạo V1.0 (MVP Scope)', '<span lang=\"vi\">Chiến Lược Tái Tạo V1.0 (MVP Scope)</span><span lang=\"en\">Recreation Strategy V1.0 (MVP Scope)</span>')

        # Fix 4: JavaScript btn.addEventListener
        old_js = '''// Compute base path (handles /infographic/ and /<repo>/infographic/)
                const p = location.pathname.replace(/\\/infographic\\/?$/,'/');
                location.href = p + 'deep-dive/';'''
        
        new_js = '''let newHref;
                if (location.pathname.endsWith("infographic.html")) {
                    newHref = location.pathname.replace("infographic.html", "deep-dive.html");
                } else if (location.pathname.match(/\\/infographic\\/?$/)) {
                    newHref = location.pathname.replace(/\\/infographic\\/?$/, "/deep-dive/");
                } else {
                    newHref = "../deep-dive/";
                }
                location.href = newHref;'''
                
        content = content.replace(old_js, new_js)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Successfully updated {file_path}')
    except Exception as e:
        print(f'Error processing {file_path}: {e}')
