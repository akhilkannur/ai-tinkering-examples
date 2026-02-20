import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Configuration
OUTPUT_DIR = "public/images/blog"
FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSerif-Regular.ttf"
IMAGE_SIZE = (750, 500)
FONT_SIZE = 54 
ACCENT_COLOR = "#F43F5E" # Rose 500
TEXT_COLOR = "#F8FAFC" # Slate 50

# Gradient Colors (Top to Bottom)
GRADIENT_TOP = (30, 41, 59)   # Slate 800
GRADIENT_BOTTOM = (2, 6, 23)  # Slate 950

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
    ("google-analytics-guide.png", "GA4 Traffic Reporter"),
    ("search-console-guide.png", "GSC Keyword Finder"),
    ("ai-skills.png", "The 'Harden' Loop"),
    ("internal-linking-guide.png", "Internal Linking Agent"),
    ("ai-native-websites.png", "AI Native Websites"),
    ("building-technical-directories.png", "Building API Directories"),
    ("anti-slop-rebrand.png", "The Anti-Slop Rebrand"),
]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def create_gradient(width, height, top_color, bottom_color):
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
    img = create_gradient(IMAGE_SIZE[0], IMAGE_SIZE[1], GRADIENT_TOP, GRADIENT_BOTTOM)
    draw = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    except IOError:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (IMAGE_SIZE[0] - text_width) / 2
    y = (IMAGE_SIZE[1] - text_height) / 2 - 20 

    draw.text((x, y), text, font=font, fill=TEXT_COLOR)

    line_width = 80
    line_height = 4
    line_x = (IMAGE_SIZE[0] - line_width) / 2
    line_y = y + text_height + 30
    
    draw.rectangle([(line_x, line_y), (line_x + line_width, line_y + line_height)], fill=ACCENT_COLOR)

    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath)
    print(f"Generated {filepath}")

def main():
    ensure_dir(OUTPUT_DIR)
    if len(sys.argv) == 3:
        text = sys.argv[1]
        filename = sys.argv[2]
        generate_image(filename, text)
    else:
        for filename, text in IMAGES_TO_GENERATE:
            generate_image(filename, text)

if __name__ == "__main__":
    main()