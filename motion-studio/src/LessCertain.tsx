import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import timing from './timing.json';
const P={paper:'#F4EFE5',ink:'#263D36',sage:'#9AA58B',pale:'#DDE2D1',rose:'#E8C5B8',wine:'#793F4D',muted:'#758075',white:'#FFFCF5'};
const cut=(v:number)=>Math.max(0,Math.min(1,v));
const tween=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.22,.72,.18,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const heart='M0 40C-25 15-102-28-102-91C-102-151-28-167 0-115C28-167 102-151 102-91C102-28 25 15 0 40Z';
const Heart=({x=540,y=1030,scale=1,color=P.wine}:{x?:number;y?:number;scale?:number;color?:string})=><path d={heart} transform={`translate(${x} ${y}) scale(${scale})`} fill={color}/>;
const Device=({x=540,y=1020,s=1,rotation=0,children}:{x?:number;y?:number;s?:number;rotation?:number;children?:React.ReactNode})=><g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${s})`}><rect x="-160" y="-280" width="320" height="560" rx="49" fill={P.ink}/><rect x="-146" y="-266" width="292" height="532" rx="37" fill={P.white}/><rect x="-53" y="-254" width="106" height="20" rx="10" fill={P.ink}/>{children}</g>;
const Reveal=({children,f,at=0,size=110,color=P.ink,italic=false,align='left'}:{children:React.ReactNode;f:number;at?:number;size?:number;color?:string;italic?:boolean;align?:'left'|'center'})=><div style={{overflow:'hidden',paddingBottom:15,marginBottom:-15}}><div style={{fontFamily:'Playfair',fontSize:size,lineHeight:1.13,letterSpacing:-2.7,color,fontStyle:italic?'italic':'normal',textAlign:align,transform:`translateY(${tween(f,at,at+24,110,0)}%)`}}>{children}</div></div>;
const Label=({children,x=90,y=260,color=P.muted}:{children:React.ReactNode;x?:number;y?:number;color?:string})=><div style={{position:'absolute',left:x,top:y,fontSize:24,letterSpacing:4,fontWeight:700,color}}>{children}</div>;

const Story=({id,f,dark}:{id:string;f:number;dark:boolean})=>{
 const grow=tween(f,5,55);const ink=dark?P.white:P.ink;
 if(id==='hook')return <>
  <div style={{position:'absolute',left:85,top:330}}><Reveal f={f} size={136}>Memahami</Reveal><Reveal f={f} at={19} size={136} italic>ada batasnya.</Reveal></div>
  <svg width="1080" height="1920"><g transform={`translate(540 1050) scale(${tween(f,0,70,.86,1)}) translate(-540 -1050)`}><Heart scale={1.8}/><path d="M230 1170H850" stroke={P.ink} strokeWidth="9" strokeDasharray="620" strokeDashoffset={620*(1-tween(f,40,76))}/><g transform={`translate(${tween(f,60,100,0,155)} 0)`}><path d="M540 1170V850" stroke={P.ink} strokeWidth="9" strokeDasharray="320" strokeDashoffset={320*(1-tween(f,66,103))}/></g><text x="540" y="1330" textAnchor="middle" fontFamily="Lato" fontSize="28" fill={P.muted} opacity={tween(f,90,110)}>empati ≠ izin tanpa batas</text></g></svg>
 </>;
 if(id==='phone')return <>
  <Label color={P.pale}>SEBUAH CERITA</Label><div style={{position:'absolute',left:88,top:330}}><Reveal f={f} size={96} color={ink}>Saat dia tidur,</Reveal><Reveal f={f} at={8} size={96} color={P.rose} italic>HP-nya diperiksa.</Reveal></div>
  <svg width="1080" height="1920"><g transform={`translate(${tween(f,0,55,85,0)} ${tween(f,0,55,80,0)})`}><Device s={tween(f,0,75,.95,1.14)+tween(f,110,177,0,.34)} rotation={tween(f,0,58,-12,0)}><circle cy="-93" r="48" fill={P.pale}/><path d="M-80 72Q0-21 80 72Q0 159-80 72Z" fill="none" stroke={P.wine} strokeWidth="7"/><g transform={`translate(${tween(f,65,125,-17,17)} 0)`}><ellipse cy="72" rx="23" ry={24*tween(f,48,78,.08,1)} fill={P.wine}/></g><path d="M-77 176H77m-77 25H35" stroke={P.pale} strokeWidth="9" strokeLinecap="round"/></Device></g><g opacity={1-tween(f,33,70)} transform={`translate(${tween(f,0,55,0,-55)} 0)`}><circle cx="226" cy="1150" r="38" fill={P.rose}/><path d="M184 1240q42-74 84 0" stroke={P.pale} strokeWidth="25" fill="none" strokeLinecap="round"/><text x="180" y="1080" fontFamily="Playfair" fontSize="46" fill={P.pale}>z z</text></g></svg>
 </>;
 if(['insecurity','reassurance','empathy'].includes(id))return <>
  <div style={{position:'absolute',left:88,top:330}}><Reveal f={f} size={id==='reassurance'?106:94}>{id==='insecurity'?'Yang ia coba pahami:':id==='reassurance'?'“Aku memilih':'Memahami bisa'}</Reveal><Reveal f={f} at={9} size={106} italic>{id==='insecurity'?'rasa tidak aman.':id==='reassurance'?'kamu.”':'menjadi empati.'}</Reveal></div>
  <svg width="1080" height="1920"><circle cx="540" cy="1030" r="250" fill={P.pale} opacity={tween(f,3,40)}/><g transform={`translate(540 1030) scale(${tween(f,0,60,.65,1)}) translate(-540 -1030)`}><Heart scale={1.55}/></g>{id==='insecurity'?<><path d="M237 1040C209 758 870 756 844 1040C821 1288 268 1299 237 1040" stroke={P.wine} strokeWidth="4" fill="none" strokeDasharray="1500" strokeDashoffset={1500*(1-tween(f,8,88))}/><text x="806" y="905" fontFamily="Playfair" fontSize="104" fill={P.wine} opacity={tween(f,26,49)}>?</text></>:id==='reassurance'?<g opacity={tween(f,21,46)} transform={`translate(0 ${tween(f,21,46,26,0)})`}><path d="M263 1140h554q24 0 24 24v96q0 24-24 24H459l-43 35v-35H263q-24 0-24-24v-96q0-24 24-24Z" fill={P.white}/><text x="540" y="1224" textAnchor="middle" fontFamily="Lato" fontSize="37" fill={P.ink}>hanya ada kamu.</text></g>:<><path d="M214 1260Q540 1110 866 1260" stroke={P.ink} strokeWidth="8" fill="none" strokeDasharray="720" strokeDashoffset={720*(1-tween(f,18,70))}/><circle cx="214" cy="1260" r="18" fill={P.ink}/><circle cx="866" cy="1260" r="18" fill={P.ink}/></>}</svg>
 </>;
 if(id==='repeat')return <>
  <div style={{position:'absolute',left:88,top:330}}><Reveal f={f} color={ink} size={111}>Lalu terjadi</Reveal><Reveal f={f} at={12} color={P.rose} size={125} italic>lagi.</Reveal></div>
  <svg width="1080" height="1920">{[0,1,2].map(i=><g key={i} opacity={tween(f,i*23,i*23+17)} transform={`translate(${tween(f,i*23,i*23+28,150,0)} 0)`}><Device x={355+i*184} y={1050+i*23} s={.63} rotation={-12+i*11}><path d="M-85-92H85M-85-45H46" stroke={P.pale} strokeWidth="12" strokeLinecap="round"/><circle cy="80" r="54" fill={P.rose}/><text x="0" y="99" fontFamily="Lato" fontWeight="700" fontSize="55" fill={P.wine} textAnchor="middle">{i+1}</text></Device></g>)}<path d="M219 1390H861" stroke={P.rose} strokeWidth="5" strokeDasharray="642" strokeDashoffset={642*(1-tween(f,25,100))}/></svg>
 </>;
 if(id==='distinction')return <>
  <div style={{position:'absolute',left:88,top:310}}><Reveal f={f} size={105}>Dua hal berbeda.</Reveal></div>
  <svg width="1080" height="1920"><path d="M540 670V1320" stroke={P.ink} strokeWidth="5" strokeDasharray="650" strokeDashoffset={650*(1-tween(f,12,54))}/><g transform={`translate(${tween(f,2,45,180,0)} 0)`}><Heart x={298} y={1010} scale={1.05} color={P.sage}/><text x="298" y="1190" fontFamily="Lato" fontSize="30" letterSpacing="3" fill={P.ink} textAnchor="middle">PERASAAN</text><text x="298" y="1250" fontFamily="Playfair" fontSize="42" fontStyle="italic" fill={P.ink} textAnchor="middle">dipahami.</text></g><g transform={`translate(${tween(f,2,45,-180,0)} 0)`}><Device x={780} y={940} s={.52}><path d="M-75-40H75m-150 40H35" stroke={P.pale} strokeWidth="14" strokeLinecap="round"/></Device><text x="780" y="1190" fontFamily="Lato" fontSize="30" letterSpacing="3" fill={P.wine} textAnchor="middle">PERILAKU</text><text x="780" y="1250" fontFamily="Playfair" fontSize="42" fontStyle="italic" fill={P.wine} textAnchor="middle">dibatasi.</text></g></svg>
 </>;
 if(['mistake','pattern'].includes(id))return <>
  <div style={{position:'absolute',left:88,top:340}}><Reveal f={f} size={id==='pattern'?159:108}>{id==='pattern'?'Pola.':'Satu kesalahan…'}</Reveal>{id==='pattern'&&<Reveal f={f} at={13} size={72} italic>terlihat saat diulang.</Reveal>}</div>
  <svg width="1080" height="1920"><path d="M210 1010H870" stroke={P.sage} strokeWidth="5" strokeDasharray="660" strokeDashoffset={660*(1-tween(f,0,65))}/>{[0,1,2,3].map(i=>{const a=id==='pattern'?1:tween(f,10+i*19,30+i*19);return <g key={i} opacity={a} transform={`translate(0 ${(1-a)*-50})`}><circle cx={240+i*200} cy="1010" r="54" fill={i===3?P.wine:P.rose}/><path d={`M${223+i*200} 993l34 34m0-34-34 34`} stroke={i===3?P.white:P.wine} strokeWidth="5" strokeLinecap="round"/><text x={240+i*200} y="1140" fontFamily="Lato" fontSize="28" fill={P.muted} textAnchor="middle">kejadian {i+1}</text></g>})}<path d="M190 1240H892M190 1240v-30m702 30v-30" stroke={P.wine} strokeWidth="4" fill="none" opacity={id==='pattern'?tween(f,6,35):0}/></svg>
 </>;
 if(id==='accountability')return <>
  <div style={{position:'absolute',left:88,top:320}}><Reveal f={f} size={94}>Pengertian saja</Reveal><Reveal f={f} at={9} size={112} italic>tidak cukup.</Reveal></div>
  <svg width="1080" height="1920">{['akui','perbaiki','ubah'].map((word,i)=>{const a=tween(f,18+i*22,45+i*22);return <g key={word} transform={`translate(${tween(f,18+i*22,45+i*22,(i-1)*110,0)} 0)`}><path d={`M230 ${860+i*172}H850`} stroke={'#D7D4C6'} strokeWidth="2"/><circle cx={tween(f,18+i*22,45+i*22,230,295)} cy={850+i*172} r={17+a*5} fill={a>.95?P.ink:P.wine}/><text x="365" y={868+i*172} fontFamily="Playfair" fontSize="64" fill={P.ink} opacity={a}>{word}.</text></g>})}</svg>
 </>;
 if(['step1','step2','step3'].includes(id)){
  const n=id==='step1'?0:id==='step2'?1:2;const lines=[['Pahami','perasaannya.'],['Sampaikan','batasanmu.'],['Harapkan','perubahan.']][n];
  return <><Label>SAAT {n===0?'PERTAMA KALI':n===1?'TERULANG':'MENJADI KEBIASAAN'}</Label><div style={{position:'absolute',left:85,top:510}}><Reveal f={f} size={124}>{lines[0]}</Reveal><Reveal f={f} at={8} size={n===2?112:120} italic>{lines[1]}</Reveal></div><svg width="1080" height="1920"><text x="82" y="1250" fontFamily="Playfair" fontSize="370" fill={P.pale}>{String(n+1).padStart(2,'0')}</text><path d={`M560 1040H${tween(f,6,52,560,918)}`} stroke={P.ink} strokeWidth="7" strokeLinecap="round"/>{n===0?<Heart x={738} y={1020} scale={tween(f,7,45,0,.7)}/>:n===1?<path d="M738 910v260" stroke={P.wine} strokeWidth="7" strokeDasharray="260" strokeDashoffset={260*(1-grow)}/>:<g opacity={grow}><path d="m655 1077 69-66 78 49 83-114" stroke={P.wine} strokeWidth="8" fill="none" strokeDasharray="310" strokeDashoffset={310*(1-grow)}/><path d="m844 953 42-8 0 42" stroke={P.wine} strokeWidth="7" fill="none"/></g>}</svg></>;
 }
 return <><div style={{position:'absolute',left:88,top:330}}><Reveal f={f} size={108}>Empati membantu</Reveal><Reveal f={f} at={11} size={119} italic>kita tumbuh.</Reveal></div><svg width="1080" height="1920"><path d="M540 1350V851" stroke={P.ink} strokeWidth="9" strokeLinecap="round" strokeDasharray="499" strokeDashoffset={499*(1-tween(f,0,110))}/>{[0,1,2].map(i=>{const a=tween(f,15+i*24,56+i*24);return <g key={i} transform={`translate(540 ${1230-i*128}) scale(${a})`}><path d="M0 0Q-146 0-150-119Q-34-124 0 0Z" fill={P.sage}/><path d="M0-22Q146-22 150-141Q34-146 0-22Z" fill={P.ink}/></g>})}<path d="M422 1350H658" stroke={P.wine} strokeWidth="7" strokeLinecap="round"/></svg></>;
};

const Scene=({segment,index}:{segment:typeof timing.segments[number];index:number})=>{
 const f=useCurrentFrame();const duration=Math.round((segment.end-segment.start)*30);const dark=['phone','repeat'].includes(segment.id);const background=segment.id==='phone'?'#203736':segment.id==='repeat'?P.wine:P.paper;
 const opacity=index===0?1:tween(f,0,9);const leave=tween(f,duration-10,duration,1,0);
 return <AbsoluteFill style={{background,opacity:opacity*leave}}><Story id={segment.id} f={f} dark={dark}/></AbsoluteFill>;
};
const Caption=()=>{
 const t=useCurrentFrame()/30;const c=timing.indonesianCaptions.find(c=>t>=c.start&&t<c.end+.06);const s=timing.segments.find(s=>t>=s.start&&t<s.end);if(!c||!s)return null;const dark=['phone','repeat'].includes(s.id);
 return <div style={{position:'absolute',left:95,top:1510,width:790,textAlign:'center',fontFamily:'Lato',fontWeight:700,fontSize:43,lineHeight:1.45,color:dark?P.white:P.ink}}>{c.text}</div>;
};
const Outro=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:P.paper,justifyContent:'center',alignItems:'center'}}><div style={{transform:`translateY(${tween(f,0,28,18,0)}px)`,opacity:tween(f,0,22),width:810}}><Img src={staticFile('less-certain-logo.png')} style={{width:810}}/></div><div style={{position:'absolute',top:1105,textAlign:'center',opacity:tween(f,17,40),fontFamily:'Lato',color:P.muted,fontSize:28,letterSpacing:4}}>TIKTOK · INSTAGRAM<div style={{marginTop:21,color:P.ink,fontSize:37,letterSpacing:1}}>@less.certain</div></div></AbsoluteFill>};
export const LessCertain=()=>{
 const f=useCurrentFrame();const storyFrames=Math.ceil(timing.duration*30);const total=storyFrames+108;const t=f/30;const s=timing.segments.find(s=>t>=s.start&&t<s.end);const dark=s&&['phone','repeat'].includes(s.id);
 return <AbsoluteFill style={{background:P.paper,fontFamily:'Lato'}}>
  {timing.segments.map((s,i)=><Sequence key={s.id} from={Math.round(s.start*30)} durationInFrames={Math.round(s.end*30)-Math.round(s.start*30)}><Scene segment={s} index={i}/></Sequence>)}
  <Caption/>
  {f<storyFrames&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:85,top:128,width:248,height:83,objectFit:'contain',filter:dark?'brightness(0) invert(1)':undefined}}/>}
  <Sequence from={storyFrames} durationInFrames={108}><Outro/></Sequence>
  <Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile('narration.mp3')}/></Sequence>
  <Audio src={staticFile('ambience.wav')} loop volume={(frame)=>.28*tween(frame,total-55,total,1,0)}/>
 </AbsoluteFill>;
};
