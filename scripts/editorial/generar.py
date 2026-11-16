"""Recrear PDF a partir del HTML editorial revisable. Requiere Chromium y playwright."""
import argparse, asyncio, base64, re, shutil
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[2]
async def main():
 parser=argparse.ArgumentParser();parser.add_argument('--logo',type=Path);parser.add_argument('--chromium',default='/usr/bin/chromium');parser.add_argument('--aplicar',action='store_true');args=parser.parse_args()
 out=ROOT/'.editorial-pdf';out.mkdir(exist_ok=True)
 logo=''
 if args.logo:
  ext=args.logo.suffix.lower();mime={'.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml'}.get(ext)
  if not mime:raise ValueError('Usar logo PNG, JPG o SVG oficial.')
  logo='data:'+mime+';base64,'+base64.b64encode(args.logo.read_bytes()).decode()
 else:print('PENDIENTE: sin logo oficial; se genera una prueba sin marca de agua.')
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path=args.chromium,args=['--no-sandbox'])
  page=await b.new_page()
  for source in sorted((ROOT/'editorial').glob('informe-*.html')):
   n,version=re.match(r'informe-(\d+)-(web|prensa)',source.stem).groups()
   html=source.read_text()
   if logo:
    mark='<img alt="" src="'+logo+'" style="position:fixed;top:35%;left:calc(50% - 35mm);width:70mm;height:auto;opacity:.035;z-index:-1;pointer-events:none">'
    html=html.replace('<body>','<body>'+mark)
   await page.set_content(html);await page.evaluate('document.fonts.ready')
   header='<div style="font-family:Arial;width:100%;margin:0 18mm;padding-bottom:7px;border-bottom:2px solid #c8102e;font-size:9px;color:#575e66"><b style="color:#c8102e;font-size:12px">V.A.LO.MI.</b><span style="float:right">INFORME '+n+' · '+version.upper()+'</span></div>'
   footer='<div style="font-family:Arial;font-size:9px;color:#575e66;width:100%;margin:0 18mm;border-top:1px solid #cfd3d8;padding-top:7px">valomi.com.ar<span style="float:right"><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
   dest=out/(source.stem+'.pdf')
   await page.pdf(path=str(dest),format='A4',print_background=True,display_header_footer=True,header_template=header,footer_template=footer,margin={'top':'22mm','bottom':'20mm','left':'18mm','right':'18mm'})
   if args.aplicar:
    if version=='web':target=next((ROOT/'content/informes-pdf').glob('*n-'+n+'-*/pdf.pdf'))
    else:target=ROOT/'public/documentos/informe-'+n+'-prensa.pdf'
    shutil.copy(dest,target)
   print(dest.name)
  await b.close()
asyncio.run(main())
