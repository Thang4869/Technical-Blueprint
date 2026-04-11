import re, glob, urllib.request, urllib.parse, json, os

VI_CHARS = re.compile(r'[áàạảãăắằẵẳâấầậẩẫẩậđéèẹẻẽêếềệểễíìịỉĩóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữýỳỵỷỹ]', re.IGNORECASE)

def translate(text):
    if not text.strip(): return text
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req)
        res = json.loads(response.read().decode('utf-8'))
        return ''.join([part[0] for part in res[0]])
    except:
        return text

def process_match(m):
    original = m.group(1)
    if not VI_CHARS.search(original): return m.group(0)
    stripped = original.strip()
    if not stripped: return m.group(0)
    en = translate(stripped)
    # preserve surrounding spaces
    left_space = original[:len(original) - len(original.lstrip())]
    right_space = original[len(original.rstrip()):]
    return f">{left_space}<span lang=\"vi\">{stripped}</span><span lang=\"en\">{en}</span>{right_space}<"

for f in glob.glob('src/js/deep-dive/*.data*.js'):
    print(f"Processing {f}...")
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Translate title in JS object
    def title_match(m):
        if VI_CHARS.search(m.group(1)):
            en = translate(m.group(1))
            return f"title: '<span lang=\"vi\">{m.group(1)}</span><span lang=\"en\">{en}</span>'"
        return m.group(0)
    content = re.sub(r"title:\s*'([^']+)'", title_match, content)

    # 2. Translate text between > and <
    content = re.sub(r'>([^<]+)<', process_match, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Data files processed.')
