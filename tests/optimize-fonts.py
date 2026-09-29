from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

root = Path(__file__).resolve().parents[1]
folder = root / 'public' / 'fonts'
source = root / 'artifacts' / 'font-sources'
source.mkdir(parents=True, exist_ok=True)
for filename, axes in [('Unbounded', {'wght': 850}), ('NotoSansDisplay', {}), ('NotoSerif-Italic', {'wght': 400, 'wdth': 100})]:
    path = folder / f'{filename}.ttf'
    if not path.exists():
        path = source / path.name
    font = TTFont(path)
    if axes:
        font = instantiateVariableFont(font, axes, inplace=True)
    if filename == 'Unbounded':
        sub = subset.Subsetter()
        sub.populate(unicodes=list(range(0x20, 0x180)) + list(range(0x400, 0x530)) + list(range(0x2000, 0x2070)) + [0x2116, 0x2191, 0x2193, 0x2197])
        sub.subset(font)
    font.flavor = 'woff2'
    destination = folder / f'{filename}.woff2'
    font.save(destination)
    if path.parent != source:
        path.replace(source / path.name)
    print(filename, destination.stat().st_size)

license_text = (folder / 'notosansdisplay-OFL.txt').read_text(encoding='utf-8')
license_text = license_text.replace('Copyright 2012 Google Inc. All Rights Reserved.', 'Copyright 2022 The Noto Project Authors (https://github.com/notofonts/latin-greek-cyrillic)')
(folder / 'notoserif-OFL.txt').write_text(license_text, encoding='utf-8')
