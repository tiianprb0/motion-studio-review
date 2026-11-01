import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition,openBrowser} from '@remotion/renderer';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),mode=args.includes('--stills')?'stills':(args.includes('--proof')||args.includes('--proof-extra'))?'proof':'full';
const draft=args.includes('--draft'),timing=JSON.parse(fs.readFileSync(path.join(root,'src/timing-v7.json'),'utf8'));
const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public'),outDir:path.join(root,'.bundle-v8')});
const browser=await openBrowser('chrome',{browserExecutable,logLevel:'error'});
const opts={serveUrl,id:'CaramuMintaMaafV8',logLevel:'error',browserExecutable,puppeteerInstance:browser};
try{
 const composition=await selectComposition(opts);fs.mkdirSync(path.join(root,'output'),{recursive:true});
 if(mode==='stills'){
  const dir=path.join(root,'previews-v8');fs.mkdirSync(dir,{recursive:true});
  const at=args.find(a=>a.startsWith('--at='));
  const times=at?at.split('=')[1].split(',').map(Number):timing.segments.flatMap(s=>[s.start+.5,s.start+(s.end-s.start)*.70]);
  for(const s of times){const frame=Math.min(composition.durationInFrames-1,Math.round(s*30));await renderStill({...opts,composition,frame,output:path.join(dir,`f${String(frame).padStart(5,'0')}.png`),scale:.5});console.log('still',frame)}
 }else if(mode==='proof'){
  const requests=args.includes('--proof-extra')?[['whip',12.8,1.5],['lid',31.5,1.5],['dialogue-fixed',51.5,1.5]]:[['door-phone',7.9,2],['night-martabak',28.2,2.3],['family-present',35.3,2.3],['dialogue',51.6,4.5]];
  for(const [name,start,len] of requests){const first=Math.round(start*30),last=Math.min(composition.durationInFrames-1,first+Math.round(len*30)-1);await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',`V8-proof-${name}.mp4`),frameRange:[first,last],scale:2/3,crf:25,concurrency:3,audioCodec:'aac',pixelFormat:'yuv420p'});console.log('proof',name)}
 }else{
  let last=-1;await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',draft?'Caramu-Minta-Maaf-V8-Draft.mp4':'Caramu-Minta-Maaf-V8-TikTok.mp4'),scale:draft?2/3:1,crf:draft?25:18,concurrency:3,audioCodec:'aac',audioBitrate:'192k',pixelFormat:'yuv420p',onProgress:({progress})=>{const p=Math.floor(progress*10);if(p!==last){last=p;console.log(`Rendering ${p*10}%`)}}});console.log('V8 export complete')
 }
}finally{await browser.close({silent:true})}
