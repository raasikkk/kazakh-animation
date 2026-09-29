"""One-time conversion of authored Kazakh copy to a consistent Latin spelling."""
from pathlib import Path

mapping = dict(zip(
    'аәбвгғдеёжзийкқлмнңоөпрстуұүфхһцчшщъыіьэюя',
    ['a', 'ä', 'b', 'v', 'g', 'ğ', 'd', 'e', 'yo', 'j', 'z', 'i', 'y', 'k', 'q', 'l', 'm', 'n', 'ñ', 'o', 'ö', 'p', 'r', 's', 't', 'u', 'ū', 'ü', 'f', 'h', 'h', 'ts', 'ç', 'ş', 'şş', '', 'y', 'i', '', 'e', 'yu', 'ya'],
))
mapping.update({key.upper(): value.upper() for key, value in list(mapping.items())})
root = Path(__file__).resolve().parents[1]
for relative in ['src/App.tsx', 'src/data/ornament.ts', 'index.html']:
    path = root / relative
    text = path.read_text(encoding='utf-8')
    text = ''.join(mapping.get(character, character) for character in text)
    if relative == 'index.html':
        text = text.replace('lang="kk"', 'lang="kk-Latn"')
    path.write_text(text, encoding='utf-8', newline='\n')
    print(relative, 'converted')
