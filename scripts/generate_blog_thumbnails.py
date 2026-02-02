import os
from PIL import Image, ImageDraw, ImageFont

# Configuration
OUTPUT_DIR = "public/images/blog"
FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSerif-Regular.ttf"
IMAGE_SIZE = (750, 500)
FONT_SIZE = 54 # Slightly smaller for elegance
ACCENT_COLOR = "#F43F5E" # Rose 500
TEXT_COLOR = "#F8FAFC" # Slate 50

# Gradient Colors (Top to Bottom)
GRADIENT_TOP = (30, 41, 59)   # Slate 800 (#1E293B)
GRADIENT_BOTTOM = (2, 6, 23)  # Slate 950 (#020617)

# List of images to generate
IMAGES_TO_GENERATE = [
    ("competitor-watchtower.png", "Competitor Watchtower"),
    ("content-repurposing.png", "Content Repurposing"),
    ("folder-agents.png", "Folder Agents"),
    ("llms-txt-explained.png", "LLMs.txt Explained"),
    ("quiz-architecture.png", "Archetype Quiz"),
    ("screenshot-engine.png", "Screenshot Engine"),
    ("clawdbot-guide.png", "Moltbot Guide"),
    ("refactoring-with-ai.png", "Refactoring with AI"),
    ("automated-video-with-remotion.png", "Automated Video"),
]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def create_gradient(width, height, top_color, bottom_color):
    base = Image.new('RGB', (width, height), top_color)
    top = Image.new('RGB', (width, height), top_color)
    mask = Image.new('L', (width, height))
    mask_data = []
    
    for y in range(height):
        # Calculate alpha for this row (0 to 255)
        # We want to blend from TOP to BOTTOM.
        # So we start with TOP color and fade into BOTTOM color? 
        # Actually easier: Draw a rect for each line interpolating the color.
        pass

    # Better approach for simple vertical gradient
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    r1, g1, b1 = top_color
    r2, g2, b2 = bottom_color
    
    for y in range(height):
        ratio = y / height
        r = int(r1 * (1 - ratio) + r2 * ratio)
        g = int(g1 * (1 - ratio) + g2 * ratio)
        b = int(b1 * (1 - ratio) + b2 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    return img

def generate_image(filename, text):
    # 1. Background Gradient
    img = create_gradient(IMAGE_SIZE[0], IMAGE_SIZE[1], GRADIENT_TOP, GRADIENT_BOTTOM)
    draw = ImageDraw.Draw(img)

    # 2. Load Font
    try:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    except IOError:
        print(f"Warning: Font not found at {FONT_PATH}. Using default font.")
        font = ImageFont.load_default()

    # 3. Calculate Text Position
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (IMAGE_SIZE[0] - text_width) / 2
    # Move text slightly up to make room for accent line
    y = (IMAGE_SIZE[1] - text_height) / 2 - 20 

    # 4. Draw Text
    draw.text((x, y), text, font=font, fill=TEXT_COLOR)

    # 5. Draw Accent Line
    # A small elegant line below the text
    line_width = 80
    line_height = 4
    line_x = (IMAGE_SIZE[0] - line_width) / 2
    line_y = y + text_height + 30 # 30px spacing below text
    
    draw.rectangle(
        [(line_x, line_y), (line_x + line_width, line_y + line_height)],
        fill=ACCENT_COLOR
    )

    # Save
    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath)
    size = os.path.getsize(filepath)
    print(f"Generated {filepath} (Size: {size} bytes)")

def main():
    ensure_dir(OUTPUT_DIR)
    for filename, text in IMAGES_TO_GENERATE:
        generate_image(filename, text)

if __name__ == "__main__":
    main()
