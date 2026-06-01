import os
from PIL import Image

def inspect():
    public_dir = r"C:\Users\Rootkit\Desktop\project\Chillox\public"
    for i in range(8):
        file_path = os.path.join(public_dir, f"layer_{i}.png")
        if not os.path.exists(file_path):
            print(f"layer_{i}.png does not exist")
            continue
        
        img = Image.open(file_path)
        img_rgba = img.convert("RGBA")
        w, h = img_rgba.size
        
        # Sample the 4 corners
        corners = [
            img_rgba.getpixel((0, 0)),
            img_rgba.getpixel((w - 1, 0)),
            img_rgba.getpixel((0, h - 1)),
            img_rgba.getpixel((w - 1, h - 1)),
            img_rgba.getpixel((w // 2, 5))
        ]
        
        # Let's count how many pixels are completely black (0, 0, 0, 255) vs transparent
        all_pixels = list(img_rgba.getdata())
        total = len(all_pixels)
        black_pixels = sum(1 for p in all_pixels if p[0] < 10 and p[1] < 10 and p[2] < 10 and p[3] > 0)
        transparent_pixels = sum(1 for p in all_pixels if p[3] == 0)
        
        print(f"Layer {i}: {file_path}")
        print(f"  Size: {w}x{h}")
        print(f"  Corners (RGBA): {corners}")
        print(f"  Total pixels: {total}")
        print(f"  Black pixels (R,G,B < 10, A > 0): {black_pixels} ({black_pixels/total*100:.2f}%)")
        print(f"  Transparent pixels (A=0): {transparent_pixels} ({transparent_pixels/total*100:.2f}%)")

if __name__ == "__main__":
    inspect()
