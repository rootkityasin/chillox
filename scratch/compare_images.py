import os
from PIL import Image

public_dir = r"c:\Users\Rootkit\Desktop\project\Chillox\public"
img1_path = os.path.join(public_dir, "temp_media_1.png")
img2_path = os.path.join(public_dir, "fish_burger.png")

with Image.open(img1_path) as img1, Image.open(img2_path) as img2:
    print(f"temp_media_1.png size: {img1.size}, format: {img1.format}")
    print(f"fish_burger.png size: {img2.size}, format: {img2.format}")
