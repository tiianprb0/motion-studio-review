import React from 'react';
import {SHIRT_LOGO} from './brand-data';
import {ReferenceFace} from './ReferenceFace';
export const P={paper:'#F7F0E4',cream:'#FFF9EF',ink:'#283D36',wine:'#8B4354',sage:'#95B8A2',pale:'#DEE2D4',wood:'#BA906B',gold:'#D1A258',skin:'#FCEADE',girl:'#FCEADE',line:'#CFC3AF',memory:'#EAD8B9',night:'#485850'};
export const unit=(x:number)=>Math.min(1,Math.max(0,x));
export const smooth=(x:number)=>{const t=unit(x);return t*t*(3-2*t)};
export const ramp=(f:number,a:number,b:number,x=0,y=1)=>x+(y-x)*smooth((f-a)/(b-a));
export const quick=(f:number,a:number,b:number,x=0,y=1)=>x+(y-x)*(1-Math.pow(1-unit((f-a)/(b-a)),3));
type Point=[number,number];
export type Actor={pose?:'stand'|'sit';x:number;y:number;s?:number;who?:'her'|'him'|'dad'|'boy';view?:'front'|'three'|'side'|'back';dir?:number;mood?:'annoyed'|'hurt'|'thinking'|'soft'|'warm'|'unsure';gaze?:number;lean?:number;head?:number;left?:Point;right?:Point;step?:number;talk?:number;f?:number;role?:'principal'|'foreground'|'background';framing?:'full'|'medium'|'close';alpha?:number};
const Arm=({side,hand,girl,cloth}:{side:number;hand:Point;girl:boolean;cloth:string})=>{
 const sx=side*(girl?36:42),sy=girl?-202:-209,[hx,hy]=hand,ex=sx+(hx-sx)*.42+side*12,ey=Math.max(sy+32,(sy+hy)/2+17);
 return <g><path d={`M${sx} ${sy}Q${ex} ${ey} ${hx} ${hy}`} stroke={girl?P.skin:cloth} strokeWidth={girl?12.9:18} strokeLinecap="round" fill="none"/>{girl?<path d={`M${sx} ${sy}L${sx+(hx-sx)*.20} ${sy+(hy-sy)*.20}`} stroke={cloth} strokeWidth="18" strokeLinecap="round"/>:<path d={`M${ex*.25+hx*.75} ${ey*.25+hy*.75}L${hx} ${hy}`} stroke={P.skin} strokeWidth="13" strokeLinecap="round"/>}<circle cx={hx} cy={hy} r={girl?7.8:8.2} fill={P.skin}/></g>
};
export const Person:React.FC<Actor>=({x,y,s=1,who='him',view='three',dir=1,mood='soft',gaze=0,lean=0,head=0,left=[-47,-139],right=[47,-139],step=0,talk=0,f=0,role='principal',framing='full',alpha=1,pose='stand'})=>{
 const girl=who==='her',dad=who==='dad',boy=who==='boy',cloth=girl?'#FFCDB2':boy?'#B8BBA6':dad?'#8BA38F':'#95B8A2',pants=girl?'#9FB8AD':'#829B8E',stride=step*14;
 const blink=Math.floor(f+who.length*19)%143>139;
 return <g data-actor={who} data-role={role} data-framing={framing} opacity={alpha} transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cx={pose==='sit'?dir*40:0} cy="3" rx="53" ry="7" fill={P.ink} opacity=".10"/>
  {pose==='sit'?<>
   <path d={`M-16-133Q${dir*12}-91 ${dir*42}-89L${dir*46}-5M16-133Q${dir*30}-95 ${dir*66}-89L${dir*70}-5`} fill="none" stroke={girl?P.skin:pants} strokeWidth={girl?13.5:26} strokeLinecap="round"/>
   <path d={`M${dir*35} -1h${dir*27}M${dir*59} -1h${dir*27}`} stroke={girl?'#78978A':'#6F897B'} strokeWidth="9" strokeLinecap="round"/>
  </>:<><path d={`M-16-133Q${-20-stride*.5}-76 ${-21+stride}-4M16-133Q${20+stride*.5}-76 ${21-stride}-4`} fill="none" stroke={girl?P.skin:pants} strokeWidth={girl?13.5:26} strokeLinecap="round"/>
  <path d={`M${-33+stride} -1h27M${11-stride} -1h27`} stroke={girl?'#78978A':'#6F897B'} strokeWidth="9" strokeLinecap="round"/></>}
  <g transform={`rotate(${lean} 0 -135)`}>
   {girl&&<><path d="M-27-171l-3 10q30 4 60 0l-3-10Z" fill={P.skin}/><g data-skirt="knee-length"><path d={pose==='sit'?`M-30-161q30 4 60 0q8 38 ${dir*35} 62l${-dir*50} 20q-36-10-45-44Z`:"M-30-161q30 4 60 0l13 96q-43 8-86 0Z"} fill={pants}/><path d={pose==='sit'?`M-15-147q8 36 ${dir*38} 54M15-147q4 27 ${dir*37} 43`:"M-15-147l-7 76M15-147l7 76"} stroke="#8BA79A" strokeWidth="1.5" opacity=".7" fill="none"/><path d={pose==='sit'?`M${dir*65-50}-79q-36-10-45-44`:"M-43-65q43 8 86 0"} stroke="#84A194" strokeWidth="1.8" fill="none"/></g><path d="M-30-161q30 4 60 0" stroke="#84A194" strokeWidth="2.6" fill="none"/></>}
   <Arm side={-1} hand={left} girl={girl} cloth={cloth}/>
   <path d={girl?'M-40-202Q-37-235 0-235Q37-235 40-202L27-171Q0-168-27-171Z':'M-52-203Q-45-238 0-238Q45-238 52-203L59-134H-59Z'} fill={cloth}/>
   {girl?<><path d="M-16-233q16 17 32 0" stroke="#EAA989" strokeWidth="4.8" fill="none" strokeLinecap="round"/><path d="M-27-171q27 3 54 0" stroke="#EAA989" strokeWidth="2.8" fill="none"/>{view!=='back'&&<image data-shirt-logo="true" href={SHIRT_LOGO} x="-23" y="-211" width="46" height="16" transform={`translate(0 -204) skewX(${view==='three'?-dir*4:0}) translate(0 204)`}/>}</>:<><path d="M-16-236q16 16 32 0" stroke="#7A9E88" strokeWidth="5" fill="none" strokeLinecap="round"/><rect x="-34" y="-207" width="17" height="19" rx="2.6" fill="#84A892"/></>}
   <rect x="-10.3" y="-252" width="20.6" height="24" rx="8.6" fill={P.skin}/><path d="M-10-249q10 10 20 0v8q-10 9-20 0Z" fill="#F2C6B6" opacity=".5"/>
   <Arm side={1} hand={right} girl={girl} cloth={cloth}/>
   <g data-face={who} transform={`translate(${view==='three'?dir*2:0} 0) rotate(${head} 0 -279)`}><ReferenceFace who={who} view={view} dir={dir} mood={mood} blink={blink} gaze={gaze} talk={talk}/></g>
  </g>
 </g>
};
