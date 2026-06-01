import os
from PIL import Image

def clean_image(path, bg_condition_func):
    if not os.path.exists(path):
        print(f"File {path} not found")
        return
        
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    pixels = img.load()
    visited = [[False for _ in range(h)] for _ in range(w)]
    queue = []
    
    # Start BFS from all border pixels
    for x in range(w):
        for y in [0, h - 1]:
            r, g, b, a = pixels[x, y]
            if a > 0:
                queue.append((x, y))
                visited[x][y] = True
                pixels[x, y] = (0, 0, 0, 0)
    for y in range(h):
        for x in [0, w - 1]:
            if not visited[x][y]:
                r, g, b, a = pixels[x, y]
                if a > 0:
                    queue.append((x, y))
                    visited[x][y] = True
                    pixels[x, y] = (0, 0, 0, 0)
                    
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    cleared_count = len(queue)
    
    while queue:
        cx, cy = queue.pop(0)
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h:
                if not visited[nx][ny]:
                    r, g, b, a = pixels[nx, ny]
                    # If pixel is active and matches background condition
                    if a > 0 and bg_condition_func(r, g, b, a):
                        visited[nx][ny] = True
                        queue.append((nx, ny))
                        pixels[nx, ny] = (0, 0, 0, 0)
                        cleared_count += 1
                        
    # Save back the clean image
    img.save(path, "PNG")
    print(f"Cleaned {path}: cleared {cleared_count} pixels.")

def main():
    public_dir = r"C:\Users\Rootkit\Desktop\project\Chillox\public"
    
    # Condition for promo_burger.png background:
    # 1. Cream/beige: r > 180, g > 170, b > 150
    # 2. Dark/shadow: r < 90, g < 90, b < 90
    # 3. Red splatter: r > 90, g < 50, b < 50
    def promo_burger_bg(r, g, b, a):
        is_cream = (r > 180 and g > 170 and b > 150)
        is_dark = (r < 90 and g < 90 and b < 90)
        is_red = (r > 90 and g < 55 and b < 55)
        return is_cream or is_dark or is_red
        
    # Condition for tomato.png background:
    # It has some dark grey border noise
    def tomato_bg(r, g, b, a):
        is_dark = (r < 100 and g < 100 and b < 100)
        return is_dark or a < 200
        
    clean_image(os.path.join(public_dir, "promo_burger.png"), promo_burger_bg)
    clean_image(os.path.join(public_dir, "tomato.png"), tomato_bg)

if __name__ == "__main__":
    main()
