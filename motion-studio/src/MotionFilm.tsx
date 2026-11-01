import React from 'react';
import {AbsoluteFill,Audio,Sequence,interpolate,spring,staticFile,useCurrentFrame} from 'remotion';
import timing from './timing.json';
import {C,Heart,Phone,Star} from './Illustrations';

type Seg=typeof timing.segments[number];
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const L=(f:number,a:number,b:number,x:number,y:number)=>x+(y-x)*clamp((f-a)/(b-a));
const E=(f:number,at=0,d=23)=>spring({frame:f-at,fps:30,config:{damping:16,stiffness:125,mass:.9},durationInFrames:d});
const isDark=(art:string)=>['bed','repeat','steps'].includes(art);
const bg=(art:string)=>art==='bed'?'#1F3637':art==='repeat'?C.wine:art==='steps'?C.ink:art==='reassure'?'#EDD1C0':C.paper;

const Rig:React.FC<{x:number;y:number;s?:number;female?:boolean;f:number;walk?:number;reach?:number;head?:number;shirt?:string}>=({x,y,s=1,female=false,f,walk=0,reach=0,head=0,shirt=C.sage})=>{
 const gait=Math.sin(f*.25)*walk;const blink=(f%105>99)?0.12:1;
 return <g transform={`translate(${x} ${y+Math.abs(gait)*3}) scale(${s})`}>
  <ellipse cx="0" cy="415" rx="75" ry="11" fill="#000" opacity=".1"/>
  {[-1,1].map(side=><g key={side} transform={`translate(${side*30} 255) rotate(${gait*side*23})`}><path d="M0 0v86" stroke={C.ink} strokeWidth="29" strokeLinecap="round"/><g transform={`translate(0 86) rotate(${Math.max(0,gait*side)*32})`}><path d="M0 0v64" stroke={C.ink} strokeWidth="27" strokeLinecap="round"/><path d={`M-14 64h${side===1?45:-25}`} stroke={C.ink} strokeWidth="13" strokeLinecap="round"/></g></g>)}
  <g transform={`translate(0 ${Math.sin(f/15)*1.5})`}>
   {female&&<path d="M-49-20q-16-68 47-67q65 0 54 78L45 83h-91Z" fill={C.ink}/>}
   <path d="M-16 35v48h32V35" fill={C.rose}/><path d="M-55 97q6-33 55-33q47 0 55 33l9 156q-64 26-128 0Z" fill={shirt}/>
   {[-1,1].map(side=><g key={side} transform={`translate(${side*51} 96) rotate(${side===-1?-reach*68-gait*18:reach*22+gait*18})`}><path d="M0 0v83" stroke={shirt} strokeWidth="28" strokeLinecap="round"/><g transform={`translate(0 83) rotate(${side===-1?-reach*66:reach*14})`}><path d="M0 0v70" stroke={shirt} strokeWidth="25" strokeLinecap="round"/><circle cy="80" r="13" fill={C.rose}/></g></g>)}
   <g transform={`rotate(${head} 0 -10)`}><ellipse cy="-17" rx="44" ry="55" fill={C.rose}/><path d={female?'M-43-24q-10-61 46-57q54 3 42 62Q12-31 1-55q-14 26-44 31':'M-43-29q-9-53 46-50q47 2 42 52L22-47q-25 22-65 18'} fill={C.ink}/><g transform={`translate(0 -14) scale(1 ${blink})`}><path d="M-18 0v5M16 0v5" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/></g><path d="M0-3-3 9h8M-9 21q10 8 21 0" stroke={C.wine} fill="none" strokeWidth="2.5" strokeLinecap="round"/></g>
  </g>
 </g>;
};

const Title:React.FC<{lines:string[];f:number;x?:number;y?:number;size?:number;light?:boolean;accent?:boolean}>=({lines,f,x=86,y=265,size=112,light=false,accent=true})=><div style={{position:'absolute',left:x,top:y,width:930,fontFamily:'Playfair',fontSize:size,lineHeight:1.1,letterSpacing:-3,color:light?C.white:C.ink}}>
 {lines.map((line,i)=>{const p=E(f,i*5);return <div key={i} style={{opacity:clamp(p),transform:`translateY(${(1-p)*85}px) rotate(${(1-p)*(i%2?3:-2)}deg)`,transformOrigin:'left center',fontStyle:accent&&i===lines.length-1?'italic':'normal',color:accent&&i===lines.length-1?(light?C.rose:C.wine):'inherit'}}>{line}</div>})}
