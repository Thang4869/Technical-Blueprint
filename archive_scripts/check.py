import os
for x in ['src/js/deep-dive/deep-dive.data.overview.js', 'src/js/deep-dive/deep-dive.ui.js', 'src/html/deep-dive.html']:
    print(f'=== {x} ===')
    with open(x, 'r', encoding='utf-8') as f:
        print(''.join(f.readlines()[:10]))
