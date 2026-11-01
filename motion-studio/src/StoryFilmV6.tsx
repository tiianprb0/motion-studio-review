import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import timing from './timing-v6.json';

/* ---------- palette & easing ---------- */
const P={paper:'#F4EFE5',ink:'#263D36',pale:'#DDE2D1',sage:'#91A087',rose:'#E8C5B8',wine:'#793F4D',clay:'#C67D65',night:'#213B3A',white:'#FFFCF5',muted:'#738073',cream:'#F3E7D0',wood:'#C9A882',kraft:'#D9B68C'};
const mem={bg:'#F2E5CB',ink:'#5E5040',line:'#B9A583',wine:'#8B5A5F',sage:'#9CAA8B',clay:'#CB8F73',paper:'#F8EFDD'};
const E=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.62,0,.22,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const O=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.16,1,.3,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const I=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.55,0,.85,.35),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const bump=(f:number,a:number,b:number)=>Math.sin(E(f,a,b,0,Math.PI));

type Pt=[number,number];
type Mood='neutral'|'warm'|'firm'|'worried'|'soft';
export type Actor={id:string;x:number;y:number;s:number;woman?:boolean;mood?:Mood;look?:number;lean?:number;nod?:number;seated?:boolean;walk?:number;left?:Pt;right?:Pt;alpha?:number;back?:boolean;child?:boolean;shirt?:string;skin?:string;hair?:string};
export type Cam={z:number;cx:number;cy:number;a:number;sy:number};

/* ---------- character ---------- */
const ChairBack=({tone=P.sage}:{tone?:string})=><g>
 <rect x="-80" y="-198" width="160" height="152" rx="17" fill={tone} opacity=".34"/>
 <rect x="-88" y="-58" width="176" height="22" rx="10" fill={tone} opacity=".62"/>
 <path d="M-68-34v40M68-34v40" stroke={tone} strokeWidth="13" opacity=".55" strokeLinecap="round"/>
</g>;
const Person=({f=0,x,y,s=1,woman=false,mood='neutral',look=0,lean=0,nod=0,seated=false,walk=0,left,right,alpha=1,back=false,child=false,shirt,skin=P.rose,hair=P.ink}:Actor&{f:number})=>{
 const gait=Math.sin(f*.21)*walk,worried=mood==='worried',warm=mood==='warm',firm=mood==='firm',soft=mood==='soft';
 const L=left??[-55,-62],R=right??[55,-62];
 const shirtColor=shirt??(woman?P.clay:P.sage);
 const hk=child?1.02:1;
 return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={alpha}>
  <ellipse cy="6" rx="72" ry="10" fill={P.ink} opacity=".10"/>
  {seated&&<ChairBack tone={shirtColor}/>}
  <path d={seated?'M-24-68Q-44-64-46-52v52M24-68Q44-64 46-52v52':`M-23-67Q${-27-gait*20}-27 ${-27+gait*24} 0M23-67Q${27+gait*20}-27 ${27-gait*24} 0`} fill="none" stroke={P.ink} strokeWidth="24" strokeLinecap="round"/>
  <path d={seated?'M-64 2h36M28 2h36':`M${-39+gait*24} 2h26M${15-gait*24} 2h26`} stroke={P.ink} strokeWidth="11" strokeLinecap="round"/>
  <g transform={`rotate(${lean} 0 -85)`}>
   <path d="M-39-150Q0-172 39-150L48-64Q0-49-48-64Z" fill={shirtColor}/>
   <path d="M-12-170v24h24v-24" fill={P.rose} opacity=".85"/>
   {([[ -38,-143,L],[38,-143,R]] as [number,number,Pt][]).map(([sx,sy,h],i)=><g key={i}>
     <path d={`M${sx} ${sy}Q${sx+(h[0]-sx)*.28+(i?-12:12)} ${Math.max(h[1],sy)+52} ${h[0]} ${h[1]}`} fill="none" stroke={shirtColor} strokeWidth="22" strokeLinecap="round"/>
     <circle cx={h[0]} cy={h[1]} r="10" fill={skin}/></g>)}
   <g transform={`rotate(${look*1.8+nod} 0 -202)`}>
    <g transform={`translate(0 -202) scale(${hk}) translate(0 202)`}>
     {back?<>
       <ellipse cy="-207" rx="34" ry="41" fill={hair}/>
       <path d="M-33-202q-6-52 33-52q39 0 33 52l-4 26h-58Z" fill={hair}/>
       <circle cx="-33" cy="-203" r="7" fill={skin} opacity=".9"/><circle cx="33" cy="-203" r="7" fill={skin} opacity=".9"/>
       <path d="M-11-172v14h22v-14" fill={skin}/>
     </>:<>
       {woman&&<><circle cx="-30" cy="-219" r="19" fill={hair}/><path d="M-34-194q-9-66 33-66q49 0 36 66l-3 28h-65Z" fill={hair}/></>}
       {child&&<><ellipse cy="-207" rx="29" ry="35" fill={P.rose}/><path d="M-30-212q-5-44 29-43q35 1 30 42q-21-2-32-21q-5 17-27 22" fill={hair}/><circle cx="-26" cy="-216" r="10" fill={hair}/><circle cx="26" cy="-216" r="10" fill={hair}/></>}
       <ellipse cy="-207" rx="33" ry="40" fill={skin}/>
       <path d={woman?'M-33-214q-5-50 32-48q40 1 35 47q-24-2-36-24q-6 20-31 25':'M-33-216q-4-42 32-43q39 1 34 41L17-235q-26 16-50 19'} fill={hair}/>
       <path d={`M${-13+look}-209v3M${12+look}-209v3`} stroke={P.ink} strokeWidth="3.5" strokeLinecap="round"/>
       <path d={worried?'M-20-222l11 4m16 0 12-4':firm?'M-20-218l11-3m18 0l11 3':soft?'M-20-217h11m18 0h11':'M-20-219h11m18 0h11'} stroke={P.ink} strokeWidth="2.4" fill="none" strokeLinecap="round"/>
       <path d={worried?'M-9-188q9-5 18 0':warm?'M-9-190q9 6 18 0':firm?'M-9-188h18':'M-8-189h16'} stroke={P.wine} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
     </>}
    </g>
   </g>
  </g>
 </g>;
};

