js_file = 'src/js/deep-dive/deep-dive.dom.js'
with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

listen_js = '''
    const backTextLink = document.getElementById('backTextLink');
    if (backTextLink) {
        backTextLink.addEventListener('click', (e) => {
            e.preventDefault();
            let targetHref;
            if (location.pathname.endsWith("deep-dive.html")) {
                targetHref = location.pathname.replace("deep-dive.html", "infographic.html");
            } else if (location.pathname.match(/\\/deep-dive\\/?$/)) {
                targetHref = location.pathname.replace(/\\/deep-dive\\/?$/, "/infographic/");
            } else {
                targetHref = "../infographic/";
            }
            const main = document.querySelector('main');
            if (main && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
                main.classList.add('zoom-out-active');
                setTimeout(() => { window.location.href = targetHref; }, 340);
            } else {
                window.location.href = targetHref;
            }
        });
    }
'''

if 'backTextLink' not in js_content:
    js_content += f"\n{listen_js}"

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js_content)
print('added listener')
