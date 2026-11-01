import {bundle} from '@remotion/bundler';
import {renderMedia,renderStill,selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
const preview=args.includes('--stills');
const draft=args.includes('--draft');
const sample=args.includes('--sample');
const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts'),publicDir:path.join(root,'public'),outDir:path.join(root,'.bundle')});
const options={serveUrl,id:'EmpatiBukanIzin',logLevel:'error',browserExecutable:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'};
const composition=await selectComposition(options);
if(preview){
 const timing=JSON.parse(fs.readFileSync(path.join(root,'src/timing.json'),'utf8'));
 fs.mkdirSync(path.join(root,'previews'),{recursive:true});
 const reviewTimes=[1.2,7,9.2,10.8,12.5,16.8,20.5,28.5,36.8,40.8,48.5,54.5,56,61,63,66.2,68.5,72.5];
 for(let i=0;i<reviewTimes.length;i++){
  const seconds=reviewTimes[i];
  await renderStill({...options,composition,frame:Math.round(seconds*30),output:path.join(root,'previews',`v5-${String(i).padStart(2,'0')}-${seconds}.png`),scale:.5});
  console.log('Review frame:',seconds);
 }
 await renderStill({...options,composition,frame:composition.durationInFrames-18,output:path.join(root,'previews','v5-99-outro.png'),scale:.5});
}else{
 fs.mkdirSync(path.join(root,'output'),{recursive:true});
 const timing=JSON.parse(fs.readFileSync(path.join(root,'src/timing.json'),'utf8'));
 const output=path.join(root,'output',sample?'Empati-Bukan-Izin-V5-Cuplikan.mp4':timing.hasVoice?'Empati-Bukan-Izin-V5-TikTok.mp4':'Empati-Bukan-Izin-V5-Pratinjau.mp4');
 let last=-1;
 await renderMedia({...options,composition,codec:'h264',outputLocation:output,crf:draft?25:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'192k',concurrency:3,scale:draft?2/3:1,frameRange:sample?[0,Math.min(539,composition.durationInFrames-1)]:undefined,onProgress:({progress})=>{const n=Math.floor(progress*10);if(n!==last){last=n;console.log(`Rendering ${n*10}%`)}},chromiumOptions:{disableWebSecurity:false}});
 console.log('Video:',output);
}
