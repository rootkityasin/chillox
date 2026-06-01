import os
from PIL import Image

def inspect_all():
    public_dir = r"C:\Users\Rootkit\Desktop\project\Chillox\public"
    files = [
        "promo_burger.png",
        "tomato.png",
        "tomato_smashed.png",
        "logo.png",
        "burger_design.png",
        "burger_exploded.png",
        "hero_burger.png"
    ]
    for filename in files:
        path = os.path.join(public_dir, filename)
        if not os.path.exists(path):
            print(f"{filename} not found")
            continue
        try:
            img = Image.open(path).convert("RGBA")
            w, h = img.size
            
            # Check how many border pixels are not fully transparent (alpha > 0)
            border_count = 0
            border_opaque_colors = []
            
            # Top and bottom
            for x in range(w):
                p1 = img.getpixel((x, 0))
                p2 = img.getpixel((x, h - 1))
                if p1[3] > 5:
                    border_count += 1
                    border_opaque_colors.append(p1)
                if p2[3] > 5:
                    border_count += 1
                    border_opaque_colors.append(p2)
            # Left and right
            for y in range(h):
                p1 = img.getpixel((0, y))
                p2 = img.getpixel((w - 1, y))
                if p1[3] > 5:
                    border_count += 1
                    border_opaque_colors.append(p1)
                if p2[3] > 5:
                    border_count += 1
                    border_opaque_colors.append(p2)
                    
            print(f"{filename}: size {w}x{h}, border pixels with alpha > 5: {border_count}")
            if border_count > 0:
                # Print unique border colors
                unique_colors = list(set(border_opaque_colors[:15]))
                print(f"  Sample border colors: {unique_colors}")
        except Exception as e:
            print(f"Error inspecting {filename}: {e}")

if __name__ == "__main__":
    inspect_all()
