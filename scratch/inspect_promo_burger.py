import os
from PIL import Image

def inspect():
    path = r"C:\Users\Rootkit\Desktop\project\Chillox\public\promo_burger.png"
    if not os.path.exists(path):
        print("promo_burger.png not found")
        return
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    
    # We will sample the border pixels and check how many are not transparent and are dark
    border_non_trans = []
    for x in range(w):
        p1 = img.getpixel((x, 0))
        p2 = img.getpixel((x, h - 1))
        if p1[3] > 0: border_non_trans.append((x, 0, p1))
        if p2[3] > 0: border_non_trans.append((x, h - 1, p2))
    for y in range(h):
        p1 = img.getpixel((0, y))
        p2 = img.getpixel((w - 1, y))
        if p1[3] > 0: border_non_trans.append((0, y, p1))
        if p2[3] > 0: border_non_trans.append((w - 1, y, p2))
        
    print(f"promo_burger.png: Size {w}x{h}")
    print(f"Number of non-transparent border pixels: {len(border_non_trans)}")
    if border_non_trans:
        print("First 20 non-transparent border pixels:")
        for px in border_non_trans[:20]:
            print(f"  Pos: ({px[0]}, {px[1]}), RGBA: {px[2]}")

if __name__ == "__main__":
    inspect()
