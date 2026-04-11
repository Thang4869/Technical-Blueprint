with open('src/html/infographic.html', 'r', encoding='utf-8') as f:
    text = f.read()

tag = '<span lang=\x22vi\x22>Khám phá chi tiết</span><span lang=\x22en\x22>Explore Details</span>'
text = text.replace('>Khám phá chi tiết<', '>%s<' % tag)

with open('src/html/infographic.html', 'w', encoding='utf-8') as f:
    f.write(text)

with open('gh-pages-dist/infographic/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('>Khám phá chi tiết<', '>%s<' % tag)

with open('gh-pages-dist/infographic/index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done button!')