/* ---------- props ---------- */
const Floor=({tone='day',cy=1250}:{tone?:'day'|'night'|'memory';cy?:number})=><>
 <path d={`M-300 ${cy} 540 ${cy-215}l840 215-840 300Z`} fill={tone==='night'?'#3B5651':tone==='memory'?'#E7D6B2':P.pale} opacity=".55"/>
 <path d={`m-300 ${cy} 840-215 840 215`} fill="none" stroke={tone==='night'?'#5A756F':tone==='memory'?'#C9B08A':'#CED4C4'} strokeWidth="2"/>
</>;
const Table=({x=540,y=1140,s=1,tone=P.white,leg='#C4B49A'}:{x?:number;y?:number;s?:number;tone?:string;leg?:string})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse cy="22" rx="272" ry="30" fill={P.ink} opacity=".10"/>
 <rect x="-268" y="132" width="18" height="128" rx="7" fill={leg}/><rect x="250" y="132" width="18" height="128" rx="7" fill={leg}/>
 <rect x="-268" y="-16" width="536" height="36" rx="16" fill={tone} stroke={leg} strokeWidth="2.5" opacity="1"/><rect x="-268" y="10" width="536" height="12" rx="6" fill={leg} opacity=".85"/>
</g>;
const Plate=({x,y,s=1,full=0}:{x:number;y:number;s?:number;full?:number})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse rx="66" ry="24" fill={P.ink} opacity=".10"/>
 <ellipse rx="62" ry="22" fill={P.white}/><ellipse rx="52" ry="17" fill="#EDE6D6"/>
 {full>0&&<><ellipse rx={40*full} ry={13*full} fill="#FBF6EA"/><path d={`M${-36*full} -2q34-${17*full} ${72*full} 0q-34 ${12*full} ${-72*full} 0Z`} fill="#FFFDF6" opacity={full}/><ellipse cx={-16*full} cy={-4*full} rx="9" ry="5" fill={P.clay} opacity={.85*full}/></>}
</g>;
const Cup=({x,y,s=1,steam=0}:{x:number;y:number;s?:number;steam?:number})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <path d="M-26 -6h52l-7 46q-19 8-38 0Z" fill={P.white}/><path d="M26 4q18 2 15 16q-3 13-19 12" fill="none" stroke={P.white} strokeWidth="7"/>
 <ellipse cy="-6" rx="26" ry="9" fill="#E7DECD"/>
 {steam>0&&[0,1].map(i=><path key={i} d={`M${-9+i*17} -18q-12 -22 2 -40`} fill="none" stroke={P.muted} strokeWidth="3" strokeLinecap="round" opacity={.4*steam} strokeDasharray="40" strokeDashoffset={40*(1-steam)}/>)}
</g>;
const Steam=({x,y,w=1,p=1,tone='#B9AE99'}:{x:number;y:number;w?:number;p?:number;tone?:string})=><g transform={`translate(${x} ${y}) scale(${w})`} opacity={p}>
 {[0,1,2].map(i=><path key={i} d={`M${-24+i*24} 0c-16-26 14-34 0-58c-13-22 10-28 2-46`} fill="none" stroke={tone} strokeWidth={4-i*.4} strokeLinecap="round" strokeDasharray="120" strokeDashoffset={120*(1-p)} opacity={.5-i*.1}/>)}
</g>;
const FoodBox=({x,y,s=1,open=1}:{x:number;y:number;s?:number;open?:number})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse cy="30" rx="58" ry="16" fill={P.ink} opacity=".12"/>
 <path d="M-52-6h104l-8 40q-44 10-88 0Z" fill={P.kraft}/>
 <path d="M-52-6h104l-3 13h-98Z" fill="#C79F73"/>
 <g transform={`translate(0 -6) rotate(${-24*open})`}><path d="M-52 0h104l4-11q-56-10-108 0Z" fill="#E3C6A2"/></g>
 <path d="M-30 6h60" stroke="#B98F63" strokeWidth="3"/>
 <path d="M-64 34q30-10 60 0" stroke={P.rose} strokeWidth="6" fill="none" strokeLinecap="round" opacity=".8"/>
</g>;
const PaperBag=({x,y,s=1,rot=0}:{x:number;y:number;s?:number;rot?:number})=><g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
 <path d="M-38-58h76v96q-38 10-76 0Z" fill={P.kraft}/>
 <path d="M-38-58h76l-6-12h-64Z" fill="#C79F73"/>
 <path d="M-22-70q22-16 44 0" fill="none" stroke="#A8815A" strokeWidth="5"/>
 <path d="M-16-30h32M-16-16h22" stroke="#B98F63" strokeWidth="4" strokeLinecap="round"/>
</g>;
const Plant=({x,y,s=1,sway=0,tone=P.sage,pot=P.clay}:{x:number;y:number;s?:number;sway?:number;tone?:string;pot?:string})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse cy="4" rx="54" ry="12" fill={P.ink} opacity=".10"/>
 <path d="M-42 -96h84l-12 100h-60Z" fill={pot}/>
 <path d="M-42 -96h84l-4 14h-76Z" fill="#B06B55" opacity=".55"/>
 <g transform={`rotate(${sway} 0 -96)`}>
  {[[-1,-1,.9],[-1,1,.75],[1,-1,.8],[1,1,.65]].map(([sx,sy,sc],i)=><path key={i} d={`M0 -96q${sx*88} -${70*sc} ${sx*46} -${150*sc}q${-sx*64} ${44*sc} ${-sx*46} ${150*sc}`} fill={tone} opacity={.8-i*.06}/>)}
  <path d="M0 -96q-8 -110 6 -150q22 60 6 150" fill={P.ink} opacity=".55"/>
 </g>
