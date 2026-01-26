import os
from PIL import Image, ImageDraw, ImageFont

# Configuration
OUTPUT_DIR = "public/images/blog"
# Using the requested Malayalam font
FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSerifMalayalam-Regular.ttf" 
IMAGE_SIZE = (750, 500)
BG_COLOR = "black"
TEXT_COLOR = "white"
FONT_SIZE = 60

# List of images to generate: (filename, text)
IMAGES_TO_GENERATE = [
    ("autonomous-sales-rep.png", "Autonomous Sales Rep"),
    ("competitor-watchtower.png", "Competitor Watchtower"),
    ("content-repurposing.png", "Content Repurposing"),
    ("folder-agents.png", "Folder Agents"),
    ("llms-txt-explained.png", "LLMs.txt Explained"),
    ("quiz-architecture.png", "Archetype Quiz"),
    ("screenshot-engine.png", "Screenshot Engine"),
    ("clawdbot-guide.png", "Clawdbot Guide"),
    ("refactoring-with-ai.png", "Refactoring with AI"),
    ("automated-video-with-remotion.png", "Automated Video"),
]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def generate_image(filename, text):
    # Create image
    img = Image.new('RGB', IMAGE_SIZE, color=BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Load font
    try:
        font = ImageFont.truetype(FONT_PATH, FONT_SIZE)
    except IOError:
        print(f"Warning: Font not found at {FONT_PATH}. Using default font.")
        font = ImageFont.load_default()

    # Calculate text position (center)
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (IMAGE_SIZE[0] - text_width) / 2
    y = (IMAGE_SIZE[1] - text_height) / 2

    # Draw text
    draw.text((x, y), text, font=font, fill=TEXT_COLOR)

    # Save
    filepath = os.path.join(OUTPUT_DIR, filename)
    img.save(filepath)
    print(f"Generated {filepath}")

def main():
    ensure_dir(OUTPUT_DIR)
    for filename, text in IMAGES_TO_GENERATE:
        generate_image(filename, text)

if __name__ == "__main__":
    main()
