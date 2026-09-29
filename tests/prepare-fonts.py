"""Download OFL fonts, subset locally, and verify the Kazakh alphabet."""
from pathlib import Path
from urllib.request import urlretrieve
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / 'public' / 'fonts'
assets = [
    ('notosansdisplay/NotoSansDisplay%5Bwdth,wght%5D.ttf', 'NotoSansDisplay.ttf'),
    ('notoserif/NotoSerif-Italic%5Bwdth,wght%5D.ttf', 'NotoSerif-Italic.ttf'),
]
characters = list(range(0x20, 0x180)) + list(range(0x400, 0x530)) + list(range(0x2000, 0x2070)) + [0x2116, 0x2191, 0x2193, 0x2197]
required = [0x4D8, 0x4D9, 0x492, 0x493, 0x49A, 0x49B, 0x4A2, 0x4A3, 0x4E8, 0x4E9, 0x4B0, 0x4B1, 0x4AE, 0x4AF, 0x4BA, 0x4BB, 0x406, 0x456]
for source, filename in assets:
    path = root / filename
    urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/' + source, path)
    font = TTFont(path)
    missing = [hex(c) for c in required if c not in font.getBestCmap()]
    if missing:
        raise ValueError(f'{filename}: {missing}')
    options = subset.Options()
    options.layout_features = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=characters)
    sub.subset(font)
    font.save(path)
    print(filename, path.stat().st_size, 'Kazakh alphabet OK')
for family in ['notosansdisplay', 'notoserif']:
    urlretrieve(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt', root / f'{family}-OFL.txt')