</g>;
const Window=({x,y,s=1,tone='#BFD4D6',night=false}:{x:number;y:number;s?:number;tone?:string;night?:boolean})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <rect x="-96" y="-140" width="192" height="280" rx="8" fill={night?'#132B31':'#DCE7E4'}/>
 <rect x="-96" y="-140" width="192" height="280" rx="8" fill={tone} opacity={night?.55:.75}/>
 <path d="M-96 0h192M0 -140v280" stroke={P.white} strokeWidth="9" opacity=".9"/>
 <rect x="-108" y="-152" width="216" height="304" rx="11" fill="none" stroke={P.ink} strokeWidth="7" opacity=".85"/>
 {night?<g opacity=".85">{[0,1,2,3,4].map(i=><circle key={i} cx={-66+((i*37)%130)} cy={-108+((i*53)%210)} r={2.4} fill="#F2EFD9"/>)}</g>:<path d="M-70-96q40-40 96-24" stroke={P.white} strokeWidth="4" fill="none" opacity=".8"/>}
</g>;
const Doorframe=({x,y,s=1}:{x:number;y:number;s?:number})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <rect x="-16" y="-330" width="32" height="600" fill="#D8CDB6"/><rect x="-120" y="-330" width="230" height="26" fill="#D8CDB6"/>
 <path d="M-16-330v600" stroke="#C2B69E" strokeWidth="3"/>
</g>;
const SinkUnit=({x,y,s=1,f=0}:{x:number;y:number;s?:number;f?:number})=><g transform={`translate(${x} ${y}) scale(${s})`}>
 <rect x="-190" y="-150" width="380" height="300" rx="6" fill="#E3DAC5"/>
 <rect x="-190" y="-150" width="380" height="18" rx="6" fill="#CFC4AC"/>
 <ellipse cy="-118" rx="112" ry="30" fill="#B9AE96"/><ellipse cy="-114" rx="104" ry="26" fill="#7B8B84"/>
 <path d="M-104 -114q104-26 208 0" stroke="#6C7C75" strokeWidth="3" fill="none"/>
 <path d="M92 -114v-86q0-26-28-26h-46" stroke="#8E9C94" strokeWidth="12" fill="none" strokeLinecap="round"/>
 <path d="M18 -226v-14" stroke="#8E9C94" strokeWidth="10" strokeLinecap="round"/>
 <path d="M18 -226v78" stroke="#CFE4E0" strokeWidth="7" opacity={.85}/>
 <path d="M18 -148q-6 16 0 30" stroke="#CFE4E0" strokeWidth="5" opacity={.7}/>
 {[0,1,2].map(i=><circle key={i} cx={-40+i*46} cy={-104+((f*1.6+i*23)%22)} r={4+i} fill={P.white} opacity=".75"/>)}
 <ellipse cx="18" cy="-150" rx="46" ry="12" fill={P.white} opacity=".55"/>
</g>;
const LightBand=({p=0,x=540}:{p?:number;x?:number})=><g opacity={p}><path d={`M${x-330} 1120h300l-90 250h-300Z`} fill="#FFF6D9" opacity=".55"/></g>;

/* ---------- title, bubble, caption ---------- */
const TitleLines=({lines,f,inAt=4,outAt=999,dark=false,size}:{lines:string[];f:number;inAt?:number;outAt?:number;dark?:boolean;size?:number})=>{
 const sz=size??(lines.length>2?72:86);
 const out=O(f,outAt,outAt+14,0,1);
 return <g opacity={1-out} transform={`translate(0 ${306-26*out})`}>
  {lines.map((l,i)=>{
   const p=O(f,inAt+i*6,inAt+i*6+24);
   return <g key={i} opacity={p} transform={`translate(${-30*(1-p)} ${(34*(1-p))+(i*sz*1.12)})`}>
    <text x="88" y="0" fontFamily="Playfair" fontSize={sz} letterSpacing="-2.2" fontStyle={i===lines.length-1?'italic':'normal'} fill={i===lines.length-1?(dark?P.rose:P.wine):(dark?P.white:P.ink)}>{l}</text>
   </g>;
  })}
  <path d={`M88 ${lines.length*sz*1.12-10}H${88+200*O(f,inAt+14,inAt+52)}`} stroke={P.wine} strokeWidth="3" opacity={.55}/>
 </g>;
};
const Say=({x,y,w=400,text,f,at=0,out=999,tone=P.white,ink=P.wine,fs=34,tail='bl'}:{x:number;y:number;w?:number;text:string;f:number;at?:number;out?:number;tone?:string;ink?:string;fs?:number;tail?:'bl'|'br'})=>{
 const p=O(f,at,at+20)*(1-I(f,out,out+12));
 const ty=tail==='br'?w*.72:w*.3;
 return <g opacity={p} transform={`translate(${x} ${y+16*(1-p)}) scale(${.95+.05*p})`}>
  <path d={`M0 0h${w}q22 0 22 22v${68}q0 22-22 22H${ty+18}l${tail==='br'?-18:-18} 26v-26H0q-22 0-22-22V22Q-22 0 0 0Z`} fill={tone}/>
  <text x={w/2} y={fs+22} textAnchor="middle" fontFamily="Playfair" fontStyle="italic" fontSize={fs} fill={ink}>{text}</text>
 </g>;
};

/* ---------- shots ---------- */
type ShotDef={id:string;start:number;end:number};
export const SHOTS:ShotDef[]=[
 {id:'hook1',start:0,end:3.44},
 {id:'hook2',start:3.44,end:9.36},
 {id:'food',start:9.36,end:14.30},
 {id:'task',start:14.30,end:17.10},
 {id:'normal',start:17.10,end:20.90},
 {id:'gengsi',start:20.90,end:26.14},
 {id:'eyes',start:26.14,end:32.51},
 {id:'backs',start:32.51,end:37.10},
 {id:'breakfast',start:37.10,end:41.84},
 {id:'learned',start:41.84,end:48.51},
 {id:'learn',start:48.51,end:54.98},
 {id:'wrong',start:54.98,end:57.00},
 {id:'right',start:57.00,end:62.48},
 {id:'understand',start:62.48,end:69.10},
 {id:'taught',start:69.10,end:73.02},
 {id:'accept',start:73.02,end:77.68}
];
const shot=(id:string)=>SHOTS.find(s=>s.id===id)!;
const cam=(z:number,cx:number,cy:number,a=0,sy=40):Cam=>({z,cx,cy,a,sy});
const Camera=({c,children,k=1}:{c:Cam;children:React.ReactNode;k?:number})=><g transform={`translate(540 ${960+c.sy}) rotate(${c.a}) scale(${c.z*k}) translate(${-c.cx*k} ${-c.cy*k})`}>{children}</g>;

