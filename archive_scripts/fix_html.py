files = [
    'src/html/deep-dive.html',
    'gh-pages-dist/deep-dive/index.html'
]
import os
for x in files:
    if not os.path.exists(x): continue
    with open(x, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # 1. Inject CSS
    new_css = '''
    <style>
        :root:not([lang="en"]) [lang="en"] { display: none !important; }
        :root[lang="en"] [lang="vi"] { display: none !important; }
        html:not([lang="en"]) [lang="en"] { display: none !important; }
        html[lang="en"] [lang="vi"] { display: none !important; }
    </style>
</head>'''
    if '<style>' not in html:
        html = html.replace('</head>', new_css)
    
    # 2. Inject initial load JS for localized toggle sync
    sync_js = '''
    <script>
        (function(){
            const stored = localStorage.getItem('bb-lang');
            if(stored) document.documentElement.lang = stored;
            window.addEventListener('storage', (e) => {
                if(e.key === 'bb-lang') document.documentElement.lang = e.newValue;
            });
        })();
    </script>
</body>'''
    if 'bb-lang' not in html:
        html = html.replace('</body>', sync_js)
    
    with open(x, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Fixed {x}')

