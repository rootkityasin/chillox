import os
from PIL import Image

def analyze():
    public_dir = r"C:\Users\Rootkit\Desktop\project\Chillox\public"
    for i in range(8):
        file_path = os.path.join(public_dir, f"layer_{i}.png")
        if not os.path.exists(file_path):
            continue
        img = Image.open(file_path).convert("RGBA")
        w, h = img.size
        
        # We will do a BFS from the borders, but only propagate if the pixel is dark.
        # Let's see the maximum RGB components of pixels near the border.
        border_pixels = []
        for x in range(w):
            border_pixels.append(img.getpixel((x, 0)))
            border_pixels.append(img.getpixel((x, h - 1)))
        for y in range(h):
            border_pixels.append(img.getpixel((0, y)))
            border_pixels.append(img.getpixel((w - 1, y)))
            
        max_r = max(p[0] for p in border_pixels)
        max_g = max(p[1] for p in border_pixels)
        max_b = max(p[2] for p in border_pixels)
        
        print(f"Layer {i}: Border Max R={max_r}, G={max_g}, B={max_b}")

if __name__ == "__main__":
    analyze()
