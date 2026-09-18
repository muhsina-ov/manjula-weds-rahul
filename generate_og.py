import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_wedding_og_image():
    width = 1200
    height = 630
    
    # 1. Base Background: Use the warm temple backdrop with an artistic royal crimson/gold gradient overlay
    bg_path = os.path.join("assets", "images", "temple_bg.jpg")
    if os.path.exists(bg_path):
        base_img = Image.open(bg_path).convert("RGBA")
        # Center crop & resize to 1200x630
        img_ratio = base_img.width / base_img.height
        target_ratio = width / height
        if img_ratio > target_ratio:
            new_w = int(base_img.height * target_ratio)
            left = (base_img.width - new_w) // 2
            base_img = base_img.crop((left, 0, left + new_w, base_img.height))
        else:
            new_h = int(base_img.width / target_ratio)
            top = (base_img.height - new_h) // 2
            base_img = base_img.crop((0, top, base_img.width, top + new_h))
        base_img = base_img.resize((width, height), Image.Resampling.LANCZOS)
        # Apply subtle atmospheric blur to make typography pop crystal-clear
        base_img = base_img.filter(ImageFilter.GaussianBlur(radius=2.5))
    else:
        base_img = Image.new("RGBA", (width, height), (59, 6, 15, 255))

    # 2. Rich Royal Tint & Vignette Overlay (Deep Crimson & Antique Gold)
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    
    # Radial dark vignette from center
    for r in range(width // 2, 0, -2):
        alpha = int(180 + (1.0 - (r / (width / 2))) * 40)
        alpha = min(220, max(160, alpha))
    
    # Semi-transparent royal dark maroon tint over entire image
    draw_overlay.rectangle([(0, 0), (width, height)], fill=(40, 5, 12, 195))
    
    # Inner royal invitation card container
    margin_x = 45
    margin_y = 35
    card_box = [(margin_x, margin_y), (width - margin_x, height - margin_y)]
    draw_overlay.rectangle(card_box, fill=(54, 8, 18, 140))
    
    base_img = Image.alpha_composite(base_img, overlay)
    draw = ImageDraw.Draw(base_img)

    # 3. Double Gold Borders & Corner Ornaments
    gold_color = (212, 175, 55, 255)       # #D4AF37
    gold_light = (250, 235, 170, 255)     # #FAEBAA
    gold_dark = (168, 123, 29, 255)
    cream_white = (255, 250, 240, 255)
    saffron = (245, 158, 11, 255)

    # Outer gold border
    draw.rectangle(card_box, outline=gold_color, width=3)
    
    # Inner delicate gold border
    inner_pad = 12
    inner_box = [
        (margin_x + inner_pad, margin_y + inner_pad),
        (width - margin_x - inner_pad, height - margin_y - inner_pad)
    ]
    draw.rectangle(inner_box, outline=gold_dark, width=1)

    # Corner decorative flourishes
    def draw_corner_ornament(cx, cy, flip_x=1, flip_y=1):
        points = [
            (cx, cy),
            (cx + 30 * flip_x, cy),
            (cx + 25 * flip_x, cy + 5 * flip_y),
            (cx + 5 * flip_x, cy + 25 * flip_y),
            (cx, cy + 30 * flip_y)
        ]
        draw.polygon(points, fill=gold_color)
        draw.ellipse([(cx + 10 * flip_x - 3, cy + 10 * flip_y - 3), 
                      (cx + 10 * flip_x + 3, cy + 10 * flip_y + 3)], fill=gold_light)

    draw_corner_ornament(margin_x + inner_pad, margin_y + inner_pad, 1, 1)
    draw_corner_ornament(width - margin_x - inner_pad, margin_y + inner_pad, -1, 1)
    draw_corner_ornament(margin_x + inner_pad, height - margin_y - inner_pad, 1, -1)
    draw_corner_ornament(width - margin_x - inner_pad, height - margin_y - inner_pad, -1, -1)

    # 4. Typography Fonts
    font_devanagari = "C:/Windows/Fonts/Nirmala.ttc"
    font_serif_b = "C:/Windows/Fonts/georgiab.ttf"
    font_serif_r = "C:/Windows/Fonts/georgia.ttf"
    font_cambria_b = "C:/Windows/Fonts/cambriab.ttf"
    font_times_b = "C:/Windows/Fonts/timesbd.ttf"
    font_times_i = "C:/Windows/Fonts/timesbi.ttf"

    font_shloka = ImageFont.truetype(font_devanagari, 25, index=0)
    font_header = ImageFont.truetype(font_serif_b, 17)
    font_couple = ImageFont.truetype(font_times_b, 58)
    font_weds = ImageFont.truetype(font_times_i, 38)
    font_details = ImageFont.truetype(font_cambria_b, 22)
    font_venue = ImageFont.truetype(font_serif_r, 20)
    font_family = ImageFont.truetype(font_serif_b, 17)

    def draw_centered_text(text, y, font, fill, shadow_color=(0, 0, 0, 180), shadow_offset=(2, 2)):
        bbox = draw.textbbox((0, 0), text, font=font)
        text_w = bbox[2] - bbox[0]
        x = (width - text_w) // 2
        if shadow_color:
            draw.text((x + shadow_offset[0], y + shadow_offset[1]), text, font=font, fill=shadow_color)
        draw.text((x, y), text, font=font, fill=fill)
        return y + (bbox[3] - bbox[1])

    # 5. Auspicious Shloka & Invocation Header
    current_y = 65
    current_y = draw_centered_text("||  श्री गणेशाय नमः  ||", current_y, font_shloka, gold_light) + 12
    current_y = draw_centered_text("ROYAL WEDDING INVITATION", current_y, font_header, saffron, shadow_offset=(1, 1)) + 16

    # Decorative lotus / gold line divider
    line_y = current_y
    draw.line([(width // 2 - 160, line_y), (width // 2 - 30, line_y)], fill=gold_color, width=1)
    draw.line([(width // 2 + 30, line_y), (width // 2 + 160, line_y)], fill=gold_color, width=1)
    # Auspicious symbol in center
    draw.ellipse([(width // 2 - 8, line_y - 8), (width // 2 + 8, line_y + 8)], fill=gold_light, outline=gold_color)
    current_y += 24

    # 6. The Royal Couple Names
    # "Dr. Manjula"
    bbox_b = draw.textbbox((0, 0), "Dr. Manjula", font=font_couple)
    w_b = bbox_b[2] - bbox_b[0]

    # "weds"
    bbox_w = draw.textbbox((0, 0), "weds", font=font_weds)
    w_w = bbox_w[2] - bbox_w[0]

    # "Dr. Rahul"
    bbox_g = draw.textbbox((0, 0), "Dr. Rahul", font=font_couple)
    w_g = bbox_g[2] - bbox_g[0]

    # Render couple on one magnificent regal line: Dr. Manjula  •  weds  •  Dr. Rahul
    couple_y = current_y
    total_couple_w = w_b + 40 + w_w + 40 + w_g
    start_x = (width - total_couple_w) // 2

    # Dr. Manjula
    draw.text((start_x + 2, couple_y + 2), "Dr. Manjula", font=font_couple, fill=(0, 0, 0, 220))
    draw.text((start_x, couple_y), "Dr. Manjula", font=font_couple, fill=gold_light)

    # weds knot
    weds_x = start_x + w_b + 40
    draw.text((weds_x + 1, couple_y + 12), "weds", font=font_weds, fill=(0, 0, 0, 200))
    draw.text((weds_x, couple_y + 10), "weds", font=font_weds, fill=saffron)

    # Dr. Rahul
    groom_x = weds_x + w_w + 40
    draw.text((groom_x + 2, couple_y + 2), "Dr. Rahul", font=font_couple, fill=(0, 0, 0, 220))
    draw.text((groom_x, couple_y), "Dr. Rahul", font=font_couple, fill=gold_light)

    current_y = couple_y + (bbox_b[3] - bbox_b[1]) + 28

    # Lineage snippet pill
    lineage_text = "D/o Amrika & Makhan Lal Thakur   |   S/o Dharma & Suresh Chandra Chaudhary"
    draw_centered_text(lineage_text, current_y, ImageFont.truetype(font_serif_r, 16), (235, 215, 185, 240), shadow_offset=(1, 1))
    current_y += 38

    # 7. Ceremony Dates Box (23 • 24 • 25 November 2026)
    dates_box_w = 460
    dates_box_h = 44
    db_x1 = (width - dates_box_w) // 2
    db_y1 = current_y
    draw.rectangle([(db_x1, db_y1), (db_x1 + dates_box_w, db_y1 + dates_box_h)], 
                   fill=(84, 14, 26, 220), outline=gold_color, width=1)
    
    dates_text = "23  •  24  •  25  NOVEMBER  2026"
    draw_centered_text(dates_text, current_y + 9, font_details, gold_light, shadow_offset=(1, 1))
    current_y += dates_box_h + 20

    # 8. Venue & City
    venue_text = "Terapanth Bhawan  •  Udhna, Surat, Gujarat"
    draw_centered_text(venue_text, current_y, font_venue, cream_white, shadow_offset=(1, 1))
    current_y += 34

    # 9. Host Family Signature Footer
    family_text = "Cordially Invited by: Chaudhary & Thakur Family"
    draw_centered_text(family_text, current_y, font_family, gold_color, shadow_offset=(1, 1))

    # Convert to RGB and save as optimized JPG (< 250KB for instant WhatsApp/Facebook fetching)
    final_img = base_img.convert("RGB")
    
    # Save in root directory and assets
    out_root = "og-image.jpg"
    out_assets = os.path.join("assets", "images", "og-image.jpg")
    
    final_img.save(out_root, format="JPEG", quality=92, optimize=True)
    final_img.save(out_assets, format="JPEG", quality=92, optimize=True)
    
    size_kb = os.path.getsize(out_root) / 1024
    print(f"[SUCCESS] Generated {out_root} ({width}x{height}, {size_kb:.1f} KB)")
    print(f"[SUCCESS] Generated {out_assets}")

if __name__ == "__main__":
    create_wedding_og_image()
