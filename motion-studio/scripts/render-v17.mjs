import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition,openBrowser} from '@remotion/renderer';
import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),mode=args.includes('--stills')?'stills':(args.includes('--proof')||args.includes('--proof-extra'))?'proof':'full';
const draft=args.includes('--draft'),timing=JSON.parse(fs.readFileSync(path.join(root,'src/timing-v17.json'),'utf8'));
const browserExecutable=path.join(root,'scripts/chrome-cpu-render.sh');
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public'),outDir:path.join(root,'.bundle-v17')});
const browser=await openBrowser('chrome',{browserExecutable,logLevel:'error'});
const opts={serveUrl,id:'EmpatiPunyaBatasV17',logLevel:'error',browserExecutable,puppeteerInstance:browser};
try{
 const composition=await selectComposition(opts);fs.mkdirSync(path.join(root,'output'),{recursive:true});
 if(mode==='stills'){
  const dir=path.join(root,'previews-v17');fs.mkdirSync(dir,{recursive:true});
  const at=args.find(a=>a.startsWith('--at='));
  const times=at?at.split('=')[1].split(',').map(Number):timing.segments.flatMap(s=>[s.start+.5,s.start+(s.end-s.start)*.70]);
  for(const s of times){const frame=Math.min(composition.durationInFrames-1,Math.round(s*30));await renderStill({...opts,composition,frame,output:path.join(dir,`f${String(frame).padStart(5,'0')}.png`),scale:.5});console.log('still',frame)}
 }else if(mode==='proof'){
  const requests=[['repair',26.6,3.0],['privacy',62.1,3.1]];
  for(const [name,start,len] of requests.filter(r=>!args.some(a=>a.startsWith('--only='))||r[0]===args.find(a=>a.startsWith('--only=')).split('=')[1])){const first=Math.round(start*30),last=Math.min(composition.durationInFrames-1,first+Math.round(len*30)-1);await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',`V17-proof-${name}.mp4`),frameRange:[first,last],scale:.5,crf:23,concurrency:2,audioCodec:'aac',pixelFormat:'yuv420p'});console.log('proof',name)}
 }else{
  let last=-1;await renderMedia({...opts,composition,codec:'h264',outputLocation:path.join(root,'output',draft?'Empati-Punya-Batas-V17-Draft.mp4':'Empati-Punya-Batas-V17-TikTok.mp4'),scale:draft?2/3:1,crf:draft?25:18,concurrency:2,audioCodec:'aac',audioBitrate:'192k',pixelFormat:'yuv420p',onProgress:({progress})=>{const p=Math.floor(progress*10);if(p!==last){last=p;console.log(`Rendering ${p*10}%`)}}});console.log('V17 export complete')
 }
}finally{await browser.close({silent:true})}
