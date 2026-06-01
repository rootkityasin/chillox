import os
import shutil

brain_dir = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75"
public_dir = r"c:\Users\Rootkit\Desktop\project\Chillox\public"

mapping = {
    "media__1780279839781.png": "fish_tots.png",
    "media__1780279845610.png": "potato_wedges.png",
    "media__1780279859079.png": "iced_lemon_tea.png",
    "media__1780279874821.png": "continental_fusion.png",
    "media__1780279895668.png": "pan_asian_mashup.png"
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    dst_path = os.path.join(public_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {src_name} to {dst_name}")
    else:
        print(f"Source {src_name} not found!")
