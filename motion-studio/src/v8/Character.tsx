import React from 'react';
import {SHIRT_LOGO} from './brand-data';
export const P={paper:'#F4EEE3',cream:'#FFF9EF',ink:'#283D36',wine:'#763C4D',sage:'#869781',pale:'#DEE2D4',wood:'#BA906B',gold:'#C69558',skin:'#D6A088',girl:'#E4B69B',line:'#CFC3AF',memory:'#EAD8B9',night:'#485850'};
export const unit=(x:number)=>Math.min(1,Math.max(0,x));
export const smooth=(x:number)=>{const t=unit(x);return t*t*(3-2*t)};
export const ramp=(f:number,a:number,b:number,x=0,y=1)=>x+(y-x)*smooth((f-a)/(b-a));
export const quick=(f:number,a:number,b:number,x=0,y=1)=>x+(y-x)*(1-Math.pow(1-unit((f-a)/(b-a)),3));
type Point=[number,number];
export type Actor={x:number;y:number;s?:number;who?:'her'|'him'|'dad'|'boy';view?:'front'|'three'|'side'|'back';dir?:number;mood?:'annoyed'|'hurt'|'thinking'|'soft'|'warm'|'unsure';gaze?:number;lean?:number;head?:number;left?:Point;right?:Point;step?:number;talk?:number;f?:number;role?:'principal'|'foreground'|'background';framing?:'full'|'medium'|'close';alpha?:number};
const arm=(sx:number,hand:Point,cloth:string,skin:string,bare=false)=>{
 const [hx,hy]=hand,sy=-221,ex=sx+(hx-sx)*.40+(sx>0?13:-13),ey=Math.max(sy+36,(sy+hy)/2+18);
 return <g><path d={`M${sx} ${sy}Q${ex} ${ey} ${hx} ${hy}`} stroke={bare?skin:cloth} strokeWidth={bare?13:20} strokeLinecap="round" fill="none"/>{!bare&&<path d={`M${ex*.38+hx*.62} ${ey*.38+hy*.62}L${hx} ${hy}`} stroke={skin} strokeWidth="13" strokeLinecap="round"/>}<ellipse cx={hx} cy={hy} rx="8" ry="7" fill={skin}/></g>
};
export const Person:React.FC<Actor>=({x,y,s=1,who='him',view='three',dir=1,mood='soft',gaze=0,lean=0,head=0,left=[-47,-139],right=[47,-139],step=0,talk=0,f=0,role='principal',framing='full',alpha=1})=>{
 const female=who==='her',boy=who==='boy',dad=who==='dad',skin=female?P.girl:P.skin,cloth=female?P.cream:boy?'#BF8E60':dad?'#65715D':P.sage;
 const h=boy?24:31,hy=boy?-278:-279,side=view==='side',three=view==='three',back=view==='back',cx=side?dir*5:three?dir*3:0;
 const worried=mood==='hurt'||mood==='unsure',angry=mood==='annoyed',warm=mood==='warm';
 const blink=(Math.floor(f+who.length*19)%143)>139;
 const stride=step*14;
 return <g data-actor={who} data-role={role} data-framing={framing} opacity={alpha} transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="3" rx="55" ry="7" fill={P.ink} opacity=".12"/>
  <path d={`M-17-133Q${-20-stride*.5}-76 ${-22+stride} -4M17-133Q${20+stride*.5}-76 ${22-stride} -4`} fill="none" stroke={P.ink} strokeWidth={female?24:25} strokeLinecap="round"/>
  <path d={`M${-34+stride} -1h27M${12-stride} -1h27`} stroke={P.ink} strokeWidth="10" strokeLinecap="round"/>
  <g transform={`rotate(${lean} 0 -135)`}>
   {female&&<><path d="M-29-172h58l4 42q-33 12-66 0Z" fill={skin}/><path d="M-33-153q33 9 66 0l3 37h-72Z" fill={P.ink}/></>}
   {arm(-30,left,cloth,skin,female)}
   <path d={female?'M-31-232Q0-244 30-232L38-171Q0-164-38-171Z':side?'M-24-233Q0-244 24-233L31-136Q0-125-31-136Z':'M-32-233Q0-247 33-233L41-136Q0-122-41-136Z'} fill={cloth}/>
   {female&&<><path d="M-38-172q38 9 76 0" stroke="#DDCEB6" strokeWidth="2"/><image data-shirt-logo="true" href={SHIRT_LOGO} x={three?-23:-27} y="-213" width={side?35:54} height="17" transform={`translate(0 -204) skewX(${side?-dir*10:three?-dir*5:0}) translate(0 204)`} preserveAspectRatio="xMidYMid meet"/></>}
   {!female&&<path d="M-7-239l7 16 9-16M0-223v40" stroke={dad?'#859078':'#A7B19C'} strokeWidth="2" fill="none"/>}
   <path d="M-10-250v19q10 9 20 0v-19" fill={skin}/>
   {arm(30,right,cloth,skin,female)}
   <g data-face={who} transform={`translate(${cx} 0) rotate(${head} 0 -279)`}>
    {female&&<path d="M-35-277q-3-48 36-48q36 1 34 47l3 37q-9 11-19 7l-4-22h-32l-5 22q-12 2-20-7Z" fill="#23312D"/>}
    {back?<><ellipse cy={hy} rx={h+1} ry={40} fill={P.ink}/><path d="M-31-286q-3-40 31-40q36 0 32 42l-2 28h-60Z" fill={P.ink}/><path d="M-12-250h24v12h-24Z" fill={skin}/></>:<>
     {side?<path d={`M ${-dir*19} -310 Q ${dir*15} -324 ${dir*29} -302 L ${dir*32} -285 l ${dir*10} 10 ${-dir*11} 4 q -1 27 ${-dir*24} 27 q ${-dir*30} -3 ${-dir*30} -36 q 0 -23 ${dir*4} -30 Z`} fill={skin}/>:<ellipse cy={hy} rx={h} ry={boy?33:39} fill={skin}/>}
     <circle cx={side?-dir*20:-31} cy="-274" r="6" fill={skin}/>{!side&&<circle cx="31" cy="-274" r="6" fill={skin}/>}
     <path d={female?'M-31-286q-3-39 31-39q37 1 33 42q-14-10-16-25q-18 20-48 22':side?`M ${-dir*26} -282 q ${-dir*10} -47 ${dir*28} -45 q ${dir*30} 2 ${dir*30} 28 q ${-dir*18} -3 ${-dir*28} -12 q ${-dir*4} 19 ${-dir*30} 29 Z`:'M-32-287q-3-39 32-40q38 1 34 39l-17-15q-18 16-49 16Z'} fill={P.ink}/>
     {dad&&<path d="M-28-300l8-16M22-317l8 18" stroke="#B6B5A4" strokeWidth="4"/>}
     {female?<g>{[-13,12].map((c,i)=><g key={i}><path d={`M${c-6}-280q6-${blink?0:4.6} 12 0q-6 ${blink?0:3} -12 0Z`} fill={P.cream} stroke={P.ink} strokeWidth="1.2"/>{!blink&&<ellipse cx={c+Math.max(-2,Math.min(2,gaze*.5))} cy="-280" rx="2.1" ry="2.5" fill={P.ink}/>}</g>)}</g>:side?<path d={`M${dir*19}-282v${blink?1:3}`} stroke={P.ink} strokeWidth="3" strokeLinecap="round"/>:<path d={`M${-15+gaze}-282v${blink?1:3.4}M${10+gaze}-282v${blink?1:3.4}`} stroke={P.ink} strokeWidth="3" strokeLinecap="round"/>}
     <path d={side?`M${dir*12}-293l${dir*10} ${angry?3:worried?-3:0}`:angry?'M-21-294l12 4M7-290l12-4':worried?'M-21-290l12-5M7-295l12 5':'M-20-294h11M7-294h11'} stroke={P.ink} strokeWidth="2.3" strokeLinecap="round" fill="none"/>
     {!side&&<path d={`M${three?dir*5:0}-280l-3 12h6`} stroke="#AB7B63" strokeWidth="1.4" fill="none" strokeLinecap="round"/>}
     {talk>.12?<ellipse cx={side?dir*19:three?dir*3:0} cy="-256" rx={3+talk*3} ry={1.6+talk*4} fill={P.wine}/>:<path d={side?`M${dir*14}-256h${dir*11}`:warm?'M-7-257q7 5 14 0':worried?'M-7-254q7-4 14 0':angry?'M-7-254l14-2':'M-7-256h14'} stroke={P.wine} strokeWidth="1.9" strokeLinecap="round" fill="none"/>}
     {female&&<circle cx={side?-dir*22:-29} cy="-265" r="2.6" fill={P.gold}/>}
    </>}
   </g>
  </g>
 </g>
};
