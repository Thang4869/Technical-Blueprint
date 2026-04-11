import glob
total = 0
for f in glob.glob('src/js/deep-dive/*.data.*.js'):
    with open(f, 'r', encoding='utf-8') as file:
        total += len(file.read())
print(f'Total Size: {total/1024:.2f} KB')
