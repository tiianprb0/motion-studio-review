import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
const stills=args.includes('--stills');
const sample=args.includes('--sample');
const draft=args.includes('--draft');
const at=args.find(a=>a.startsWith('--at='));
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public'),outDir:path.join(root,'.bundle')});
const options={serveUrl,id:'TanpaKataMaaf',logLevel:'error',browserExecutable:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'};
const composition=await selectComposition(options);
if(stills){
 fs.mkdirSync(path.join(root,'previews-v6'),{recursive:true});
 const times=at?at.split('=')[1].split(',').map(Number):[1.0,2.6,4.4,8.0,11.2,13.4,15.4,18.6,21.2,24.2,27.4,30.2,33.4,36.2,39.6,44.4,47.4,50.6,53.4,56.2,59.4,62.0,65.4,68.0,70.6,72.4,74.6,76.6,78.6];
 for(const s of times){
  await renderStill({...options,composition,frame:Math.round(s*30),output:path.join(root,'previews-v6',`t${String(s).replace('.','_')}.png`),scale:.5});
  console.log('still',s);
 }
} else {
 fs.mkdirSync(path.join(root,'output'),{recursive:true});
 const output=path.join(root,'output',sample?'Tanpa-Kata-Maaf-V6-Cuplikan.mp4':'Tanpa-Kata-Maaf-V6-TikTok.mp4');
 let last=-1;
 await renderMedia({...options,composition,codec:'h264',outputLocation:output,crf:draft?26:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'192k',concurrency:3,scale:draft?2/3:1,frameRange:sample?[0,Math.min(720,composition.durationInFrames-1)]:undefined,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`Rendering ${n*10}%`)}}});
 console.log('Video:',output);
}
