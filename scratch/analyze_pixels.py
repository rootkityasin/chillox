import os
import numpy as np
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
        with Image.open(path) as img:
            # convert to RGB
            rgb_img = img.convert("RGB")
            arr = np.array(rgb_img)
            mean_color = arr.mean(axis=(0, 1))
            # Find percentage of highly red pixels (R > 180, G < 50, B < 50)
            red_pixels = np.sum((arr[:, :, 0] > 180) & (arr[:, :, 1] < 80) & (arr[:, :, 2] < 80))
            total_pixels = arr.shape[0] * arr.shape[1]
            red_pct = (red_pixels / total_pixels) * 100
            
            # Find percentage of green-ish pixels (G > 100, R < 120, B < 120)
            green_pixels = np.sum((arr[:, :, 1] > 100) & (arr[:, :, 0] < 120) & (arr[:, :, 2] < 120))
            green_pct = (green_pixels / total_pixels) * 100
            
            print(f"{f}: format={img.format}, size={img.size}, mean_rgb={mean_color.round(1)}, red_pct={red_pct:.1f}%, green_pct={green_pct:.1f}%")
