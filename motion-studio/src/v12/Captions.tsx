import React from 'react';
import {quick,ramp,P} from './Character';
import layouts from './caption-layouts.json';
import metrics from './caption-metrics.json';
export type Cue={start:number;end:number;text:string;segment:string};
export type Position='top-left'|'top-center'|'top-right'|'middle-left'|'middle-center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right';
export const SAFE_AREA={left:90,right:900,top:280,bottom:1240};
export const POSITIONS:Record<Position,{x:number;y:number;align:'left'|'center'|'right';vertical:'top'|'middle'|'bottom'}>={
 'top-left':{x:110,y:300,align:'left',vertical:'top'},'top-center':{x:540,y:300,align:'center',vertical:'top'},'top-right':{x:880,y:300,align:'right',vertical:'top'},
 'middle-left':{x:110,y:960,align:'left',vertical:'middle'},'middle-center':{x:540,y:960,align:'center',vertical:'middle'},'middle-right':{x:880,y:960,align:'right',vertical:'middle'},
 'bottom-left':{x:110,y:1220,align:'left',vertical:'bottom'},'bottom-center':{x:540,y:1220,align:'center',vertical:'bottom'},'bottom-right':{x:880,y:1220,align:'right',vertical:'bottom'},
};
export const FONT_SIZE=44;
export const CAPTION_LAYOUTS=layouts;
const key=(word:string)=>word.replace(/[^\p{L}]/gu,'').toLowerCase();
const highlighted=(word:string)=>['maaf','kesal','gengsi','martabak','bertumbuh','makasih','kebiasaan','berdamai'].includes(key(word));
const advances:Record<string,number>=metrics;
const wordWidth=(word:string)=>Math.ceil(advances[word])+20;
export function captionGeometry(index:number){
 const l=layouts[index],zone=POSITIONS[l.position as Position],rows:string[][]=[];
 for(const line of l.text.split('\n')){let row:string[]=[],width=0;for(const word of line.split(/\s+/).filter(Boolean)){const w=wordWidth(word);if(row.length&&width+8+w>l.width){rows.push(row);row=[];width=0}row.push(word);width+=w+(row.length>1?8:0)}if(row.length)rows.push(row)}
 const height=rows.length*62+(rows.length-1)*8,top=zone.vertical==='top'?zone.y:zone.vertical==='middle'?zone.y-height/2:zone.y-height;
 return {zone,rows,top,height};
}
export const Caption:React.FC<{cue:Cue;index:number;frame:number}>=({cue,index,frame})=>{
 const {zone,rows,top}=captionGeometry(index),entry=Math.ceil(cue.start*30),end=Math.ceil(cue.end*30),q=quick(frame,entry,entry+7),leave=1-ramp(frame,end-3,end);
 const dx=(1-q)*(zone.align==='left'?-16:zone.align==='right'?16:0),dy=(1-q)*(zone.vertical==='bottom'?16:-12);
 return <g data-caption="true" data-cue={index} data-position={layouts[index].position} data-align={zone.align} data-caption-mode="svg-word-backgrounds" opacity={q*leave} transform={`translate(${dx} ${dy})`} fontFamily="Lato" fontSize={FONT_SIZE} fontWeight="700">
  {rows.map((row,i)=>{const width=row.reduce((a,w)=>a+wordWidth(w),0)+(row.length-1)*8;let cursor=zone.x-(zone.align==='right'?width:zone.align==='center'?width/2:0);return <g key={i} data-caption-row="true">{row.map((word,j)=>{const x=cursor,w=wordWidth(word),accent=highlighted(word);cursor+=w+8;return <g data-caption-word="true" key={j}><rect x={x} y={top+i*70} width={w} height="62" rx="8" fill={accent?(key(word)==='bertumbuh'?P.ink:P.wine):'#FFFAF1'} stroke="#FFFFFF" strokeOpacity=".35"/><text x={x+10} y={top+i*70+45} fill={accent?P.cream:P.ink} fontWeight={accent?900:700}>{word}</text></g>})}</g>})}
 </g>;
};
