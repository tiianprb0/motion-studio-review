import React from 'react';
import {ADVANCES} from './font-metrics';
import {ramp,quick,P} from './Character';
export const Context=React.createContext({id:1,f:0,n:1});
export const Word:React.FC<{text:string;f:number;at?:number;x?:number;y?:number;size?:number;color?:string;out?:number}>=({text,f,at=0,x=85,y=350,size=62,color=P.wine,out=9999})=>{
 const parts=text.split(' ');const exit=ramp(f,out,out+7);let cursor=0;
 const widths=parts.map(w=>(ADVANCES[w]??w.length*56)*size/100-Math.max(0,w.length-1)*1.8+size*.33),total=widths.reduce((a,b)=>a+b,0);
 return <g data-kinetic="true" opacity={1-exit} transform={`translate(${x} ${y})`}>
  {parts.map((w,i)=>{const dx=cursor;cursor+=widths[i];const q=quick(f,at+i*3,at+i*3+10),bump=Math.sin(ramp(f,at+i*3+8,at+i*3+15,0,Math.PI))*.035;return <text key={i} x={dx} y={34*(1-q)} fontFamily="Lato" fontSize={size} fontWeight="900" letterSpacing="-1.8" fill={color} opacity={q} transform={`translate(${dx} 0) scale(${1+bump}) translate(${-dx} 0)`}>{w}</text>})}
 </g>
};
export const Popup:React.FC<{text:string;f:number;at:number;x?:number;y?:number;w?:number;tone?:string;out?:number;icon?:'message'|'food'|'small'|'quote'}>=({text,f,at,x=650,y=420,w=470,tone=P.cream,out=9999,icon='message'})=>{
 const q=quick(f,at,at+9),b=1+Math.sin(ramp(f,at+7,at+15,0,Math.PI))*.045,leave=ramp(f,out,out+7),s=(.86+.14*q)*b;
 return <g data-popup="true" opacity={q*(1-leave)} transform={`translate(${x+35*leave} ${y+35*(1-q)-14*leave}) rotate(${-2*(1-q)}) scale(${s})`}>
  <rect x={-w/2+7} y="-48" width={w} height="113" rx="26" fill={P.ink} opacity=".11"/>
  <rect x={-w/2} y="-58" width={w} height="110" rx="24" fill={tone} stroke="#E4D8C5" strokeWidth="2"/>
  <circle cx={-w/2+48} cy="-3" r="26" fill={icon==='food'?'#F3D292':'#D3DDC9'}/>
  {icon==='message'?<g transform={`translate(${-w/2+48} -4)`}><rect x="-12" y="-10" width="24" height="18" rx="5" fill="none" stroke={P.ink} strokeWidth="2"/><path d="M-4 8l-3 5 10-5" fill="none" stroke={P.ink} strokeWidth="2"/></g>:icon==='food'?<path d={`M${-w/2+34} 4h28M${-w/2+36} 2q12-26 24 0`} fill="none" stroke={P.ink} strokeWidth="2.3"/>:<text x={-w/2+48} y="7" textAnchor="middle" fontFamily="Playfair" fontSize="30" fill={P.wine}>{icon==='quote'?'“':'+'}</text>}
  <text x={27} y="9" textAnchor="middle" fontFamily="Lato" fontWeight="700" fontSize={text.length>24?27:34} fill={P.ink}>{text}</text>
 </g>
};
export function RichRoom({memory=false,night=false,shift=0}:{memory?:boolean;night?:boolean;shift?:number}){
 const {id,f}=React.useContext(Context),kitchen=[4,5,10,11,13,14].includes(id),drift=Math.sin(f*.025)*3;
 const wall=memory?'#E4CDAA':night?'#DDDCCF':kitchen?'#E7E8DB':'#ECE5D7';
 return <g transform={`translate(${shift} 0)`}>
  <rect x="-700" y="-600" width="2600" height="2600" fill={wall}/>
  <path d="M-700 1370H1900V2000H-700Z" fill={memory?'#B99973':'#D4BA99'}/>
  {Array.from({length:18},(_,i)=><path key={i} d={`M${-600+i*140} 1370l${(i-5)*80} 600`} stroke="#B99B76" strokeWidth="2" opacity=".55"/>)}
  {kitchen?<>
   <path d="M-200 730H1300V1190H-200Z" fill="#EDE9DC"/>
   {Array.from({length:10},(_,i)=><path key={i} d={`M${i*150-150} 730v460M-200 ${765+i*48}h1500`} stroke="#D5CCBA" strokeWidth="2"/>)}
   <path d="M-150 365H280V655H-150ZM640 365h570v290H640Z" fill={memory?'#AF946D':'#789281'}/>
   <path d="M55 380v265M830 380v265M1030 380v265" stroke="#A8B29B" strokeWidth="3"/>
   <path d="M30 505h30M806 505h30M1004 505h30" stroke="#D7BC83" strokeWidth="5" strokeLinecap="round"/>
   <path d="M-180 1120h1470v245H-180Z" fill="#7F9582"/><path d="M-180 1120h1470v26H-180Z" fill="#E4CEAA"/>
   <path d="M-180 1280h1470M85 1150v210M340 1150v210M600 1150v210M865 1150v210" stroke="#A4B19A" strokeWidth="3"/>
   <g transform="translate(950 1060)"><path d="M-35-110h70v110h-70Z" fill="#D0B18B"/>{[-15,0,15].map((v,i)=><path key={i} d={`M${v} -110l${v*.5} -70`} stroke="#7E5A3F" strokeWidth="6" strokeLinecap="round"/>)}<ellipse cx="-100" cy="40" rx="70" ry="19" fill="#F2E2C9"/><path d="M-137 25v-58q37-32 74 0v58" fill="#D7996F"/></g>
  </>:<>
   <path d="M-400 880H1400v480H-400Z" fill={memory?'#C2A780':'#C5CEBA'}/>
   {Array.from({length:32},(_,i)=><path key={i} d={`M${-250+i*55} 900v450`} stroke={memory?'#AD916A':'#B0BDA3'} strokeWidth="3"/>)}
   <g transform="translate(-160 1200)"><rect x="0" y="-170" width="650" height="270" rx="55" fill={memory?'#B99A77':'#B5816D'}/><rect x="20" y="-40" width="610" height="125" rx="30" fill={memory?'#C3A982':'#C7927C'}/><path d="M320-160v235M75 105v45M570 105v45" stroke="#967058" strokeWidth="8"/><rect x="130" y="-125" width="115" height="110" rx="16" transform="rotate(-12 130 -125)" fill="#E4CFAC"/><path d="M150-85l60 35M164-99l60 35" stroke="#C79F75" strokeWidth="3"/></g>
   <ellipse cx="580" cy="1420" rx="470" ry="110" fill="#E8DCC2"/>{[0,1,2].map(i=><ellipse key={i} cx="580" cy="1420" rx={430-i*55} ry={90-i*12} fill="none" stroke="#CCBC9B" strokeWidth="3"/>)}
  </>}
  <path d="M290 1010V540a150 150 0 0 1 300 0v470Z" fill={night?'#4E685F':'#C4D5C2'} stroke={memory?'#D9C29E':'#F6F0E3'} strokeWidth="14"/>
  <path d="M440 402v600M295 710h290" stroke={memory?'#E9D5B3':'#F6F0E3'} strokeWidth="10"/>
  {night?<path d="M507 480q-41 26 0 52q-61 8-55-32q8-34 55-20" fill="#E8DFC1"/>:<><circle cx="505" cy="500" r="40" fill="#F2D28B"/><path d="M290 1010h300l480 360H430Z" fill="#FFF4C9" opacity=".24"/></>}
  <path d={`M260 350q-30 360 ${-12+drift} 680h-63q12-280 15-680ZM620 350q22 350 ${12-drift} 680h65q-14-280-15-680Z`} fill={memory?'#D2B990':'#DDD0B6'} opacity=".85"/>
  <g transform="translate(930 480)"><rect x="-135" y="-110" width="240" height="290" rx="7" fill="#F4E7CF" stroke="#AF8966" strokeWidth="8"/><path d="M-95 130V-20a60 60 0 0 1 120 0v150Z" fill="#B46D5C"/><path d="M-20 130V35a50 50 0 0 1 100 0v95Z" fill="#8A9D84"/><circle cx="42" cy="-55" r="33" fill="#D1A155"/></g>
  <g transform="translate(95 530)"><path d="M-90 30h190M-90 240h190" stroke="#A5805C" strokeWidth="12"/>{[0,1,2,3].map(i=><g key={i} transform={`translate(${-65+i*27} 0) rotate(${i===3?12:0})`}><rect x="0" y="-80" width="20" height="106" fill={['#A66D5F','#E6CEAB','#7E947C','#C49E63'][i]}/><path d="M4-63h12M4 12h12" stroke="#EBDDC2" strokeWidth="2"/></g>)}<path d="M-48 232q-19-50 3-76l-3-33h50l-3 33q24 35 3 76Z" fill="#C19B73"/><path d="M-24 124v-59m0 42q-39-19-24-43q34 8 24 43m0-10q36-35 29-55q-33 6-29 55" fill="#7F967B"/></g>
  <g transform="translate(770 420)"><path d="M0-300v170" stroke="#7F705D" strokeWidth="5"/><path d="M-90-10q0-125 90-125q90 0 90 125Z" fill="#C69465"/><ellipse cy="-10" rx="90" ry="21" fill="#E4C696"/><ellipse cy="-10" rx="55" ry="10" fill="#FFF0BB"/></g>
  {memory&&<g transform="translate(710 690)"><circle r="56" fill="#F4E8CF" stroke="#AD8963" strokeWidth="7"/><path d="M0-36V0l25 15" stroke="#7E6A4D" strokeWidth="4" fill="none"/></g>}
 </g>
}
