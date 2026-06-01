import os
import numpy as np
from PIL import Image

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
files = ["media__1780279402956.png", "media__1780279598567.png"]

for f in files:
    path = os.path.join(brain_dir, f)
    if os.path.exists(path):
        with Image.open(path) as img:
            if img.mode == "RGBA":
                arr = np.array(img)
                alpha = arr[:, :, 3]
                transparent_pixels = np.sum(alpha == 0)
                total_pixels = alpha.size
                trans_pct = (transparent_pixels / total_pixels) * 100
                print(f"{f}: trans_pct={trans_pct:.1f}%")
            else:
                print(f"{f}: not RGBA, mode={img.mode}")
