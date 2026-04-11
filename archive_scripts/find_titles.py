import os, glob, re
for f in glob.glob('src/js/deep-dive/*.data.*.js'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        m = re.search(r"title:\s*'([^']+)'", content)
        if m: print(f"{os.path.basename(f)}:: {m.group(1)}")
