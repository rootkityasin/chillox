import os
from PIL import Image

def main():
    img_path = r"C:\Users\Rootkit\.gemini\antigravity\brain\3a180fe2-83e6-4727-81b9-6deb05e87d75\media__1780257341823.jpg"
    out_path = r"C:\Users\Rootkit\Desktop\project\Chillox\public\promo_burger.png"
    
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    
    # Bounding box of the burger in the original image (1024 x 690)
    # Burger horizontal span is roughly from X=240 to X=780.
    # We include a little bit of margin.
    left, top, right, bottom = 220, 0, 800, 690
    
    cropped_img = img.crop((left, top, right, bottom))
    c_width, c_height = cropped_img.size
    
    # We want to change the pixels to transparent if they are background.
    # We will use a BFS flood fill starting from all 4 edges of the cropped image.
    pixels = cropped_img.load()
    visited = [[False for _ in range(c_height)] for _ in range(c_width)]
    queue = []
    
    # Seed pixels from top and bottom edges
    for x in range(c_width):
        for y in [0, c_height - 1]:
            r, g, b, a = pixels[x, y]
            # If the pixel is dark or reddish splatter
            if (r < 75 and g < 60 and b < 60) or (r > 120 and g < 30 and b < 30):
                queue.append((x, y))
                visited[x][y] = True
                pixels[x, y] = (0, 0, 0, 0)
                
    # Seed pixels from left and right edges
    for y in range(c_height):
        for x in [0, c_width - 1]:
            if not visited[x][y]:
                r, g, b, a = pixels[x, y]
                if (r < 75 and g < 60 and b < 60) or (r > 120 and g < 30 and b < 30):
                    queue.append((x, y))
                    visited[x][y] = True
                    pixels[x, y] = (0, 0, 0, 0)
                    
    # BFS traversal
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    while queue:
        cx, cy = queue.pop(0)
        
        for dx, dy in directions:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < c_width and 0 <= ny < c_height:
                if not visited[nx][ny]:
                    r, g, b, a = pixels[nx, ny]
                    
                    # We want to flood fill through the black background, dark smoke, and the red paint splatters.
                    # Burger buns/lettuce/cheese have higher green/blue/yellow levels, so we restrict the fill there.
                    is_bg_black = (r < 80 and g < 65 and b < 65)
                    is_red_splatter = (r > 110 and g < 40 and b < 40)
                    
                    if is_bg_black or is_red_splatter:
                        visited[nx][ny] = True
                        queue.append((nx, ny))
                        pixels[nx, ny] = (0, 0, 0, 0)
                        
    # Apply a gentle transparency fade on the remaining edge pixels to smooth them out
    for x in range(1, c_width - 1):
        for y in range(1, c_height - 1):
            if not visited[x][y]:
                # If any neighbor is visited (transparent), we are on the boundary
                is_boundary = False
                for dx, dy in directions:
                    if visited[x + dx][y + dy]:
                        is_boundary = True
                        break
                if is_boundary:
                    r, g, b, a = pixels[x, y]
                    # Make boundary pixels slightly transparent to blend smoothly
                    pixels[x, y] = (r, g, b, 180)
                    
    # Ensure public folder exists
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    cropped_img.save(out_path, "PNG")
    print("Flood fill background removal complete. Saved to:", out_path)

if __name__ == "__main__":
    main()
