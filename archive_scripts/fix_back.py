import os

# Fix JS
js_file = 'src/js/deep-dive/deep-dive.dom.js'
with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

new_js = '''let targetHref;
            if (location.pathname.endsWith("deep-dive.html")) {
                targetHref = location.pathname.replace("deep-dive.html", "infographic.html");
            } else if (location.pathname.match(/\\/deep-dive\\/?$/)) {
                targetHref = location.pathname.replace(/\\/deep-dive\\/?$/, "/infographic/");
            } else {
                targetHref = "../infographic/";
            }'''

js_content = js_content.replace("window.location.href = '../infographic/';", f"{new_js}\n                window.location.href = targetHref;")
js_content = js_content.replace("{ window.location.href = '../infographic/'; }", f"{{ {new_js}\n                window.location.href = targetHref; }}")

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js_content)


# Fix HTML <a> tag inside src/html/deep-dive.html
html_file = 'src/html/deep-dive.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Add an ID to the a tag
html_content = html_content.replace('<a href="../infographic/" class="transition-link block">', '<a id="backTextLink" href="#" class="transition-link block">')

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Fixed Back Button")