</div>;

const PhoneScene=({f}:{f:number})=>{
 const approach=L(f,0,40,850,720);const reach=E(f,28,32);const lift=E(f,43,35);const camera=L(f,100,160,1,1.15);
 return <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>
  <g transform={`translate(${540*(1-camera)} ${970*(1-camera)}) scale(${camera})`}>
   <rect x="70" y="620" width="940" height="765" rx="68" fill="#2D4849"/>
   <rect x="140" y="702" width="232" height="260" rx="116" fill="#132C32" stroke="#51716A" strokeWidth="6"/>
   <g transform={`rotate(${L(f,0,180,0,55)} 270 815)`}><path d="M261 745a72 72 0 1 0 68 104q-80 13-68-104" fill="#E7DABB"/></g>
   <circle cx="202" cy="763" r="4" fill={C.white}/><circle cx="306" cy="726" r="4" fill={C.white}/>
   <path d="M120 1368H960" stroke="#132C32" strokeWidth="9"/>
   <Rig x={approach} y={958} s={.88} f={f} walk={1-clamp((f-25)/22)} reach={reach} head={L(f,45,80,0,-13)} shirt="#9BA58F"/>
   <g transform={`translate(0 ${Math.sin(f/18)*2})`}>
    <path d="M143 1181q0-60 65-60h450q56 0 56 60v121H143Z" fill={C.white}/>
    <ellipse cx="237" cy="1160" rx="74" ry="47" fill="#E1D7C1"/>
    <ellipse cx="246" cy="1136" rx="44" ry="38" fill={C.rose}/><path d="M203 1138q-8-62 52-45q41 14 23 54q-25-38-75-9" fill={C.ink}/>
    <path d="m241 1133 13 3m-16-1-4 5" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/>
    <path d="M290 1135q200-83 384 47v111H290Z" fill="#BE8A7B"/><path d="M316 1209q171-37 341 2" fill="none" stroke="#A66D63" strokeWidth="5"/>
   </g>
   <rect x="134" y="1290" width="581" height="58" rx="8" fill="#8E9C84"/><path d="M155 1345v42m536-42v42" stroke="#132C32" strokeWidth="13"/>
   <path d="M781 1285h138m-114 0v94m91-94v94" stroke="#132C32" strokeWidth="11"/>
   <g transform={`translate(${L(lift,0,1,827,651)} ${L(lift,0,1,1245,1048)}) rotate(${-84+lift*69})`}><Phone scale={.62} alert/></g>
   <path d="m669 1077-45-81 98 12Z" fill="#F9EAB9" opacity={lift*(.15+.07*Math.sin(f/5))}/>
   <text x="341" y={1030+Math.sin(f/20)*7} fontFamily="Playfair" fontStyle="italic" fontSize="43" fill="#A9B5A0" opacity={.6+.3*Math.sin(f/30)}>z z z</text>
   <g opacity={E(f,62)}><circle cx="853" cy="880" r="43" fill={C.rose}/><path d="M842 868q17-22 28-3q9 18-13 25v9m0 13v2" stroke={C.wine} strokeWidth="5" fill="none" strokeLinecap="round"/></g>
  </g>
 </svg>;
};

