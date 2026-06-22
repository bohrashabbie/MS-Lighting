from PIL import Image
from pathlib import Path

WEB = Path("web")
src = Image.open("assets/ms-lighting-logo-007.png").convert("RGBA")
# drop the gray page-gradient region — keep only the white logo box (left side)
src = src.crop((2, 2, 268, 168))

def to_transparent(im, hi=235, lo=190):
    gray = im.convert("L")
    mask = gray.point(lambda p: 0 if p >= hi else (255 if p <= lo else int((hi - p) / (hi - lo) * 255)))
    im = im.copy(); im.putalpha(mask)
    bb = im.getbbox()
    return im.crop(bb) if bb else im

logo = to_transparent(src)
logo.save(WEB / "public" / "logo.png")
print("logo", logo.size)

W, H = logo.size
mono = logo.crop((0, 0, W, int(H * 0.66)))
bb = mono.getbbox()
if bb: mono = mono.crop(bb)
s = max(mono.size) + 40
canvas = Image.new("RGBA", (s, s), (0, 0, 0, 0))
canvas.paste(mono, ((s - mono.width) // 2, (s - mono.height) // 2), mono)
canvas.resize((512, 512), Image.LANCZOS).save(WEB / "app" / "icon.png")
canvas.resize((180, 180), Image.LANCZOS).save(WEB / "app" / "apple-icon.png")
print("mono", mono.size)