export type SceneState={cam:Cam;actors:Actor[];art:React.ReactNode};

/* 1 — pertengkaran, dua orang berjarak */
function hook1(f:number):SceneState{
 const raise=E(f,16,42,0,1)*(1-E(f,58,80,0,1));
 const a:Actor={id:'her',x:392,y:1300,s:1.5,woman:true,mood:f<58?'firm':'worried',look:3,lean:1,right:[55+raise*24,-62-raise*86],left:[-30,-72]};
 const b:Actor={id:'him',x:742,y:1300,s:1.5,mood:'neutral',look:f<52?-2:-5,lean:f<52?0:-2,left:[-55,-62],right:[55,-64]};
 const c=cam(E(f,0,103,1.14,1.34),540,1160,E(f,0,103,0,-2.2),44);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-200" width="1900" height="1600" fill={P.paper}/>
  <rect x="-400" y="430" width="1900" height="820" fill="#EDE8DA"/>
  <Floor cy={1250}/>
  <Window x={196} y={880} s={.92} night tone="#8FA9AE"/>
  <path d="M120 1188h150l-8 62h-134Z" fill="#D9CEB8"/><rect x="140" y="1096" width="112" height="92" rx="6" fill="#E6DCC6"/>
  <path d="M147 1000h98M152 1030h88" stroke={P.sage} strokeWidth="6" opacity=".5"/>
  <Plant x={940} y={1290} s={1.05} sway={bump(f,0,103)*1.6}/>
  <path d="M1035 470v830" stroke="#D8CDB6" strokeWidth="26" opacity=".7"/>
  <Person f={f} {...b}/><Person f={f} {...a}/>
  <ellipse cx={567} cy={1372} rx={120} ry={16} fill={P.wine} opacity={.10}/>
 </>};
}
/* 2 — pagi berikutnya, ia masuk membawa tas */
function hook2(f:number):SceneState{
 const walk=E(f,0,96,0,1);
 const x=150+360*walk;
 const placing=E(f,92,124);
 const turn=E(f,126,164);
 const bagY=1050+placing*60;
 const a:Actor={id:'him',x,y:1300,s:1.45,walk:I(f,0,96)*.85,left:[-52,-70+placing*34],right:[56,-66+placing*20],mood:'neutral',look:2-turn*3,lean:turn*-2};
 const b:Actor={id:'her',x:890,y:1300,s:1.34,woman:true,seated:true,mood:'neutral',look:-3+E(f,120,150,0,-1),left:[26,-96],right:[74,-92]};
 const c=cam(E(f,0,178,1.2,1.34),E(f,0,178,470,600),1150,E(f,0,178,1.2,.4),34);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-200" width="1900" height="1600" fill={P.paper}/>
  <rect x="-400" y="420" width="1900" height="840" fill="#ECE6D6"/>
  <Floor/>
  <Window x={250} y={880} s={.86} tone="#C9DCD8"/>
  <rect x="-40" y="1060" width="220" height="140" rx="8" fill="#DFD5BF"/><path d="M20 1060v-46h120v46" stroke={P.sage} strokeWidth="6" fill="none" opacity=".6"/>
  <Table x={640} y={1150} s={.98}/>
  <Plate x={520} y={1140} s={.62} full={.3}/><Cup x={690} y={1140} s={.7} steam={.5}/>
  <Person f={f} {...a}/>
  <PaperBag x={x-4} y={bagY} s={.62} rot={placing*16}/>
  <Person f={f} {...b}/>
  <g transform={`translate(540 ${960+c.sy}) rotate(${c.a}) scale(${c.z*1.34}) translate(${-c.cx*.72} ${-(c.cy+120)*1.05})`}>
   <rect x="-260" y="1150" width="1560" height="300" fill={P.pale} opacity=".55"/>
   <path d="M-260 1150h1560" stroke="#C3CBB8" strokeWidth="4"/>
  </g>
 </>};
}
/* 3 — high angle: makanan diletakkan, uap, tangan ragu */
function food(f:number):SceneState{
 const place=E(f,8,40),withdraw=E(f,52,84);
 const handL=E(f,74,112),pull=E(f,120,148);
 const c=cam(E(f,0,148,1.52,1.84),606,E(f,0,148,1128,1122),E(f,0,148,0,2.6),22);
 return {cam:c,actors:[],art:<>
  <rect x="-400" y="-300" width="1900" height="2000" fill="#EFE8D9"/>
  <Table x={600} y={1150} s={1.6}/>
  <FoodBox x={600} y={1106} s={1.02} open={E(f,10,34)}/>
  <Steam x={600} y={1078} w={1} p={O(f,34,74)}/>
  <Plate x={386} y={1124} s={.8} full={.55}/><Cup x={818} y={1118} s={.85} steam={O(f,20,60)}/>
  {/* tangan dia */}
  <g opacity={1-withdraw*.5} transform={`translate(${640+62*place} ${792+186*(1-place)+26*withdraw}) rotate(${-6+14*(1-place)})`}>
   <path d="M0-120v96" stroke={P.sage} strokeWidth="24" strokeLinecap="round"/>
   <circle cx="0" cy="-14" r="17" fill={P.rose}/>
  </g>
  {/* tangan kamu, ragu */}
  <g opacity={O(f,70,96)} transform={`translate(${842-52*handL+30*pull} ${1462-58*handL+10*pull}) rotate(${4+6*handL})`}>
   <path d="M0 120v-96" stroke={P.clay} strokeWidth="23" strokeLinecap="round"/>
   <circle cx="0" cy="12" r="17" fill={P.rose}/>
  </g>
 </>};
}
/* 4 — dia mengerjakan tugas yang biasanya kamu; kamu mengawasi dari pintu */
function task(f:number):SceneState{
 const scrub=bump(f,18,84);
 const a:Actor={id:'him',x:766,y:1300,s:1.42,back:true,mood:'neutral',left:[-26,-104+Math.sin(f*.35)*5],right:[26,-104-Math.sin(f*.35)*5]};
 const b:Actor={id:'her',x:452,y:1300,s:1.44,woman:true,mood:'soft',look:4,lean:2,left:[-92,-152],right:[-30,-60]};
 const c=cam(1.32,E(f,0,84,742,552),1128,E(f,0,84,-1.8,0),44);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-200" width="1900" height="1600" fill={P.paper}/>
  <rect x="-400" y="440" width="1900" height="800" fill="#ECE6D6"/>
  <Floor/>
  <rect x="536" y="1060" width="540" height="150" rx="8" fill="#D9CDB4" opacity=".55"/>
  <SinkUnit x={790} y={1200} s={.92} f={f}/>
  <Person f={f} {...a}/>
  <g transform={`translate(${806+scrub*6} ${1136+scrub*4})`}>
   <Plate x={0} y={0} s={.52}/>
   <path d="M-30 -8q14-10 28 0" stroke={P.white} strokeWidth="5" fill="none" opacity=".8"/>
  </g>
  <Doorframe x={470} y={1300} s={.92}/>
  <Person f={f} {...b}/>
 </>};
}
/* 5 — meja, tak ada yang bicara */
function normal(f:number):SceneState{
 const a:Actor={id:'her',x:762,y:1300,s:1.38,woman:true,seated:true,mood:'soft',look:-3,left:[30,-98],right:[78,-92]};
 const b:Actor={id:'him',x:392,y:1300,s:1.38,seated:true,mood:'neutral',look:3,left:[-78,-94],right:[-28,-98]};
 const c=cam(E(f,0,114,1.62,1.3),562,1132,E(f,0,114,0,1.4),34);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-200" width="1900" height="1600" fill={P.paper}/>
  <Floor cy={1268}/>
  <Table x={566} y={1140} s={1}/>
  <FoodBox x={566} y={1094} s={.9} open={.4}/><Plate x={404} y={1112} s={.6} full={.3}/><Cup x={726} y={1108} s={.68} steam={.35}/>
  <Person f={f} {...b}/><Person f={f} {...a}/>
  <Plant x={980} y={1290} s={.9} sway={bump(f,0,114)*1.2}/>
 </>};
}
/* 6 — close: pikirannya "gengsi?" lalu dibuang */
function gengsi(f:number):SceneState{
 const pop=O(f,26,50), shrink=E(f,100,126), gone=I(f,120,134);
 const a:Actor={id:'her',x:700,y:1290,s:1.72,woman:true,mood:f<96?'neutral':'worried',look:2.6,lean:2,left:[-34,-96],right:[40,-84]};
 const c=cam(E(f,0,157,2.10,2.34),676,E(f,0,157,986,996),E(f,0,157,-1.2,-.4),26);
 return {cam:c,actors:[a],art:<>
  <rect x="-400" y="-400" width="1900" height="2200" fill={P.paper}/>
  <path d="M-300 1290h1700" stroke="#DFD6C2" strokeWidth="70"/>
  <Person f={f} {...a}/>
  <g opacity={pop*(1-gone)} transform={`translate(${781-shrink*44} ${804+shrink*66}) scale(${(0.66+0.08*pop)*(1-shrink*.62)})`}>
   <path d="M-96 34q-26-62 26-80q30-50 78-24q60-8 74 32q50 36 8 72Z" fill={P.pale}/>
   <circle cx="92" cy="30" r="9" fill={P.pale}/>
   <text y="20" textAnchor="middle" fontFamily="Playfair" fontStyle="italic" fontSize="62" fill={P.wine}>gengsi?</text>
  </g>
 </>};
}
/* 7 — match cut: matanya → mata anak */
function eyes(f:number):SceneState{
 const cut=f>=44;
 const z=E(f,44,150,1.28,1.62);
 if(!cut){
  const blink=f>30&&f<34;
  const c=cam(E(f,0,44,3.4,3.7),700,E(f,0,44,952,958),0,20);
  const a:Actor={id:'her',x:700,y:1290,s:1.72,woman:true,mood:'worried',look:2.4};
  return {cam:c,actors:[a],art:<>
   <rect x="-500" y="-500" width="2100" height="2400" fill={P.paper}/>
   <Person f={f} {...a}/>
   <g opacity={blink?0:1}>
    <ellipse cx={700+2.4*1.8*1.72} cy={958} rx="15" ry="11" fill={P.ink} opacity=".85"/>
   </g>
  </>};
 }
 const crane=E(f,44,152,0,1);
 const boy:Actor={id:'boy',x:640,y:1310,s:.92,child:true,mood:'neutral',look:1,shirt:mem.sage};
 const mom:Actor={id:'mother',x:392,y:1300,s:1.46,woman:true,back:true,shirt:mem.clay,skin:'#EBC0A8',hair:'#4A3B2C'};
 const dad:Actor={id:'father',x:930,y:1300,s:1.5,back:true,shirt:'#9AA391',skin:'#E3B79F',hair:'#40332A'};
 const c=cam(E(f,44,152,1.86,1.4),E(f,44,152,672,648),E(f,44,152,760,1078),E(f,44,152,-3,.6),E(f,44,152,-60,30));
 return {cam:c,actors:[mom,dad,boy],art:<>
  <rect x="-500" y="-500" width="2100" height="2400" fill={mem.bg}/>
  <rect x="-500" y="420" width="2100" height="900" fill="#EEDFC0"/>
  <Floor tone="memory" cy={1252}/>
  <g opacity={.5}><rect x="120" y="700" width="180" height="200" rx="4" fill="#DCC9A3"/><path d="M130 740h160M130 790h120" stroke={mem.line} strokeWidth="3" opacity=".5"/></g>
  <Person f={f} {...mom}/><Person f={f} {...dad}/><Person f={f} {...boy}/>
  <g opacity={E(f,120,150)}><Say x={470} y={700} w={330} text="…" f={f} at={0} tone={mem.paper} ink={mem.line} fs={40}/></g>
  <rect x="-500" y="-500" width="2100" height="2400" fill="#E8C88E" opacity=".10"/>
 </>};
}
/* 8 — punggung-punggung, anak di antara */
function backs(f:number):SceneState{
 const shift=E(f,0,138,0,1);
 const mom:Actor={id:'mother',x:392,y:1300,s:1.5,woman:true,back:true,shirt:mem.clay,skin:'#EBC0A8',hair:'#4A3B2C',lean:-1};
 const dad:Actor={id:'father',x:902,y:1300,s:1.52,back:true,shirt:'#9AA391',skin:'#E3B79F',hair:'#40332A',lean:1.5};
 const boy:Actor={id:'boy',x:648,y:1318,s:1.14,child:true,mood:'worried',look:f<70?-3:3,shirt:'#B08A6A'};
 const c=cam(E(f,0,138,1.66,1.44),E(f,0,138,648,652),E(f,0,138,880,1070),E(f,0,138,-1.4,1),E(f,0,138,-40,46));
 return {cam:c,actors:[mom,dad,boy],art:<>
  <rect x="-500" y="-500" width="2100" height="2400" fill={mem.bg}/>
  <rect x="-500" y="430" width="2100" height="880" fill="#ECDCBC"/>
  <Floor tone="memory" cy={1252}/>
  <rect x="826" y="620" width="150" height="180" rx="4" fill="#DFCA9F" opacity=".7"/><path d="M836 660h130M836 706h96" stroke={mem.line} strokeWidth="3" opacity=".45"/>
  <path d="M286 1252h180v-90" stroke={mem.line} strokeWidth="4" fill="none" opacity=".5"/>
  <Person f={f} {...mom}/><Person f={f} {...dad}/><Person f={f} {...boy}/>
  <g opacity={E(f,88,118)}>
   <Say x={196} y={742} w={252} text="…" f={f} at={0} tone={mem.paper} ink={mem.line} fs={38}/>
   <Say x={762} y={806} w={252} text="…" f={f} at={0} tone={mem.paper} ink={mem.line} fs={38}/>
  </g>
  <rect x="-500" y="-500" width="2100" height="2400" fill="#E8C88E" opacity=".10"/>
 </>};
}
/* 9 — sarapan besoknya, tanpa kata */
function breakfast(f:number):SceneState{
 const place=E(f,10,54),away=E(f,96,140);
 const mom:Actor={id:'mother',x:430-away*36,y:1300,s:1.46,woman:true,mood:'soft',look:4-away*3,lean:2-away*3,right:[56+place*40,-64-place*54],shirt:mem.clay,skin:'#EBC0A8',hair:'#4A3B2C'};
 const boy:Actor={id:'boy',x:706,y:1300,s:1.0,seated:true,child:true,mood:f<60?'worried':'neutral',look:f<64?-2:-1,nod:E(f,66,84,0,5)-E(f,84,104,0,5),left:[-56,-96],right:[-16,-98],shirt:mem.sage};
 const c=cam(1.30,E(f,0,142,452,656),1150,E(f,0,142,0,1.6),34);
 return {cam:c,actors:[mom,boy],art:<>
  <rect x="-500" y="-500" width="2100" height="2400" fill={mem.bg}/>
  <rect x="-500" y="430" width="2100" height="880" fill="#ECDCBC"/>
  <Floor tone="memory" cy={1256}/>
  <Table x={720} y={1160} s={.94} tone={mem.paper} leg="#C6AC84"/>
  <Plate x={588+place*24} y={1112-place*10} s={.72} full={place}/>
  <Cup x={820} y={1104} s={.66} steam={.4}/>
  <Person f={f} {...mom}/><Person f={f} {...boy}/>
  <g opacity={E(f,116,146)} transform="translate(300 1130)"><Plant x={0} y={0} s={.34} tone={mem.sage} pot="#B98A6A"/></g>
  <rect x="-500" y="-500" width="2100" height="2400" fill="#E8C88E" opacity=".10"/>
 </>};
}
/* 10 — match cut: gestur yang sama, sekarang */
function learned(f:number):SceneState{
 const place=E(f,8,44),back=E(f,88,128),space=E(f,150,200);
 const a:Actor={id:'him',x:700+space*18,y:1300,s:1.46,mood:'neutral',look:2,lean:back*1.5,right:[56+place*42-back*10,-64-place*58],left:[-30,-70]};
 const b:Actor={id:'her',x:392-space*14,y:1300,s:1.44,woman:true,seated:true,mood:f<132?'neutral':'soft',look:3,left:[30,-96],right:[76,-92]};
 const c=cam(E(f,0,200,1.72,1.30),E(f,0,200,652,566),E(f,0,200,1112,1144),E(f,0,200,-1.2,.6),E(f,0,200,-16,40));
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1262}/>
  <Table x={566} y={1150} s={1.02}/>
  <Plate x={486} y={1104-place*6} s={.72} full={.45+place*.5}/>
  <Person f={f} {...a}/><Person f={f} {...b}/>
  <Cup x={716} y={1112} s={.66} steam={.3}/>
  <Plant x={1000} y={1290} s={.82} sway={bump(f,0,200)*1.1}/>
 </>};
}
/* 11 — dua orang duduk, parallax tanaman */
function learn(f:number):SceneState{
 const a:Actor={id:'her',x:404,y:1300,s:1.42,woman:true,seated:true,mood:'neutral',look:E(f,40,120,2,-1),left:[28,-96],right:[74,-90]};
 const b:Actor={id:'him',x:706,y:1300,s:1.44,seated:true,mood:'soft',look:E(f,30,110,3,1),left:[-76,-92],right:[-28,-96],nod:E(f,140,158,0,4)-E(f,158,176,0,4)};
 const c=cam(1.5,566,1130,E(f,0,194,-1,1.6),36);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1268}/>
  <Table x={564} y={1146} s={1.04}/>
  <FoodBox x={616} y={1096} s={.86} open={.5}/><Plate x={430} y={1112} s={.6} full={.35}/>
  <Person f={f} {...a}/><Person f={f} {...b}/>
  <g transform={`translate(540 ${960+c.sy}) rotate(${c.a}) scale(${c.z*1.42}) translate(${-c.cx*.7} ${-(c.cy+150)*1.06})`}>
   <Plant x={180} y={1290} s={1.1} sway={bump(f,0,194)*1.4} tone="#7E8F76"/>
   <path d="M-200 1290h1600" stroke="#DCD3BE" strokeWidth="6" opacity=".7"/>
  </g>
 </>};
}
/* 12 — tawaran, belum diterima */
function wrong(f:number):SceneState{
 const push=E(f,8,34);
 const a:Actor={id:'him',x:700,y:1300,s:1.46,seated:true,mood:'worried',look:-2,right:[-40-push*26,-96],left:[-80,-92]};
 const b:Actor={id:'her',x:398,y:1300,s:1.44,woman:true,seated:true,mood:'neutral',look:-3,left:[26,-98],right:[70,-94]};
 const c=cam(1.68,552,E(f,0,61,1118,1156),E(f,0,61,-.4,2.4),E(f,0,61,26,52));
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1266}/>
  <Table x={552} y={1150} s={1.06}/>
  <FoodBox x={562+push*20} y={1102} s={.9} open={.6}/>
  <Plate x={392} y={1116} s={.58} full={.2}/>
  <Person f={f} {...b}/><Person f={f} {...a}/>
 </>};
}
/* 13 — kamu bicara, dia mendengar */
function right(f:number):SceneState{
 const a:Actor={id:'her',x:420,y:1300,s:1.44,woman:true,seated:true,mood:'firm',look:-3,left:[22,-100],right:[64,-108],lean:1};
 const b:Actor={id:'him',x:724,y:1300,s:1.46,seated:true,mood:'worried',look:-2,nod:E(f,112,132,0,5)-E(f,132,156,0,5),left:[-86,-70],right:[-36,-72]};
 const c=cam(E(f,0,164,1.66,1.86),E(f,0,164,700,684),E(f,0,164,1128,1084),E(f,0,164,1.2,-.6),E(f,0,164,34,26));
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1266}/>
  <Table x={572} y={1150} s={1.02}/>
  <FoodBox x={596} y={1102} s={.84} open={.5}/>
  <Person f={f} {...a}/><Person f={f} {...b}/>
  <Say x={252} y={636} w={438} text="Aku butuh dengar maaf." f={f} at={26} out={132} fs={36}/>
 </>};
}
/* 14 — duduk berhadapan, orbit pelan */
function understand(f:number):SceneState{
 const a:Actor={id:'her',x:398,y:1300,s:1.42,woman:true,seated:true,mood:'soft',look:-2,left:[26,-98],right:[72,-94]};
 const b:Actor={id:'him',x:714,y:1300,s:1.44,seated:true,mood:'soft',look:-2,left:[-74,-94],right:[-26,-98]};
 const c=cam(E(f,0,199,1.52,1.58),E(f,0,199,556,570),E(f,0,199,1132,1128),E(f,0,199,-3,2.6),36);
 return {cam:c,actors:[a,b],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1268}/>
  <Table x={558} y={1148} s={1.04}/>
  <FoodBox x={600} y={1100} s={.86} open={.6}/><Plate x={452} y={1114} s={.58} full={.4}/>
  <Cup x={690} y={1108} s={.62} steam={.45}/>
  <Person f={f} {...a}/><Person f={f} {...b}/>
  <g transform={`translate(540 ${960+c.sy}) rotate(${c.a}) scale(${c.z*1.4}) translate(${-c.cx*.68} ${-(c.cy+150)*1.05})`}>
   <Plant x={230} y={1290} s={1.05} sway={bump(f,0,199)*1.2}/>
  </g>
 </>};
}
/* 15 — kamu sendiri, piring masih penuh, cahaya bergeser */
function taught(f:number):SceneState{
 const a:Actor={id:'her',x:700,y:1300,s:1.44,woman:true,seated:true,mood:'soft',look:-2,left:[30,-98],right:[72,-94]};
 const c=cam(E(f,0,118,1.36,1.52),700,1142,0,34);
 return {cam:c,actors:[a],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1268}/>
  <LightBand p={.9} x={E(f,0,118,470,650)}/>
  <Table x={700} y={1148} s={1.06}/>
  <Plate x={572} y={1116} s={.64} full={.55}/>
  <Person f={f} {...a}/>
  <rect x="742" y="1064" width="180" height="14" rx="7" fill="#D8CDB6"/>
  <g opacity={.55}><path d="M754 1064v-70h150v70" fill="none" stroke="#CFC3A9" strokeWidth="7"/></g>
 </>};
}
/* 16 — tangan menarik lalu mengembalikan; dia berdiri */
function accept(f:number):SceneState{
 const drawin=E(f,6,40),stop=E(f,44,66),back=E(f,74,108);
 const pos=drawin*(1-back);
 const stand=E(f,116,144);
 const a:Actor={id:'her',x:640-stand*40,y:1300-stand*6,s:1.44+stand*.02,woman:true,seated:! (stand>.5),mood:'firm',look:-2,right:[64-pos*40,-92-pos*14-back*6],left:[26-stand*30,-98+stand*40],lean:stand*2};
 const c=cam(E(f,0,140,1.72,1.56),E(f,0,140,624,566),1136,E(f,0,140,-.6,.8),34);
 return {cam:c,actors:[a],art:<>
  <rect x="-400" y="-400" width="1900" height="2000" fill={P.paper}/>
  <Floor cy={1268}/>
  <Table x={566} y={1148} s={1.06}/>
  <Plate x={480+pos*54} y={1116+pos*4} s={.66} full={.5}/>
  <Person f={f} {...a}/>
  <g opacity={1-stand*.4}><rect x="700" y="1064" width="170" height="14" rx="7" fill="#D8CDB6"/></g>
 </>};
}