const EmpathyScene=({f,reassure=false,heartOnly=false}:{f:number;reassure?:boolean;heartOnly?:boolean})=>{
 const p=E(f,3,35);const talk=clamp((f-30)/55);const hug=clamp((f-40)/65);
 return <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute'}}>
  <ellipse cx="540" cy="1160" rx={390+p*15} ry="244" fill={reassure?'#DAB5A5':C.pale} opacity=".6"/>
  <path d="M140 1378H945" stroke={C.line} strokeWidth="4"/>
  <Rig x={L(f,0,42,200,310)+hug*22} y={958+Math.sin(f/35)*3} s={1} female f={f} head={L(f,15,60,0,8)} reach={p*.7} shirt={C.sage}/>
  <Rig x={L(f,0,42,900,767)-hug*22} y={958} s={1} f={f+18} head={L(f,12,57,0,-7)} reach={p*.6} shirt={C.night}/>
  {!reassure&&!heartOnly&&<g opacity={1-talk*.75} transform={`translate(780 752) rotate(${Math.sin(f/10)*8})`}><path d="M-77 15Q-96-42-42-62Q-11-111 40-64Q99-52 82 12q-56 31-159 3" fill={C.wine}/><path d="m-25 31 17 30-23 11 14 23m55-59-16 25 17 16-17 27" stroke={C.coral} strokeWidth="7" fill="none" strokeLinecap="round"/></g>}
  <g transform={`translate(540 ${reassure?795:820}) scale(${p*(1+.04*Math.sin(f/10))}) translate(-80 -70)`}><Heart size={160} fill={C.wine}/></g>
  <path d="M380 1122Q540 1000 701 1118" fill="none" stroke={C.coral} strokeWidth="6" strokeLinecap="round" strokeDasharray="360" strokeDashoffset={360*(1-talk)}/>
  {reassure&&<g opacity={E(f,20)} transform={`translate(0 ${(1-E(f,20))*30})`}><path d="M245 647q0-53 60-53h473q60 0 60 53v49q0 49-60 49H498l-45 38 6-38H305q-60 0-60-49Z" fill={C.white}/><text x="540" y="688" textAnchor="middle" fill={C.wine} fontFamily="Playfair" fontSize="41" fontStyle="italic">{'“Aku memilih kamu.”'.slice(0,Math.floor(L(f,29,85,0,20)))}</text></g>}
  {heartOnly&&<><path d="M218 740q-55 158 17 275M860 740q55 158-17 275" stroke={C.sage} strokeWidth="4" fill="none" strokeDasharray="8 16" strokeDashoffset={-f}/><Star x={230} y={701} size={22}/><Star x={862} y={701} size={22}/></>}
 </svg>;
};

const LoopScene=({f}:{f:number})=>{
 const p=E(f,0,32);const count=Math.min(3,1+Math.floor(f/29));
 return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <circle cx="540" cy="1030" r={320+p*45} fill="none" stroke={C.rose} strokeWidth="3" opacity=".25"/>
  {[0,1,2].map(i=>{const a=E(f,i*24,35);const ang=i*2.094+f*.013;return <g key={i} opacity={clamp(a)} transform={`translate(${540+Math.sin(ang)*282} ${1030+Math.cos(ang)*225}) rotate(${Math.sin(ang)*13}) scale(${.8*a}) translate(-65 -114)`}><Phone alert/></g>})}
  <g transform={`rotate(${f*1.7} 540 1030)`}><path d="M338 833A282 282 0 0 1 791 1140" stroke={C.rose} strokeWidth="10" fill="none" strokeLinecap="round"/><path d="m770 1097 23 48 47-26" stroke={C.rose} strokeWidth="10" fill="none" strokeLinecap="round"/></g>
  <circle cx="540" cy="1030" r="120" fill={C.wine}/><text x="540" y="1070" textAnchor="middle" fontFamily="Playfair" fontSize="114" fill={C.white}>{count}×</text>
  <text x="540" y="1400" textAnchor="middle" fontSize="29" letterSpacing="5" fill={C.rose}>KEJADIAN YANG SAMA.</text>
 </svg>;
};

const SplitScene=({f}:{f:number})=>{
 const wall=E(f,22,38);const push=Math.sin(Math.max(0,f-42)/12)*18;
 return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <path d="M0 720q260-170 540 0v650H0Z" fill={C.pale}/><path d="M540 720q240-170 540 0v650H540Z" fill={C.rose}/>
  <g transform={`translate(${L(f,0,35,50,215)} ${892+Math.sin(f/18)*10})`}><Heart size={220} fill={C.sage}/></g>
  <g transform={`translate(${L(f,8,40,920,675)+push} 886) rotate(${L(f,8,40,25,-9)})`}><Phone scale={1.1} alert/></g>
  <path d="M540 1320V740" stroke={C.wine} strokeWidth="12" strokeLinecap="round" strokeDasharray="580" strokeDashoffset={580*(1-wall)}/>
  {[0,1,2,3].map(i=><g key={i} opacity={wall}><path d={`M${508} ${815+i*110}h64`} stroke={C.wine} strokeWidth="8" strokeLinecap="round"/></g>)}
  <text x="272" y="1224" textAnchor="middle" fontSize="37" letterSpacing="4" fill={C.ink}>PERASAAN</text><text x="795" y="1224" textAnchor="middle" fontSize="37" letterSpacing="4" fill={C.wine}>PERILAKU</text>
  <text x="272" y="1282" textAnchor="middle" fontFamily="Playfair" fontSize="39" fontStyle="italic" fill={C.ink}>dipahami.</text><text x="795" y="1282" textAnchor="middle" fontFamily="Playfair" fontSize="39" fontStyle="italic" fill={C.wine}>dibatasi.</text>
 </svg>;
};

