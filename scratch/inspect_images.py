import os
from PIL import Image

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
files = [
    "media__1780279402956.png",
    "media__1780279598567.png",
    "media__1780279620084.jpg",
    "media__1780279644642.jpg",
    "media__1780279680549.png",
    "media__1780279714354.png",
]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        try:
            with Image.open(path) as img:
                print(f"{f}: format={img.format}, size={img.size}, mode={img.mode}")
        except Exception as e:
            print(f"{f}: error {e}")
    else:
        print(f"{f}: does not exist")
