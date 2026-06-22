"""
Fill manifest.json with model codes + categories read from the contact sheets.

Only CONFIDENTLY identified product heroes get a model_code (and are seeded).
Section dividers, lifestyle photos, multi-model spec tables and blurry/uncertain
pages are left model_code=None + needs_review=True, so the seed script skips them
and they can be completed from the CMS admin after checking the real catalog.

Run:  python extract/fill_manifest.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "manifest.json"

# index -> (model_code, category, name_en)   confident product heroes only
DATA = {
    1:  ("MS-240R", "Recessed Down Light", "MS-240R Recessed Down Light"),
    2:  ("MS-241",  "Recessed Down Light", "MS-241 Recessed Down Light"),
    3:  ("MS-252",  "Surface Mounted Down Light", "MS-252 Surface Mounted Down Light"),
    5:  ("MS-250",  "Recessed Down Light", "MS-250 Recessed Down Light"),
    6:  ("MS-242",  "Recessed Down Light", "MS-242 Recessed Down Light"),
    7:  ("MS-220GR", "Recessed Grille Spot Light", "MS-220GR Recessed Grille Spot Light"),
    8:  ("MS-257",  "Surface Mounted Down Light", "MS-257 Surface Mounted Down Light"),
    10: ("MS-1140", "Recessed Panel Light", "MS-1140 Recessed Panel Light"),
    12: ("MS-341AR", "Recessed Spot Light", "MS-341AR Recessed Spot Light"),
    13: ("MS-342BR", "Recessed Spot Light", "MS-342BR Recessed Spot Light"),
    14: ("MS-342CR", "Recessed Spot Light", "MS-342CR Recessed Spot Light"),
    15: ("MS-304",  "Recessed Spot Light", "MS-304 Recessed Spot Light"),
    16: ("MS-329",  "Recessed Spot Light", "MS-329 Recessed Spot Light"),
    18: ("MS-328AR", "Recessed Spot Light", "MS-328AR Recessed Spot Light"),
    19: ("MS-347A", "Recessed Spot Light", "MS-347A Recessed Spot Light"),
    20: ("MS-344",  "Recessed Spot Light", "MS-344 Recessed Spot Light"),
    21: ("MS-350",  "Recessed Spot Light", "MS-350 Recessed Spot Light"),
    23: ("M3",      "Module Series", "M3 Module Series"),
    24: ("M4",      "Module Series", "M4 Module Series"),
    26: ("MS-S01Q", "Module Series", "MS-S01Q Module Series"),
    27: ("MS-S01IR", "Module Series", "MS-S01IR Module Series"),
    28: ("MS-T8",   "Linear Light", "MS-T8 Linear Light"),
    29: ("MS-T9",   "Linear Light", "MS-T9 Linear Light"),
    30: ("MS-T14",  "Linear Light", "MS-T14 Linear Light"),
    31: ("MS-T17",  "Linear Light", "MS-T17 Linear Light"),
    32: ("MS-T19",  "Linear Light", "MS-T19 Linear Light"),
    33: ("MS-T12",  "Linear Light", "MS-T12 Tri-proof Linear Light"),
    34: ("MS-T21",  "Linear Light", "MS-T21 Tri-proof Linear Light"),
    35: ("MS-T22",  "Linear Light", "MS-T22 Tri-proof Linear Light"),
    37: ("MS-601C", "Track Spot Light", "MS-601C Track Spot Light"),
    38: ("MS-602",  "Track Spot Light", "MS-602 Track Spot Light"),
    42: ("MS20Y",   "Magnet Light", "MS20Y Magnet Light"),
    43: ("MS20S",   "Magnet Light", "MS20S Magnet Light"),
    47: ("MS20Y-G", "Magnet Light", "MS20Y Magnet Grille Light"),
    49: ("MS16S",   "Magnet Light", "MS16S Magnet Light"),
    52: ("MS35Y",   "Magnet Light", "MS35Y Magnet Light"),
    68: ("MS-W13",  "Wall Light", "MS-W13 Wall Light"),
    69: ("MS-W26",  "Wall Light", "MS-W26 Wall Light"),
    70: ("MS-L01A", "Lawn Light", "MS-L01A Lawn Light"),
    71: ("MS-L02",  "Lawn Light", "MS-L02 Lawn Light"),
    72: ("MS-S11A", "Street Light", "MS-S11A Street Light"),
    88: ("MS-413",  "Flood Light", "MS-413 LED Flood Light"),
    89: ("MS-415",  "Flood Light", "MS-415 LED Flood Light"),
    90: ("VAN-T08", "High Bay", "VAN-T08 High Bay"),
    92: ("MS-W01",  "Wall Light", "MS-W01 Wall Light"),
    93: ("MS-W07A", "Wall Light", "MS-W07A Wall Light"),
    94: ("MS-W06A", "Wall Light", "MS-W06A Wall Light"),
    95: ("MS-O1",   "Ceiling Light", "MS-O1 Ceiling Light"),
}


def main():
    data = json.loads(MANIFEST.read_text())
    filled = 0
    for p in data["products"]:
        info = DATA.get(p["index"])
        if info:
            p["model_code"], p["category"], p["name_en"] = info
            p["needs_review"] = False
            filled += 1
        else:
            p["model_code"] = None
            p["category"] = None
            p["needs_review"] = True
    MANIFEST.write_text(json.dumps(data, indent=2))
    print(f"[fill] {filled} confident products; {len(data['products']) - filled} left for review")


if __name__ == "__main__":
    main()