const PatternScene=({f,all=false}:{f:number;all?:boolean})=>{
 const camera=all?1:L(f,0,90,1.8,1);const cascade=all?f+60:f;
 return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <g transform={`translate(${540*(1-camera)} ${1080*(1-camera)}) scale(${camera})`}>
   <path d="M100 1320H1000" stroke={C.ink} strokeWidth="5"/>
   {[0,1,2,3,4].map(i=>{const fall=E(cascade,23+i*13,40);return <g key={i} transform={`translate(${162+i*155} 1310) rotate(${fall*29})`}><g transform="translate(-50 -280)"><Phone scale={1.12} alert/></g></g>})}
   <path d="M153 922q370-151 744 0" stroke={C.coral} strokeWidth="5" fill="none" strokeDasharray="810" strokeDashoffset={810*(1-clamp((cascade-15)/85))}/><path d="m860 899 37 24-11-41" fill="none" stroke={C.coral} strokeWidth="5" opacity={clamp((cascade-95)/10)}/>
   {[0,1,2,3,4].map(i=><circle key={i} cx={162+i*155} cy="1385" r={8+E(cascade,i*13)*8} fill={i===4?C.wine:C.coral}/>)}
  </g>
 </svg>;
};

const ActionScene=({f}:{f:number})=>{
 const walk=clamp(f/92);const stride=1-clamp((f-79)/25);
 return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <path d="M90 1385H970" stroke={C.sage} strokeWidth="12" strokeLinecap="round"/>
  <Rig x={180+walk*630} y={972} f={f} walk={stride} s={1} female shirt={C.sage}/>
  {['AKUI','PERBAIKI','UBAH'].map((word,i)=>{const a=E(f,16+i*23);return <g key={word} opacity={clamp(a)} transform={`translate(0 ${-a*13})`}><circle cx={260+i*280} cy="853" r={60*a} fill={i===2?C.wine:C.sage}/><path d={`m${238+i*280} 853 16 17 30-35`} fill="none" stroke={C.white} strokeWidth="7" strokeDasharray="75" strokeDashoffset={75*(1-clamp(a))} strokeLinecap="round" strokeLinejoin="round"/><text x={260+i*280} y="749" textAnchor="middle" fontSize="31" letterSpacing="3" fill={C.ink}>{word}</text></g>})}
 </svg>;
};

const StepsScene=({f,step}:{f:number;step:number})=>{
 const marker=step+L(f,0,42,-.23,0);const x=220+marker*300;const y=1120-marker*150;
 return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <path d="M100 1440Q250 1400 420 1260T920 1040" fill="none" stroke="#4C665A" strokeWidth="45" strokeLinecap="round"/>
  <path d="M100 1440Q250 1400 420 1260T920 1040" fill="none" stroke={C.rose} strokeWidth="5" strokeDasharray="10 18" strokeDashoffset={-f-step*80}/>
  <Rig x={x} y={y} s={.71} f={f+step*30} walk={1-clamp((f-15)/25)} female reach={.2} shirt={C.rose}/>
  {['EMPATI','BATASAN','PERUBAHAN'].map((word,i)=><g key={word} opacity={i<=step?1:.32}><circle cx={220+i*300} cy={1382-i*150} r="26" fill={i<=step?C.rose:'#698075'}/><text x={220+i*300} y={1463-i*150} fontSize="24" letterSpacing="3" textAnchor="middle" fill={C.white}>{word}</text></g>)}
  <g transform={`translate(${x} ${y-115}) scale(${E(f,12)*.8}) translate(-50 -70)`}><Heart size={100} fill={C.coral}/></g>
 </svg>;
};