const BUILDERS:Record<string,(f:number)=>SceneState>={hook1,hook2,food,task,normal,gengsi,eyes,backs,breakfast,learned,learn,wrong,right,understand,taught,accept};
export function stateAt(id:string,f:number):SceneState{return (BUILDERS[id]??hook1)(f);}

const TITLES:Record<string,string[]>={hook1:['Pernah nggak,','kamu bertengkar'],hook2:['Besoknya,','tidak ada maaf.'],food:['Tiba-tiba:','makanan favoritmu.'],task:['Atau tugas','yang biasanya kamu.'],normal:[],gengsi:['Mungkin kamu pikir:','dia gengsi.'],eyes:['Tapi pernah','kamu pikirkan?'],backs:['Sejak kecil,','tidak ada maaf.'],breakfast:['Marah hari ini.','Sarapan besok.'],learned:['Perhatian,','bukan kata.'],learn:[],wrong:['Bukan berarti','caranya benar.'],right:['Kamu tetap berhak','mendengar maaf.'],understand:['Melihat dengan','cara berbeda.'],taught:[],accept:['Memahami,','bukan menerima.']};
const TITLE_IN:Record<string,number>={hook1:4,hook2:12,food:14,task:6,gengsi:16,eyes:10,backs:8,breakfast:10,learned:14,wrong:4,right:12,understand:10,accept:8};
const MEMORY=new Set(['eyes','backs','breakfast']);

