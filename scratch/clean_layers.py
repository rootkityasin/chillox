import os
from PIL import Image

def clean_layers():
    public_dir = r"C:\Users\Rootkit\Desktop\project\Chillox\public"
    
    # We will loop through all 8 layers
    for i in range(8):
        file_path = os.path.join(public_dir, f"layer_{i}.png")
        if not os.path.exists(file_path):
            print(f"File {file_path} not found")
            continue
            
        img = Image.open(file_path).convert("RGBA")
        w, h = img.size
        
        # Load pixels
        pixels = img.load()
        visited = [[False for _ in range(h)] for _ in range(w)]
        queue = []
        
        # We start from all border pixels
        for x in range(w):
            for y in [0, h - 1]:
                r, g, b, a = pixels[x, y]
                # Seed if it's dark background
                if r < 70 and g < 70 and b < 70:
                    queue.append((x, y))
                    visited[x][y] = True
                    pixels[x, y] = (0, 0, 0, 0)
        for y in range(h):
            for x in [0, w - 1]:
                if not visited[x][y]:
                    r, g, b, a = pixels[x, y]
                    if r < 70 and g < 70 and b < 70:
                        queue.append((x, y))
                        visited[x][y] = True
                        pixels[x, y] = (0, 0, 0, 0)
                        
        # BFS
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        cleared_count = len(queue)
        
        # We will use a threshold of 65 for R, G, B for propagation
        threshold = 68
        
        while queue:
            cx, cy = queue.pop(0)
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h:
                    if not visited[nx][ny]:
                        r, g, b, a = pixels[nx, ny]
                        # Propagate if it's black/dark background
                        if r < threshold and g < threshold and b < threshold:
                            visited[nx][ny] = True
                            queue.append((nx, ny))
                            pixels[nx, ny] = (0, 0, 0, 0)
                            cleared_count += 1
                            
        # Smooth the boundary pixels slightly (anti-aliasing)
        for x in range(1, w - 1):
            for y in range(1, h - 1):
                if not visited[x][y]:
                    is_boundary = False
                    for dx, dy in directions:
                        if visited[x + dx][y + dy]:
                            is_boundary = True
                            break
                    if is_boundary:
                        r, g, b, a = pixels[x, y]
                        # Count how many transparent neighbors it has
                        trans_neighbors = 0
                        for dx, dy in directions:
                            if visited[x + dx][y + dy]:
                                trans_neighbors += 1
                        # Reduce alpha based on transparent neighbors for soft edges
                        new_a = int(a * (1.0 - 0.25 * trans_neighbors))
                        pixels[x, y] = (r, g, b, max(0, new_a))
                        
        # Save back the clean image
        img.save(file_path, "PNG")
        percent = (cleared_count / (w * h)) * 100
        print(f"Layer {i}: Cleared {cleared_count} background pixels ({percent:.2f}% of image). Saved to: {file_path}")

if __name__ == "__main__":
    clean_layers()
