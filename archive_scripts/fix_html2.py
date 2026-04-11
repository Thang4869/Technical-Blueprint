import os
import re

paths = ['src/html/infographic.html', 'gh-pages-dist/infographic/index.html']

for path in paths:
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Use regex to replace the old script block unconditionally
    text = re.sub(
        r'// Robust navigation.*?\(\)\);',
        '''// Robust navigation for the "<span lang="vi">Khám phá chi tiết</span><span lang="en">Explore Details</span>" button.
        // Capture-phase handler ensures it overrides other click interceptors.
        (function(){
            const btn = document.getElementById('exploreBtn');
            if (!btn) return;
            btn.addEventListener('click', function(e){
                try {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                } catch (err) {}
                
                if (location.pathname.endsWith('infographic.html')) {
                    location.href = location.pathname.replace('infographic.html', 'deep-dive.html');
                } else if (location.pathname.endsWith('/infographic/index.html')) {
                    const p = location.pathname.replace(/\/infographic\/index\.html\$/, '/');
                    location.href = p + 'deep-dive/';
                } else {
                    const p = location.pathname.replace(/\/infographic\/?\$/, '/');
                    location.href = p + 'deep-dive/';
                }
            }, {capture: true});
        })();''',
        text,
        flags=re.DOTALL
    )

    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(text)

print('Updated scripts.')