const Shot=({def}:{def:ShotDef})=>{
 const f=useCurrentFrame();
 const s=stateAt(def.id,f);
 const frames=Math.round((def.end-def.start)*30);
 const memory=MEMORY.has(def.id);
 const outT=Math.max(frames-18,0);
 const lines=TITLES[def.id]??[];
 const inAt=TITLE_IN[def.id]??8;
 const dark=false;
 return <AbsoluteFill style={{background:memory?mem.bg:P.paper,overflow:'hidden'}}>
  <svg width="1080" height="1920" style={{position:'absolute'}}>
   <Camera c={s.cam}>{s.art}</Camera>
   {memory&&<rect x="-100" y="-100" width="1300" height="2100" fill="#E8C88E" opacity=".07"/>}
   {lines.length>0&&<TitleLines lines={lines} f={f} inAt={inAt} outAt={outT} dark={dark}/>}
  </svg>
 </AbsoluteFill>;
};

const Caption=()=>{
 const f=useCurrentFrame();const t=f/30;
 const c=(timing as any).indonesianCaptions.find((x:any)=>t>=x.start&&t<x.end+.03);
 if(!c)return null;
 const p=O(f,Math.max(0,Math.round((c.start)*30)),Math.round(c.start*30)+8);
 return <div style={{position:'absolute',left:'50%',transform:`translateX(-50%) translateY(${(1-p)*10}px)`,top:1470,width:840,textAlign:'center',fontFamily:'Lato',fontWeight:700,fontSize:44,lineHeight:1.34,color:P.ink,opacity:p}}>
  <span style={{display:'inline-block',maxWidth:840,textWrap:'balance'}}>{c.text}</span>
 </div>;
};

