"""
MS-Lighting catalog -> product image pipeline.

Reads the rendered catalog pages in extract/png/ (page-007.png ... page-204.png),
pairs them into products (odd = hero / product photo, even = spec / technical),
optimizes each to WebP for the web, writes a manifest.json describing every
product, and builds full-page contact sheets so the model code + category for
each product can be read and filled into the manifest.

Run:
    python extract/build_pipeline.py sheets     # build contact sheets for review
    python extract/build_pipeline.py web        # build optimized webp images
    python extract/build_pipeline.py manifest   # (re)write manifest.json
    python extract/build_pipeline.py all
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
PNG_DIR = ROOT / "png"
WEB_DIR = ROOT / "web"
SHEET_DIR = ROOT / "sheets"
MANIFEST = ROOT / "manifest.json"

FIRST_PAGE = 7          # PDF page of first product hero (printed page 1)
LAST_PAGE = 204
PRINTED_OFFSET = 6      # printed_page = pdf_page - 6


def page_path(n: int) -> Path:
    return PNG_DIR / f"page-{n:03d}.png"


def product_pairs():
    """Yield (index, hero_pdf_page, spec_pdf_page) first-pass pairs."""
    idx = 1
    for hero in range(FIRST_PAGE, LAST_PAGE + 1, 2):
        spec = hero + 1
        if not page_path(hero).exists():
            continue
        spec_page = spec if page_path(spec).exists() else None
        yield idx, hero, spec_page
        idx += 1


# ---------------------------------------------------------------------------
def build_manifest():
    products = []
    for idx, hero, spec in product_pairs():
        products.append({
            "index": idx,
            "hero_pdf_page": hero,
            "spec_pdf_page": spec,
            "printed_page": hero - PRINTED_OFFSET,
            "hero_file": f"page-{hero:03d}.webp",
            "spec_file": f"page-{spec:03d}.webp" if spec else None,
            # to be filled from the contact sheets:
            "model_code": None,
            "category": None,
            "name_en": None,
            "needs_review": False,
        })
    MANIFEST.write_text(json.dumps({"products": products}, indent=2))
    print(f"[manifest] wrote {len(products)} products -> {MANIFEST}")
    return products


# ---------------------------------------------------------------------------
def build_web(quality: int = 82, max_w: int = 1100):
    WEB_DIR.mkdir(exist_ok=True)
    n = 0
    for p in sorted(PNG_DIR.glob("page-*.png")):
        out = WEB_DIR / (p.stem + ".webp")
        if out.exists():
            continue
        im = Image.open(p).convert("RGB")
        if im.width > max_w:
            h = round(im.height * max_w / im.width)
            im = im.resize((max_w, h), Image.LANCZOS)
        im.save(out, "WEBP", quality=quality, method=6)
        n += 1
    print(f"[web] wrote {n} webp images -> {WEB_DIR}")


# ---------------------------------------------------------------------------
def build_sheets(cols: int = 4, rows: int = 3, thumb_w: int = 440):
    """Full-page contact sheets of HERO pages for reading model codes."""
    SHEET_DIR.mkdir(exist_ok=True)
    heroes = [(idx, hero) for idx, hero, _ in product_pairs()]
    per = cols * rows
    try:
        font = ImageFont.truetype("arialbd.ttf", 26)
    except Exception:
        font = ImageFont.load_default()

    sheet_no = 0
    for start in range(0, len(heroes), per):
        chunk = heroes[start:start + per]
        sample = Image.open(page_path(chunk[0][1]))
        thumb_h = round(sample.height * thumb_w / sample.width)
        pad = 8
        label_h = 34
        cell_w = thumb_w + pad * 2
        cell_h = thumb_h + pad * 2 + label_h
        sheet = Image.new("RGB", (cell_w * cols, cell_h * rows), "white")
        draw = ImageDraw.Draw(sheet)
        for i, (idx, hero) in enumerate(chunk):
            r, c = divmod(i, cols)
            x = c * cell_w + pad
            y = r * cell_h + pad + label_h
            im = Image.open(page_path(hero)).convert("RGB").resize((thumb_w, thumb_h), Image.LANCZOS)
            sheet.paste(im, (x, y))
            draw.text((x, r * cell_h + 4), f"#{idx}  (pg {hero - PRINTED_OFFSET})",
                      fill="#8B1A1A", font=font)
        sheet_no += 1
        out = SHEET_DIR / f"sheet-{sheet_no:02d}.png"
        sheet.save(out)
        print(f"[sheets] {out}  ({len(chunk)} products: #{chunk[0][0]}-#{chunk[-1][0]})")
    print(f"[sheets] done: {sheet_no} sheets")


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "all"
    if cmd in ("manifest", "all"):
        build_manifest()
    if cmd in ("sheets", "all"):
        build_sheets()
    if cmd in ("web", "all"):
        build_web()

#start .ipynb