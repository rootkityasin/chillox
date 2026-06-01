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
            mean_color = arr.mean(axis=(0, 1))
            # Calculate red percentage (R > 150, G < 60, B < 60)
            red_pixels = np.sum((arr[:, :, 0] > 150) & (arr[:, :, 1] < 60) & (arr[:, :, 2] < 60))
            total_pixels = arr.shape[0] * arr.shape[1]
            red_pct = (red_pixels / total_pixels) * 100
            
            # Calculate yellow percentage (R > 180, G > 150, B < 100)
            yellow_pixels = np.sum((arr[:, :, 0] > 180) & (arr[:, :, 1] > 150) & (arr[:, :, 2] < 100))
            yellow_pct = (yellow_pixels / total_pixels) * 100
            
            # Calculate green percentage (G > 120, R < 100, B < 100)
            green_pixels = np.sum((arr[:, :, 1] > 120) & (arr[:, :, 0] < 100) & (arr[:, :, 2] < 100))
            green_pct = (green_pixels / total_pixels) * 100
            
            print(f"{f}: size={img.size}, mean_rgb={mean_color.round(1)}, red_pct={red_pct:.1f}%, yellow_pct={yellow_pct:.1f}%, green_pct={green_pct:.1f}%")
