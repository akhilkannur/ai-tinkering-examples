import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Config
IMAGE_SIZE = (1200, 600)
ACCENT_COLOR = "#F43F5E"
BG_COLOR = "#020617"
TEXT_COLOR = "#F8FAFC"
# Use existing font from blog thumbnails
FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSerif-Regular.ttf"

def create_polished_cover(input_path, output_name, title):
    # 1. Load raw screenshot
    raw_img = Image.open(input_path)
    
    # 2. Create base canvas
    canvas = Image.new('RGB', IMAGE_SIZE, BG_COLOR)
    
    # 3. Paste screenshot slightly shrunken to create a "frame" look
    # Shrink to 1100x550
    margin = 40
    inner_size = (IMAGE_SIZE[0] - margin*2, IMAGE_SIZE[1] - margin*2)
    shot_resized = raw_img.resize(inner_size, Image.Resampling.LANCZOS)
    
    # Add a subtle glow/shadow to the shot
    shadow = Image.new('RGB', (inner_size[0]+10, inner_size[1]+10), (0,0,0))
    canvas.paste(shadow, (margin-5, margin-5))
    canvas.paste(shot_resized, (margin, margin))
    
    # 4. Add Branding Overlay
    draw = ImageDraw.Draw(canvas)
    try:
        font_large = ImageFont.truetype(FONT_PATH, 40)
        font_small = ImageFont.truetype(FONT_PATH, 20)
    except:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
        
    # Draw a bottom bar for the title
    draw.rectangle([0, 520, 1200, 600], fill=BG_COLOR)
    draw.line([0, 520, 1200, 520], fill=ACCENT_COLOR, width=2)
    
    # Draw Title
    draw.text((margin, 535), title, font=font_large, fill=TEXT_COLOR)
    draw.text((1000, 550), "realaiexamples.com", font=font_small, fill=ACCENT_COLOR)

    canvas.save(f"internal-marketing/{output_name}")
    print(f"✅ Generated internal-marketing/{output_name}")

if __name__ == "__main__":
    if not os.path.exists("internal-marketing/temp"):
        print("Error: internal-marketing/temp not found. Run scripts/temp-capture.js first.")
    else:
        create_polished_cover("internal-marketing/temp/hero-raw.png", "directory-cover-hero.png", "REAL AI EXAMPLES")
        create_polished_cover("internal-marketing/temp/grid-raw.png", "directory-cover-library.png", "500+ AI BLUEPRINTS")
        create_polished_cover("internal-marketing/temp/archetypes-raw.png", "directory-cover-quiz.png", "WORKPLACE AI PERSONALITY")