const GrowScene=({f}:{f:number})=>{
 const grow=clamp((f-7)/70);return <svg width="1080" height="1920" style={{position:'absolute'}}>
  <circle cx="540" cy="1070" r={300*E(f,0,45)} fill={C.pale}/>
  <path d="M540 1390V819" stroke={C.ink} strokeWidth="12" strokeLinecap="round" strokeDasharray="571" strokeDashoffset={571*(1-grow)}/>
  {[0,1,2,3].map(i=>{const p=E(f,16+i*14,38);const sway=Math.sin(f/20+i)*3;return <g key={i} transform={`translate(540 ${1270-i*115}) rotate(${sway}) scale(${p})`}><path d="M0 0q-172 0-182-134Q-40-141 0 0Z" fill={i%2?C.sage:C.ink}/><path d="M0-24q174 0 178-144Q43-166 0-24Z" fill={i%2?C.ink:C.sage}/><path d="m-19-12-114-81M19-35l112-90" stroke={C.white} strokeWidth="2" opacity=".6"/></g>})}
  <g transform={`translate(495 ${L(f,1,70,1320,724)+Math.sin(f/18)*5}) scale(${E(f,2)})`}><Heart size={90} fill={C.coral}/></g>
  <path d="M390 1350h300l-34 107H422Z" fill={C.rose}/><path d="M379 1350h322" stroke={C.wine} strokeWidth="12" strokeLinecap="round"/>
  <Star x={200} y={1040} size={24*E(f,75)}/><Star x={892} y={955} size={22*E(f,85)} color={C.sage}/>
 </svg>;
};

const Shot:React.FC<{segment:Seg;index:number;offset:number}>=({segment,index,offset})=>{
 const local=useCurrentFrame();const f=local-offset;const art=segment.art;const dark=isDark(art);
 const incoming=E(local,0,27);const start=index===0?1:clamp(incoming);
 const titles:Record<string,string[]>={hook:['Memahami','≠ membiarkan.'],phone:['Saat kepercayaan','mulai diuji.'],insecurity:['Di balik tindakan,','ada rasa tidak aman.'],reassurance:['“Aku memilih','kamu.”'],empathy:['Memahami itu','bentuk empati.'],repeat:['Tapi, kalau','terus berulang?'],distinction:['Pahami rasanya.','Batasi tindakannya.'],mistake:['Satu kesalahan…'],pattern:['…atau pola?'],accountability:['Butuh lebih dari','pengertian.'],step1:['Understand','the feeling.'],step2:['Communicate','your boundaries.'],step3:['Accountability.','And change.'],closing:['Empati membantu','seseorang tumbuh.']};
 const title=titles[segment.id]||segment.title;
 const step=('step'in segment?segment.step:0)as number;
 return <AbsoluteFill style={{background:bg(art),clipPath:index===0?undefined:`circle(${start*2300}px at ${index%2?1080:0}px 960px)`,overflow:'hidden'}}>
  <svg width="1080" height="1920" style={{position:'absolute',opacity:dark?.12:.2}}><defs><pattern id={'grain'+index} width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.2" fill={dark?C.white:C.sage}/></pattern></defs><rect width="1080" height="1920" fill={`url(#grain${index})`}/></svg>
  <div style={{position:'absolute',left:85,top:150,fontSize:24,letterSpacing:5,fontWeight:700,color:dark?C.rose:C.muted}}>TENTANG KITA <span style={{marginLeft:28,opacity:.6}}>— {String(index+1).padStart(2,'0')}</span></div>
  {art==='hook'?<>
   <Title lines={title} f={f} y={305} size={123}/>
   <svg width="1080" height="1920" style={{position:'absolute'}}>
    <g transform={`translate(540 1045) scale(${L(f,0,130,.75,1.05)}) translate(-540 -1045)`}>
     <circle cx="540" cy="1020" r={310*E(f,1,40)} fill={C.pale}/>
     <g transform={`translate(0 ${Math.sin(f/12)*9})`}><Heart x={370} y={820} size={340} fill={C.wine}/></g>
     <g opacity={clamp(E(f,30,32))} transform={`translate(0 ${L(f,30,83,100,0)})`}>
      {[0,1,2,3,4,5].map(i=><path key={i} d={`M${293+i*99} 1115v240`} stroke={C.ink} strokeWidth="13" strokeLinecap="round"/>)}
      <path d="M285 1160h516M285 1300h516" stroke={C.ink} strokeWidth="11"/>
     </g>
     <Star x={215} y={820} size={27*E(f,16)}/><Star x={850} y={1010} size={20*E(f,26)}/>
    </g>
   </svg>
   <div style={{position:'absolute',left:93,top:638,fontSize:28,letterSpacing:2,color:C.muted,opacity:E(f,35)}}>EMPATI JUGA PUNYA BATAS.</div>
  </>:<>
   <Title lines={title} f={f} y={art==='steps'?294:285} size={art==='steps'?119:Math.max(...title.map(x=>x.length))>21?83:Math.max(...title.map(x=>x.length))>18?94:112} light={dark}/>
   {art==='bed'?<PhoneScene f={f}/>:['empathy','reassure','heart'].includes(art)?<EmpathyScene f={f} reassure={art==='reassure'} heartOnly={art==='heart'}/>:art==='repeat'?<LoopScene f={f}/>:art==='split'?<SplitScene f={f}/>:art==='pattern'?<PatternScene f={f} all={segment.id==='pattern'}/>:art==='action'?<ActionScene f={f}/>:art==='steps'?<StepsScene f={f} step={step}/>:<GrowScene f={f}/>}
   {art==='action'&&<div style={{position:'absolute',top:565,left:90,color:C.wine,fontWeight:900,fontSize:39,letterSpacing:4,opacity:E(f,32)}}>ACCOUNTABILITY.</div>}
  </>}
 </AbsoluteFill>;
};

