import os
import shutil
import glob

p = 'gh-pages-dist'
if os.path.exists(p):
    shutil.rmtree(p)
shutil.copytree('src/html', p)

for f in glob.glob(os.path.join(p, '*.html')):
    name = os.path.splitext(os.path.basename(f))[0]
    if name == 'index':
        continue
    target_dir = os.path.join(p, name)
    os.makedirs(target_dir, exist_ok=True)
    shutil.move(f, os.path.join(target_dir, 'index.html'))

print('Prepared', p)

# Copy static asset folders so pages can load CSS/JS/img
for d in ('src/css', 'src/js', 'src/img'):
    if os.path.exists(d):
        dest = os.path.join(p, os.path.basename(d))
        if os.path.exists(dest):
            shutil.rmtree(dest)
        shutil.copytree(d, dest)

# Copy common root assets (favicon, etc.) if present
for root_file in ('favicon.ico', 'favicon.svg'):
    if os.path.exists(root_file):
        shutil.copy(root_file, p)
