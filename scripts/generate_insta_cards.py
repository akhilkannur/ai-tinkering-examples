import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Configuration
OUTPUT_DIR = "public/images/recipes"
BOLD_FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSans-Bold.ttf"
REGULAR_FONT_PATH = "/usr/share/fonts/chromeos/noto/NotoSans-Regular.ttf"
IMAGE_SIZE = (1080, 1080)

# Colors
BG_COLOR = "#0f172a"
GRID_COLOR = "#1e293b"
ACCENT_COLOR = "#D4FF00"  # Electric Lime
TEXT_WHITE = "#FFFFFF"
TEXT_GRAY = "#94a3b8"
TEXT_DARK = "#0f172a"
SITE_LABEL_COLOR = "#475569"

CARDS = [
    {
        "id": "zzz-insta-intro",
        "title": "50 AI Automation Ideas",
        "category": "Curated List",
        "tagline": "Stop asking what to automate and start building."
    },
    {
        "id": "meeting-action-item-enforcer",
        "title": "Meeting Action Item Enforcer",
        "category": "Strategic Ops",
        "tagline": "The AI project manager that nags you about tasks."
    },
    {
        "id": "competitor-ad-library-spy",
        "title": "Ad Library Decoder",
        "category": "Strategic Ops",
        "tagline": "Reverse-engineer your competitor's ad strategy."
    },
    {
        "id": "churn-detective",
        "title": "The Churn Sentinel",
        "category": "Sales Ops",
        "tagline": "Predict at-risk customers across 500 accounts."
    },
    {
        "id": "sales-roleplay-simulator",
        "title": "The Difficult Prospect Simulator",
        "category": "Sales Ops",
        "tagline": "Practice your pitch against AI."
    },
    {
        "id": "pricing-page-psychologist",
        "title": "The Pricing Auditor",
        "category": "CRO",
        "tagline": "Audit 10 pricing pages for conversion leaks."
    },
    {
        "id": "lead-scoring-logic-builder",
        "title": "The Lead Scorer",
        "category": "Sales Ops",
        "tagline": "Prioritize leads from your CRM or build a model from scratch."
    },
    {
        "id": "zzz-insta-outro",
        "title": "Get 500+ More Blueprints",
        "category": "RealExamples.com",
        "tagline": "Link in bio to download the full library."
    }
]

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def draw_text_wrapped(draw, text, x, y, font, max_width, fill):
    lines = []
    words = text.split()
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            lines.append(' '.join(current_line))
            current_line = [word]
    lines.append(' '.join(current_line))
    
    current_y = y
    for line in lines:
        draw.text((x, current_y), line, font=font, fill=fill)
        bbox = draw.textbbox((0, 0), line, font=font)
        current_y += (bbox[3] - bbox[1]) * 1.2
    return current_y

def generate_card(card):
    # Create background
    img = Image.new('RGB', IMAGE_SIZE, BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Draw radial grid pattern (simplified as dots for performance/clarity)
    dot_spacing = 40
    dot_radius = 1
    for i in range(0, IMAGE_SIZE[0], dot_spacing):
        for j in range(0, IMAGE_SIZE[1], dot_spacing):
            draw.ellipse([i-dot_radius, j-dot_radius, i+dot_radius, j+dot_radius], fill=GRID_COLOR)
            
    # Draw Category Badge
    try:
        badge_font = ImageFont.truetype(BOLD_FONT_PATH, 32)
    except:
        badge_font = ImageFont.load_default()
        
    category_text = card["category"].upper()
    bbox = draw.textbbox((0, 0), category_text, font=badge_font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    badge_padding_x = 32
    badge_padding_y = 12
    badge_x = 100
    badge_y = 150
    badge_rect = [badge_x, badge_y, badge_x + text_w + badge_padding_x*2, badge_y + text_h + badge_padding_y*2]
    
    draw.rounded_rectangle(badge_rect, radius=50, fill=ACCENT_COLOR)
    draw.text((badge_x + badge_padding_x, badge_y + badge_padding_y), category_text, font=badge_font, fill=TEXT_DARK)
    
    # Draw Title
    try:
        title_font = ImageFont.truetype(BOLD_FONT_PATH, 110)
    except:
        title_font = ImageFont.load_default()
        
    title_y = badge_y + text_h + badge_padding_y*2 + 60
    next_y = draw_text_wrapped(draw, card["title"], 100, title_y, title_font, 880, TEXT_WHITE)
    
    # Draw Tagline
    try:
        tagline_font = ImageFont.truetype(REGULAR_FONT_PATH, 48)
    except:
        tagline_font = ImageFont.load_default()
        
    draw_text_wrapped(draw, card["tagline"], 100, next_y + 20, tagline_font, 880, TEXT_GRAY)
    
    # Draw Bottom Bar
    try:
        site_font = ImageFont.truetype(BOLD_FONT_PATH, 42)
        label_font = ImageFont.truetype(BOLD_FONT_PATH, 28)
    except:
        site_font = ImageFont.load_default()
        label_font = ImageFont.load_default()
        
    draw.text((100, 930), "realaiexamples.com", font=site_font, fill=ACCENT_COLOR)
    
    label_text = "Agent Blueprint"
    l_bbox = draw.textbbox((0, 0), label_text, font=label_font)
    draw.text((1080 - 100 - (l_bbox[2]-l_bbox[0]), 940), label_text, font=label_font, fill=SITE_LABEL_COLOR)
    
    # Save
    filepath = os.path.join(OUTPUT_DIR, f"{card['id']}-card.png")
    img.save(filepath)
    print(f"✅ Generated {filepath}")

def main():
    ensure_dir(OUTPUT_DIR)
    for card in CARDS:
        generate_card(card)

if __name__ == "__main__":
    main()