const Subtitle=()=>{
 const frame=useCurrentFrame();const time=frame/30;const s=timing.segments.find(s=>time>=s.start&&time<s.end);if(!s)return null;
 const captions=timing.captions as {start:number;end:number;words:{text:string;start:number;end:number}[]}[];
 let words=captions.find(c=>time>=c.start&&time<c.end+.06)?.words;
 if(!timing.hasVoice){const tokens=s.text.split(' ');const count=Math.ceil(tokens.length/5);const idx=Math.min(count-1,Math.floor((time-s.start)/(s.end-s.start)*count));words=tokens.slice(idx*5,idx*5+5).map(text=>({text,start:0,end:0}));}
 if(!words)return null;const dark=isDark(s.art);
 return <div style={{position:'absolute',left:91,top:1520,width:805,textAlign:'center',fontSize:44,fontWeight:700,lineHeight:1.45,color:dark?C.white:C.ink}}>
  <div>{words.map((w,i)=>{const active=timing.hasVoice&&time>=w.start&&time<=w.end;return <React.Fragment key={i}><span style={{background:active?(dark?C.coral:C.rose):'transparent',borderRadius:8,padding:'3px 5px',boxDecorationBreak:'clone'}}>{w.text}</span>{' '}</React.Fragment>})}</div>
 </div>;
};

export const MotionFilm:React.FC=()=>{
 const frame=useCurrentFrame();return <AbsoluteFill style={{background:C.paper,fontFamily:'Lato'}}>
  {timing.segments.map((s,i)=>{const start=Math.round(s.start*30);const pre=i===0?0:16;return <Sequence key={s.id} from={Math.max(0,start-pre)} durationInFrames={Math.round(s.end*30)-start+pre} premountFor={25}><Shot segment={s} index={i} offset={pre}/></Sequence>})}
  <Subtitle/>
  {timing.hasVoice&&<Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile('narration.mp3')} volume={1}/></Sequence>}
  <Audio src={staticFile('ambience.wav')} volume={timing.hasVoice?.32:.55}/>
  <Audio src={staticFile('soft-motion.wav')} volume={.65}/>
  {!timing.hasVoice&&<div style={{position:'absolute',left:90,bottom:110,fontSize:23,color:C.muted,letterSpacing:2}}>PRATINJAU GERAK · NARASI MENYUSUL</div>}
 </AbsoluteFill>;
};
