"""Make a transparent-background logo from a rendered PNG whose backdrop is near-white.

The backdrop is border-connected, so a border-seeded flood fill (on a quarter-res grey
copy, for speed) removes it while interior whites stay opaque. The mask is then feathered
and mapped onto the site's cream palette.

    python scripts/make-logo-transparent.py SRC.png public/images/logo.png [max_width]
"""
import sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC, DST = sys.argv[1], sys.argv[2]
MAX_W = int(sys.argv[3]) if len(sys.argv) > 3 else 1200

WHITE = 250     # a pixel this bright can seed/continue the backdrop fill
TOL = 8         # per-seed tolerance, in grey levels
FEATHER = 0.9   # px blur on the full-res mask
PAD = 0.02      # crop margin, fraction of the longest side

im = Image.open(SRC).convert("RGB")
W, H = im.size

# 1. backdrop region, marked as 0, at quarter res
sq = im.convert("L").resize((W // 4, H // 4), Image.LANCZOS)
sw, sh = sq.size
seeds = [(x, 0) for x in range(0, sw, 4)] + [(x, sh - 1) for x in range(0, sw, 4)] + \
        [(0, y) for y in range(0, sh, 4)] + [(sw - 1, y) for y in range(0, sh, 4)]
for seed in seeds:
    if sq.getpixel(seed) < WHITE:   # a border pixel that is artwork, not backdrop
        continue
    ImageDraw.floodfill(sq, seed, 0, thresh=TOL)
backdrop = np.asarray(sq) == 0

# 2. full-res mask, feathered
alpha = Image.fromarray(np.where(backdrop, 0, 255).astype(np.uint8)).resize((W, H), Image.LANCZOS)
alpha = alpha.filter(ImageFilter.GaussianBlur(FEATHER))
alpha = Image.fromarray(np.clip((np.asarray(alpha).astype(np.float32) - 8) * 255 / 247, 0, 255).astype(np.uint8))

# 3. crop to artwork, downscale
bbox = alpha.point(lambda v: 255 if v > 16 else 0).getbbox()
if bbox:
    pad = int(max(W, H) * PAD)
    bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
            min(W, bbox[2] + pad), min(H, bbox[3] + pad))
    im, alpha = im.crop(bbox), alpha.crop(bbox)

out = im.convert("RGBA")
out.putalpha(alpha)
if out.width > MAX_W:
    out = out.resize((MAX_W, round(out.height * MAX_W / out.width)), Image.LANCZOS)
out.save(DST, optimize=True)
print(f"{SRC} -> {DST}  {W}x{H} -> {out.size}  backdrop removed "
      f"{backdrop.mean():.1%}  {len(out.tobytes()) / 1e6:.2f} MB raw")
