import os
import numpy as np
from PIL import Image

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
files = [
    "media__1780279845610.png",
    "media__1780279859079.png",
    "media__1780279874821.png",
    "media__1780279895668.png",
]

for f in files:
    path = os.path.join(brain_dir, f)
    with Image.open(path) as img:
        arr = np.array(img.convert("RGB"))
        h, w, _ = arr.shape
        # Center crop (middle 50%)
        cy, cx = h // 2, w // 2
        dy, dx = h // 4, w // 4
        center = arr[cy-dy:cy+dy, cx-dx:cx+dx]
        
        # Dark pixels in center: R < 50, G < 50, B < 50
        dark_pixels = np.sum((center[:, :, 0] < 50) & (center[:, :, 1] < 50) & (center[:, :, 2] < 50))
        total_pixels = center.shape[0] * center.shape[1]
        dark_pct = (dark_pixels / total_pixels) * 100
        
        # Yellow pixels in center: R > 200, G > 160, B < 100
        yellow_pixels = np.sum((center[:, :, 0] > 200) & (center[:, :, 1] > 160) & (center[:, :, 2] < 100))
        yellow_pct = (yellow_pixels / total_pixels) * 100
        
        # Red pixels in center: R > 150, G < 50, B < 50
        red_pixels = np.sum((center[:, :, 0] > 150) & (center[:, :, 1] < 50) & (center[:, :, 2] < 50))
        red_pct = (red_pixels / total_pixels) * 100
        
        print(f"{f}: center_dark={dark_pct:.1f}%, center_yellow={yellow_pct:.1f}%, center_red={red_pct:.1f}%")