const BrandOutro=()=>{
 const f=useCurrentFrame();
 const wipe=O(f,5,44);
 const tag=O(f,36,60), rules=O(f,28,60), handles=O(f,48,70), handle=O(f,56,78);
 return <AbsoluteFill style={{background:P.paper,overflow:'hidden'}}>
  <svg width="1080" height="1920" style={{position:'absolute'}}>
   <path d={`M130 ${1084}h${820*rules}`} stroke={P.wine} strokeWidth="2" opacity=".8"/>
   <circle cx={950} cy={1084} r={4*rules} fill={P.wine} opacity=".9"/>
  </svg>
  <div style={{position:'absolute',left:130,top:744,width:820,height:278,overflow:'hidden'}}>
   <Img src={staticFile('less-certain-logo.png')} style={{width:820,height:278,objectFit:'contain',transform:`translateY(${16*(1-wipe)}px)`,clipPath:`inset(0 ${(1-wipe)*100}% 0 0)`}}/>
  </div>
  <div style={{position:'absolute',top:1122,width:1080,textAlign:'center',fontFamily:'Playfair',fontStyle:'italic',fontSize:37,color:P.ink,opacity:tag,transform:`translateY(${12*(1-tag)}px)`}}>Look beyond what appears.</div>
  <div style={{position:'absolute',top:1214,width:1080,textAlign:'center',fontFamily:'Lato',fontSize:24,letterSpacing:4.5,color:P.muted,opacity:handles}}>TIKTOK · INSTAGRAM</div>
  <div style={{position:'absolute',top:1262,width:1080,textAlign:'center',fontFamily:'Lato',fontSize:37,color:P.ink,opacity:handle,transform:`translateY(${10*(1-handle)}px)`}}>@less.certain</div>
 </AbsoluteFill>;
};

