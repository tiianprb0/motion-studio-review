import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition,openBrowser} from '@remotion/renderer';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),mode=args.includes('--stills')?'stills':(args.includes('--proof')||args.includes('--proof-extra'))?'proof':'full';
const draft=args.includes('--draft'),timing=JSON.parse(fs.readFileSync(path.join(root,'src/timing-v7.json'),'utf8'));
const browserExecutable=path.join(root,'scripts/chrome-cpu-render.sh');
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public'),outDir:path.join(root,'.bundle-v12')});
const browser=await openBrowser('chrome',{browserExecutable,logLevel:'error'});
const opts={serveUrl,id:'CaramuMintaMaafV12',logLevel:'error',browserExecutable,puppeteerInstance:browser};
try{
 const composition=await selectComposition(opts);fs.mkdirSync(path.join(root,'output'),{recursive:true});
 if(mode==='stills'){
  const dir=path.join(root,'previews-v12');fs.mkdirSync(dir,{recursive:true});
  const at=args.find(a=>a.startsWith('--at='));
  const times=at?at.split('=')[1].split(',').map(Number):timing.segments.flatMap(s=>[s.start+.5,s.start+(s.end-s.start)*.70]);
  for(const s of times){const frame=Math.min(composition.durationInFrames-1,Math.round(s*30));await renderStill({...opts,composition,frame,output:path.join(dir,`f${String(frame).padStart(5,'0')}.png`),scale:.5});console.log('still',frame)}
 }else if(mode==='proof'){
  const requests=args.includes('--one')? [['caption18',17.8,2.1]]:[['caption18',17.8,2.1],['caption52',51.9,1.7],['caption55',55.3,2.0],['box35',35.0,2.5],['box46',46.0,2.7]];
  for(const [name,start,len] of requests.filter(r=>!args.includes('--rest')||r[0]!=='caption18').filter(r=>!args.some(a=>a.startsWith('--only='))||r[0]===args.find(a=>a.startsWith('--only=')).split('=')[1])){const first=Math.round(start*30),last=Math.min(composition.durationInFrames-1,first+Math.round(len*30)-1);await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',`V12-proof-${name}.mp4`),frameRange:[first,last],scale:2/3,crf:25,concurrency:1,audioCodec:'aac',pixelFormat:'yuv420p'});console.log('proof',name)}
 }else{
  let last=-1;await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',draft?'Caramu-Minta-Maaf-V12-Draft.mp4':'Caramu-Minta-Maaf-V12-TikTok.mp4'),scale:draft?2/3:1,crf:draft?25:18,concurrency:1,audioCodec:'aac',audioBitrate:'192k',pixelFormat:'yuv420p',onProgress:({progress})=>{const p=Math.floor(progress*10);if(p!==last){last=p;console.log(`Rendering ${p*10}%`)}}});console.log('V12 export complete')
 }
}finally{await browser.close({silent:true})}
