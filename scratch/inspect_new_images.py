import os
from PIL import Image

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
files = [
    "media__1780279839781.png",
    "media__1780279845610.png",
    "media__1780279859079.png",
    "media__1780279874821.png",
    "media__1780279895668.png",
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        with Image.open(path) as img:
            print(f"{f}: format={img.format}, size={img.size}, mode={img.mode}")
