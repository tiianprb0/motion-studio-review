import React from 'react';
export const C={paper:'#F6F0E6',ink:'#293C36',wine:'#7C394A',rose:'#D8A190',skin:'#D9A28A',cream:'#FFF9EF',sage:'#839682',pale:'#E6E8DD',ochre:'#CB955A',wood:'#B78C69',line:'#D7CCBD',memory:'#EDDFC7',night:'#253B39'};
export const clamp=(n:number)=>Math.max(0,Math.min(1,n));
export const ease=(n:number)=>{const t=clamp(n);return t*t*(3-2*t)};
export const move=(f:number,a:number,b:number,x=0,y=1)=>x+(y-x)*ease((f-a)/(b-a));
export const out=(f:number,a:number,b:number)=>1-Math.pow(1-clamp((f-a)/(b-a)),3);
export type Pose={x:number;y:number;s?:number;female?:boolean;child?:boolean;dad?:boolean;mood?:'hurt'|'annoyed'|'soft'|'unsure'|'warm';gaze?:number;tilt?:number;lean?:number;lh?:[number,number];rh?:[number,number];step?:number;shirt?:string;talk?:number;alpha?:number};
function Arm({side,hand,shirt,skin}:{side:number;hand:[number,number];shirt:string;skin:string}){
 const sx=side*31,sy=-158,[hx,hy]=hand,dx=hx-sx,dy=hy-sy,d=Math.hypot(dx,dy)||1;
 const bend=Math.min(23,d*.21),ex=(sx+hx)/2-side*dy/d*bend,ey=(sy+hy)/2+side*dx/d*bend;
 return <g><path d={`M${sx},${sy} Q${ex},${ey} ${hx},${hy}`} fill="none" stroke={shirt} strokeWidth="19" strokeLinecap="round"/><path d={`M${ex*.3+hx*.7},${ey*.3+hy*.7} L${hx},${hy}`} stroke={skin} strokeWidth="13" strokeLinecap="round"/><ellipse cx={hx} cy={hy} rx="8" ry="7" fill={skin}/></g>
}
export const Person:React.FC<Pose>=({x,y,s=1,female=false,child=false,dad=false,mood='soft',gaze=0,tilt=0,lean=0,lh=[-42,-86],rh=[42,-86],step=0,shirt,talk=0,alpha=1})=>{
 const skin=female?'#E7BFA6':C.skin;
 const color=shirt??(female?C.wine:dad?'#5B665A':C.sage),worry=mood==='hurt'||mood==='unsure',annoy=mood==='annoyed',warm=mood==='warm';
 return <g data-actor={female?"woman":child?"child":dad?"father":"man"} opacity={alpha} transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="6" rx="55" ry="8" fill={C.ink} opacity=".10"/>
  <path d={`M-17-90 Q${-17-step*8}-40 ${-22+step*14}-3M17-90Q${17+step*8}-40 ${22-step*14}-3`} fill="none" stroke={C.ink} strokeWidth={child?16:20} strokeLinecap="round"/>
  <path d={`M${-35+step*14} 0h23M${14-step*14} 0h23`} stroke={C.ink} strokeWidth="10" strokeLinecap="round"/>
  <g transform={`rotate(${lean} 0 -95)`}>
   <path d="M-31-170Q0-184 31-170L42-88Q0-72-42-88Z" fill={color}/>
   <path d="M-10-185v20q10 8 20 0v-20" fill={skin}/>
   <Arm side={-1} hand={lh} shirt={color} skin={skin}/><Arm side={1} hand={rh} shirt={color} skin={skin}/>
   <g data-face="true" transform={`rotate(${tilt} 0 -218)`}>
    {female&&<path d="M-35-216q-5-58 35-58q40 1 37 57l5 45q-9 10-17 8l-7-28h-35l-7 28q-13 3-20-8Z" fill="#202D2A"/>}
    <ellipse cy="-220" rx="31" ry="38" fill={skin}/>
    <circle cx="-31" cy="-216" r="6" fill={skin}/><circle cx="31" cy="-216" r="6" fill={skin}/>
    <path d={female?'M-31-227q-4-46 32-45q39 2 32 46q-12-13-16-29q-18 25-48 28':'M-31-233q-1-37 32-35q37 2 32 38l-19-17q-24 15-45 14Z'} fill={C.ink}/>
    {dad&&<path d="M-28-236q-1-24 11-25M18-262q14 8 14 27" stroke="#B7B1A1" strokeWidth="5" fill="none"/>}
    {female?<g>{[-13,13].map((cx,i)=><g key={i}><path d={`M${cx-7}-220q7-${warm?4:5.5} 14 0q-7 ${warm?3:4} -14 0Z`} fill={C.cream} stroke={C.ink} strokeWidth="1.3"/><ellipse cx={cx+Math.max(-2,Math.min(2,gaze*.5))} cy="-220" rx="2.2" ry={warm?2.1:2.6} fill={C.ink}/></g>)}</g>:<path d={`M${-17+gaze}-222v${warm?2:4}M${9+gaze}-222v${warm?2:4}`} stroke={C.ink} strokeWidth="3.2" strokeLinecap="round"/>}
    <path d={annoy?'M-21-235l12 4M7-231l12-4':worry?'M-21-231l12-5M7-236l12 5':'M-21-234h12M7-234h12'} stroke={C.ink} strokeWidth="2.3" fill="none" strokeLinecap="round"/>
    <path d={`M${gaze*.5}-220l-3 11h6`} stroke="#A7705B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {talk>.15?<ellipse cy="-198" rx={5+talk*2} ry={2+talk*4} fill={C.wine}/>:<path d={warm?'M-8-199q8 6 16 0':worry?'M-8-196q8-5 16 0':annoy?'M-8-197l16-2':'M-7-198h14'} stroke={C.wine} strokeWidth="2" fill="none" strokeLinecap="round"/>}
    {female&&<circle cx="-29" cy="-205" r="2.8" fill={C.ochre}/>}
   </g>
  </g>
 </g>
};
export const Table=({x=540,y=1180,w=540}:{x?:number;y?:number;w?:number})=><g data-prop="table"><path d={`M${x-w/2+30} ${y+20}l-15 180M${x+w/2-30} ${y+20}l15 180`} stroke={C.wood} strokeWidth="18"/><rect x={x-w/2} y={y-12} width={w} height="35" rx="12" fill={C.wood}/><path d={`M${x-w/2+6} ${y-6}h${w-12}`} stroke="#DAC0A2" strokeWidth="4"/></g>;
export const Box=({x,y,s=1,open=0,top=false}:{x:number;y:number;s?:number;open?:number;top?:boolean})=><g data-prop="food-box" transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse cy={top?13:21} rx="91" ry="15" fill={C.ink} opacity=".12"/>
 <rect x="-87" y={top?-72:-20} width="174" height={top?144:44} rx="9" fill="#CCA16C" stroke="#B88852" strokeWidth="3"/>
 {top?<><rect x="-76" y="-62" width="152" height="124" rx="8" fill="#F3CA79"/>{[0,1,2].map(i=><path key={i} d={`M${-37+i*39}-57v114`} stroke="#9E693C" strokeWidth="3"/>)}<path d="M-72 0h144" stroke="#9E693C" strokeWidth="3"/>{Array.from({length:22},(_,i)=><circle key={i} cx={-63+(i*37)%128} cy={-49+(i*23)%102} r={2.2+(i%3)*.4} fill="#73432B"/>)}</>:<><ellipse cy="-15" rx="72" ry="11" fill="#E9BD67"/><path d="M-58-18h116M-25-25v18M24-25v18" stroke="#9E693C" strokeWidth="3"/><g transform={`translate(0 -23) rotate(${-open*68})`}><path d="M-88 0h176l-8-20H-80Z" fill="#E0BA8A" stroke="#B88852" strokeWidth="2"/><path d="M-45-8h90" stroke="#B88852" strokeWidth="2"/></g></>}
