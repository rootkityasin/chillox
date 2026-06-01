import os
import shutil

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
public_dir = r"c:\Users\Rootkit\Desktop\project\Chillox\public"

mapping = {
    "media__1780279402956.png": "temp_media_1.png",
    "media__1780279598567.png": "fish_burger.png",
    "media__1780279620084.jpg": "shiitake_smasher.jpg",
    "media__1780279644642.jpg": "bacon_smasher.jpg",
    "media__1780279680549.png": "classic_beef.png",
    "media__1780279714354.png": "bbq_bacon.png"
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(public_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} to {dst_name}")
    else:
        print(f"Source {src_name} not found!")
