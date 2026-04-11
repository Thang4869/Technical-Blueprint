with open('src/html/deep-dive.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines[:100]):
    print(f'{i}: {line.strip()}')