</g>;
export const Room=({memory=false,night=false,f=0}:{memory?:boolean;night?:boolean;f?:number})=><g>
 <path d="M100 1375h880" stroke={memory?'#C8B48F':C.line} strokeWidth="3"/>
 <rect x="175" y="720" width="210" height="290" rx="105" fill={memory?'#DBCEA9':night?'#AAB8AD':'#DDE3D8'}/>
 <path d="M280 730v280M180 865h200" stroke={memory?'#F8EBCF':C.paper} strokeWidth="8"/>
 {night?<path d="M323 770q-34 24 2 44q-50 8-48-26q5-29 46-18" fill={C.cream}/>:<circle cx={325+move(f,0,180,0,-12)} cy="786" r="31" fill="#F2D99E"/>}
 <path d="M725 740h150v170H725z" fill="none" stroke={memory?'#D5BE99':C.line} strokeWidth="5"/>
 <path d="M754 860q35-84 92-40" stroke={memory?'#C2A782':C.sage} strokeWidth="3" fill="none"/>
</g>;
export const Bubble=({x=540,y=660,text,w=420,p=1}:{x?:number;y?:number;text:string;w?:number;p?:number})=><g opacity={p} transform={`translate(${x} ${y+14*(1-p)})`}>
 <rect x={-w/2} y="-54" width={w} height="106" rx="32" fill={C.cream} stroke={C.line} strokeWidth="2"/><path d="M-40 51l-14 24 45-24" fill={C.cream} stroke={C.line} strokeWidth="2"/><path d="M-42 50h35" stroke={C.cream} strokeWidth="4"/>
 <text textAnchor="middle" y="10" fontFamily="Lato" fontSize="34" fill={C.wine}>{text}</text>
</g>;
