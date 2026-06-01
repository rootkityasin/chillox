import os
import numpy as np
from PIL import Image

public_dir = r"c:\Users\Rootkit\Desktop\project\Chillox\public"
img1 = Image.open(os.path.join(public_dir, "temp_media_1.png")).convert("RGB")
img2 = Image.open(os.path.join(public_dir, "classic_beef.png")).convert("RGB")

print(f"img1 aspect ratio: {img1.size[0] / img1.size[1]:.3f}")
print(f"img2 aspect ratio: {img2.size[0] / img2.size[1]:.3f}")

# Resize both to 100x100 and compute correlation or diff
i1_res = img1.resize((100, 100))
i2_res = img2.resize((100, 100))

arr1 = np.array(i1_res).astype(float)
arr2 = np.array(i2_res).astype(float)

diff = np.mean(np.abs(arr1 - arr2))
print(f"Mean absolute difference on 100x100 resize: {diff:.2f}")
