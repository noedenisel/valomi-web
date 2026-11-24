"""Maqueta un único informe revisado; no toca los demás PDF ni publica archivos."""
import argparse
import asyncio
import base64
import html
from pathlib import Path
from playwright.async_api import async_playwright


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--html', type=Path, required=True)
    parser.add_argument('--salida', type=Path, required=True)
    parser.add_argument('--numero', type=int, required=True)
    parser.add_argument('--version', choices=['web', 'prensa'], required=True)
    parser.add_argument('--logo', type=Path)
    parser.add_argument('--chromium', default='/usr/bin/chromium')
    args = parser.parse_args()
    document = args.html.read_text()
    logo = ''
    if args.logo:
        mime = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp'}.get(args.logo.suffix.lower())
        if not mime:
            raise ValueError('El logo debe ser PNG, JPG, SVG o WebP.')
        logo = f'data:{mime};base64,' + base64.b64encode(args.logo.read_bytes()).decode()
        document = document.replace('<body>', '<body><img class="marca-agua" alt="" src="' + logo + '">', 1)
    else:
        print('PENDIENTE: prueba sin marca de agua; falta el archivo del logo oficial.')
    logo_header = '<img src="' + logo + '" style="width:30px;height:auto;margin-right:8px">' if logo else ''
    header = ('<div style="font-family:Arial;width:100%;margin:0 18mm;padding-bottom:5px;border-bottom:2px solid #c8102e;font-size:9pt;color:#575e66;display:flex;align-items:center">'
              + logo_header + '<b style="color:#c8102e;font-size:12pt">V.A.LO.MI.</b><span style="margin-left:auto">INFORME '
              + str(args.numero) + ' · ' + html.escape(args.version.upper()) + '</span></div>')
    footer = '<div style="font-family:Arial;font-size:9pt;color:#575e66;width:100%;margin:0 18mm;border-top:1px solid #cfd3d8;padding-top:5px;display:flex;justify-content:space-between"><span>valomi.com.ar</span><span>Página <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=args.chromium, args=['--no-sandbox'])
        page = await browser.new_page()
        await page.route('http**://**/*', lambda route: route.abort())
        await page.set_content(document, wait_until='load')
        await page.evaluate('document.fonts.ready')
        args.salida.parent.mkdir(parents=True, exist_ok=True)
        await page.pdf(path=str(args.salida), format='A4', print_background=True, display_header_footer=True,
                       header_template=header, footer_template=footer, prefer_css_page_size=True,
                       margin={'top': '22mm', 'bottom': '20mm', 'left': '18mm', 'right': '18mm'}, tagged=True, outline=True)
        await browser.close()
    print(args.salida)


if __name__ == '__main__':
    asyncio.run(main())