const OUTRO=3.4;
const currentShot=(f:number)=>SHOTS.find(s=>f>=Math.round(s.start*30)&&f<Math.round(s.end*30))?.id??'hook1';
export const StoryFilmV6=()=>{
 const f=useCurrentFrame();
 const storyFrames=Math.round((timing as any).duration*30);
 const outroFrames=Math.round(OUTRO*30);
 return <AbsoluteFill style={{background:P.paper,fontFamily:'Lato'}}>
  {SHOTS.map(s=><Sequence key={s.id} from={Math.round(s.start*30)} durationInFrames={Math.round(s.end*30)-Math.round(s.start*30)} premountFor={8}><Shot def={s}/></Sequence>)}
  <div style={{position:'absolute',left:0,right:0,top:1412,height:508,background:MEMORY.has(currentShot(f))?mem.bg:P.paper}}/>
  <Caption/>
  {f<storyFrames&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:85,top:128,width:236,height:79,objectFit:'contain'}}/>}
  <Sequence from={storyFrames} durationInFrames={outroFrames}><BrandOutro/></Sequence>
  <Sequence from={storyFrames} durationInFrames={outroFrames}><Audio src={staticFile('brand-sting.wav')} volume={.6}/></Sequence>
  <Sequence from={Math.round((timing as any).audioLead*30)}><Audio src={staticFile('narration-v6.mp3')}/></Sequence>
  <Audio src={staticFile('ambience.wav')} loop volume={frame=>.16*E(frame,storyFrames-90,storyFrames,1,0)}/>
 </AbsoluteFill>;
};
