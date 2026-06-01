import os
import numpy as np
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
            arr = np.array(img.convert("RGB"))
            # Blue/water pixels: B > 140, R < 100
            blue_pixels = np.sum((arr[:, :, 2] > 140) & (arr[:, :, 0] < 100))
            total_pixels = arr.shape[0] * arr.shape[1]
            blue_pct = (blue_pixels / total_pixels) * 100
            
            # Yellow pixels: R > 200, G > 180, B < 80
            yellow_pixels = np.sum((arr[:, :, 0] > 200) & (arr[:, :, 1] > 180) & (arr[:, :, 2] < 80))
            yellow_pct = (yellow_pixels / total_pixels) * 100
            
            # Dark pixels (bowl/tea): R < 40, G < 40, B < 40
            dark_pixels = np.sum((arr[:, :, 0] < 40) & (arr[:, :, 1] < 40) & (arr[:, :, 2] < 40))
            dark_pct = (dark_pixels / total_pixels) * 100
            
            print(f"{f}: size={img.size}, blue_pct={blue_pct:.1f}%, yellow_pct={yellow_pct:.1f}%, dark_pct={dark_pct:.1f}%")
