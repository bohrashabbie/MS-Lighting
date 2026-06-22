"""Isolate the product fixture from each confident hero page -> transparent PNG.

Crops out the top logo/model band and the bottom feature-icon row, then runs
rembg to drop the (light) background. Output: extract/cut/<model>.png (RGBA) and
a review montage on dark.
"""
import json
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ROOT = Path(__file__).resolve().parent
PNG = ROOT / "png"
CUT = ROOT / "cut"
CUT.mkdir(exist_ok=True)
manifest = json.loads((ROOT / "manifest.json").read_text())
session = new_session("u2net")

# crop window as fractions of page (exclude top logo/model + bottom icons/annotations)
CX0, CY0, CX1, CY1 = 0.05, 0.11, 0.96, 0.69

done = []
for p in manifest["products"]:
    if not p.get("model_code"):
        continue
    src_path = PNG / f"page-{p['hero_pdf_page']:03d}.png"
    if not src_path.exists():
        continue
    im = Image.open(src_path).convert("RGB")
    W, H = im.size
    crop = im.crop((int(W*CX0), int(H*CY0), int(W*CX1), int(H*CY1)))
    cut = remove(crop, session=session)            # RGBA transparent
    cut = cut.crop(cut.getbbox())                  # trim transparent margins
    slug = p["model_code"].lower().replace("/", "-")
    cut.save(CUT / f"{slug}.png")
    done.append((slug, cut))
    print("cut", slug, cut.size)

# montage on dark for review (6 cols)
cols = 6
rows = (len(done) + cols - 1) // cols
cell = 230
sheet = Image.new("RGB", (cols*cell, rows*cell), (16, 16, 22))
for i, (slug, img) in enumerate(done):
    r, c = divmod(i, cols)
    th = img.copy()
    th.thumbnail((cell-24, cell-24), Image.LANCZOS)
    x = c*cell + (cell-th.width)//2
    y = r*cell + (cell-th.height)//2
    sheet.paste(th, (x, y), th)
sheet.save(ROOT / "cut_review.png")
print("total", len(done), "-> cut_review.png")
