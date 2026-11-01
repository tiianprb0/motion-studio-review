import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame} from 'remotion';
import timing from '../timing-v7.json';
import {P,Person,ramp,quick,unit,Actor} from './Character';
const START=[0,4.6,8.54,13.24,15.38,17.88,21.1,26.8,28.82,32.02,36.04,41.48,45.12,49.56,52.1,55.5,62.92,69.04];
export const TOTAL_FRAMES=2233;
export const SHOTS=START.map((s,i)=>({id:i+1,start:Math.round(s*30),end:i<17?Math.round(START[i+1]*30):TOTAL_FRAMES}));
const Text:React.FC<React.SVGProps<SVGTextElement>>=p=><text fontFamily="Lato" fill={P.ink} {...p}/>;
const Serif:React.FC<React.SVGProps<SVGTextElement>>=p=><text fontFamily="Playfair" fill={P.ink} {...p}/>;
const Cam=({z=1,x=540,y=1000,a=0,children}:{z?:number;x?:number;y?:number;a?:number;children:React.ReactNode})=><g transform={`translate(540 1000) rotate(${a}) scale(${z}) translate(${-x} ${-y})`}>{children}</g>;
const Focus=({blur=0,alpha=1,children}:{blur?:number;alpha?:number;children:React.ReactNode})=><g opacity={alpha} style={blur>.1?{filter:`blur(${blur}px)`}:undefined}>{children}</g>;
function Room({memory=false,night=false,shift=0}:{memory?:boolean;night?:boolean;shift?:number}){return <g transform={`translate(${shift} 0)`}>
 <rect x="-700" y="-600" width="2600" height="2600" fill={memory?P.memory:night?'#E1E1D4':P.paper}/>
 <path d="M-400 1380H1500V1950H-400Z" fill={memory?'#CBB48E':'#DAD5C5'}/><path d="M-400 1380H1500" stroke="#C3B69D" strokeWidth="3"/>
 <path d="M160 1040V565a150 150 0 0 1 300 0v475Z" fill={night?'#50675D':memory?'#CBCCAB':'#CDD9CA'}/>
 <path d="M310 430v610M165 730h290" stroke={memory?'#EAD8B9':P.paper} strokeWidth="12"/>
 {night?<path d="M386 517q-48 30 0 61q-69 10-63-37q9-41 63-24" fill="#E3DFC2"/>:<circle cx="382" cy="545" r="48" fill="#F1D599"/>}
 {!night&&<path d="M160 1040h300l480 340H340Z" fill="#F9E8C3" opacity=".35"/>}
 <rect x="800" y="520" width="150" height="230" fill="none" stroke={memory?'#B8A180':'#C4BEAB'} strokeWidth="8"/><path d="M820 705q40-110 110-30" stroke={P.sage} strokeWidth="5" fill="none"/>
 <path d="M900 1380v-200h175v200M906 1280h162" stroke={P.wood} strokeWidth="10" fill="none"/>
 <path d="M930 1180v-120m0 55q-80-48-45-87q58 13 45 87m4-15q78-52 70-98q-65 9-70 98" fill={P.sage}/><path d="M908 1180h48l-9 50h-30Z" fill={P.wine}/>
 </g>}
const Table=({y=1260,w=650}:{y?:number;w?:number})=><g data-prop="table"><path d={`M${540-w/2+35} ${y+32}l-22 280M${540+w/2-35} ${y+32}l22 280`} stroke="#A87B54" strokeWidth="22"/><path d={`M${540-w/2} ${y-15}L${540+w/2-28} ${y-40}l48 58-${w} 28Z`} fill="#D4B48F"/><path d={`M${540-w/2} ${y-15}v30l${w} 31v-30Z`} fill={P.wood}/></g>;
const Box=({x=610,y=1216,s=1,lid=0,top=false}:{x?:number;y?:number;s?:number;lid?:number;top?:boolean})=><g data-prop="box" transform={`translate(${x} ${y}) scale(${s})`}>
 <ellipse cy="27" rx="132" ry="20" fill={P.ink} opacity=".16"/>
 {top?<><rect x="-138" y="-100" width="276" height="200" rx="10" fill="#CCA370" stroke="#AC7C48" strokeWidth="5"/><rect x="-123" y="-87" width="246" height="174" rx="8" fill="#E9BD65"/>{[-60,0,60].map(x=><path key={x} d={`M${x}-80V80`} stroke="#A3743D" strokeWidth="4"/>)}<path d="M-118 0h236" stroke="#A3743D" strokeWidth="4"/>{Array.from({length:27},(_,i)=><circle key={i} cx={-103+(i*37)%209} cy={-68+(i*29)%137} r="3" fill="#79492A"/>)}</>:<><path d="M-132-36h264l-10 68h-244Z" fill="#CAA16E"/><ellipse cy="-30" rx="116" ry="27" fill="#EBC66F"/><path d="M-82-32h165M-33-50v36M34-50v36" stroke="#AD7D45" strokeWidth="4"/><g transform={`translate(0 -40) rotate(${-lid*58})`}><path d="M-134 0h268l-23-36h-222Z" fill="#DDB98C" stroke="#AE824E" strokeWidth="3"/></g></>}
</g>;
const Hand=({x,y,from='right',skin=P.skin}:{x:number;y:number;from?:'right'|'top'|'left';skin?:string})=><g data-prop="hand">{from==='top'?<><path d={`M${x-39} -600V${y-42}q39 20 78 0V-600Z`} fill="#6B775F"/><path d={`M${x-39} ${y-48}q39 18 78 0v55q-39 32-78 0Z`} fill={skin}/></>:<><path d={`M${from==='right'?1280:-180} ${y+65}Q${x+170*(from==='right'?1:-1)} ${y+45} ${x} ${y}`} stroke={skin} strokeWidth="53" fill="none" strokeLinecap="round"/><ellipse cx={x} cy={y} rx="34" ry="24" fill={skin}/></>}</g>;
const Cup=({x=435,y=1225}:{x?:number;y?:number})=><g transform={`translate(${x} ${y})`}><path d="M-28-53h56l-8 60h-40Z" fill={P.cream}/><path d="M28-40q36 1 25 25q-6 13-28 7" fill="none" stroke={P.cream} strokeWidth="7"/><ellipse cy="-53" rx="28" ry="9" fill="#B1997B"/></g>;
const actor=(props:Actor)=> <Person {...props}/>;
export function Scene({id,f,n}:{id:number;f:number;n:number}){
 const u=f/Math.max(1,n-1),m=(a:number,b:number,x=0,y=1)=>ramp(u,a,b,x,y);
 const common={f};
 if(id===1)return <Cam z={m(0,1,1.03,1.18)} x={m(0,1,500,470)} y={960}>
  <Room shift={m(0,1,0,20)}/><Focus blur={4} alpha={.7}><Person {...common} x={825} y={1430} s={2.0} who="him" dir={-1} view="three" gaze={-2} mood="unsure" left={[-35,-150]} role="background"/></Focus>
  <Person {...common} x={360} y={1615} s={3.10} who="her" view="three" dir={1} mood="annoyed" gaze={m(.3,.8,0,3)} head={m(.1,.7,-3,2)} right={[45,-143]} left={[-40,-165]} framing="medium"/>
  <path d="M-100 180h125v1480h-125" fill={P.wine} opacity=".24"/>
 </Cam>;
 if(id===2)return <Cam z={m(0,1,1.20,.97)} x={m(0,1,640,590)}>
  <Room night/><Focus blur={m(.05,.45,0,4)}><Person {...common} x={90} y={1840} s={4.4} who="her" view="back" dir={1} role="foreground" framing="close"/></Focus>
  <Focus blur={m(.05,.45,4,0)}><Person {...common} x={735} y={1570} s={2.65} who="him" dir={-1} mood="unsure" gaze={m(.1,.6,-3,3)} head={m(.25,.8,0,5)} left={[-30,-180+m(.2,.8,0,30)]} framing="medium"/></Focus>
  <path d="M1030-300h110v2100h-110Z" fill="#846F58"/>
 </Cam>;
 if(id===3){const z=m(0,.55,1.02,1.15);return <>
  <Focus blur={6}><Room/></Focus><g transform={`translate(${m(0,1,550,520)} ${m(0,1,985,1020)}) rotate(${m(0,.5,11,-4)}) scale(${z})`}>
   <path d="M-400 570q20-220 160-315l67-166q31-36 54 7l-25 209q-68 147-77 280Z" fill={P.girl}/>
   <rect data-prop="phone" x="-180" y="-330" width="360" height="650" rx="46" fill={P.ink}/><rect x="-162" y="-309" width="324" height="608" rx="33" fill={P.cream}/><rect x="-45" y="-294" width="90" height="11" rx="6" fill={P.ink}/>
   <Text x="0" y="-235" textAnchor="middle" fontSize="29">Dia</Text><path d="M-133-197h266" stroke={P.line} strokeWidth="2"/>
   <g opacity={quick(f,12,25)} transform={`translate(0 ${ramp(f,12,25,24,0)})`}><rect x="-138" y="-145" width="271" height="117" rx="24" fill={P.pale}/><Text x="-113" y="-94" fontSize="29">Sudah makan?</Text><Text x="108" y="-48" fontSize="17" textAnchor="end" fill={P.sage}>08.12</Text></g>
   <path d={`M-180 193q-4-64 28-100q24-19 35 3q7 25-15 ${m(.45,.8,46,62)}l-17 49`} fill={P.girl}/>
   <g opacity={m(.58,.75)}><circle cx="-65" cy="25" r="5" fill={P.sage}/><circle cx="-43" cy="25" r="5" fill={P.sage}/><circle cx="-21" cy="25" r="5" fill={P.sage}/></g>
  </g>
 </>}
 if(id===4)return <Cam z={m(0,1,1.05,1.20)} x={590} y={1050}>
  <Room/><Focus blur={5} alpha={.6}><Person {...common} x={290} y={1430} s={2.2} who="her" mood="hurt" role="background"/></Focus>
  <Table y={1290} w={930}/><Box x={m(0,.65,810,590)} y={m(0,.65,1140,1243)} s={1.35} lid={0}/><Hand x={m(0,.65,810,590)} y={m(0,.65,1190,1293)} from="right"/>
 </Cam>;
 if(id===5){const fold=m(.18,.85);return <Cam z={m(0,1,1.04,1.15)} x={m(0,1,560,510)} a={-3}>
  <Room/><Focus blur={3}><Person {...common} x={290} y={1430} s={2.25} who="her" gaze={4} mood="thinking" role="background"/></Focus>
  <path d="M100 870L930 780l120 620-890 65Z" fill="#C6A17B"/><path d="M110 901L931 811" stroke="#E3C8A4" strokeWidth="5"/>
  <g transform={`translate(590 1100) rotate(-8)`}><path d="M-180-95h360v190h-360Z" fill={P.pale} stroke={P.sage} strokeWidth="4"/><path d={`M${180-180*fold}-95H180V95h-${180*fold}Z`} fill={P.sage} opacity=".45"/><path d={`M${180-180*fold}-95V95`} stroke={P.sage} strokeWidth="4"/></g>
  <Hand x={m(.05,.85,810,600)} y={1000} from="right"/><Hand x={430} y={1200} from="left"/>
 </Cam>}
 if(id===6&&u>.85)return <><Focus blur={4}><Room/></Focus><Person {...common} x={562} y={1538} s={2.05} who="him" view="three" dir={1} gaze={3} mood="unsure" left={[-25,-165]} right={[25,-160]} framing="medium"/></>;
 if(id===6)return <Cam z={m(0,.8,1,1.10)} x={m(0,.85,470,510)} y={1020}>
  <Focus blur={4} alpha={.7}><Room/></Focus><Person {...common} x={490} y={2080} s={4.55} who="her" view="three" dir={1} gaze={m(.2,.65,0,4)} mood="thinking" head={m(.1,.6,-5,0)} left={[-38,-145]} right={[37,-244]} framing="close"/>
  <g opacity={m(.84,.96)}><Person {...common} x={850} y={1430} s={1.8} who="him" dir={-1} mood="unsure" role="background"/></g>
 </Cam>;
 if(id===7){const shift=m(0,1,0,190);return <>
  <Cam x={m(0,1,390,540)} z={m(0,.7,1.13,.97)}><Room memory shift={shift*.35}/><Person {...common} x={410-shift*.20} y={1440} s={1.7} who="boy" dir={1} mood="hurt" gaze={3} left={[-25,-165]} right={[25,-160]} head={m(.2,.8,0,-3)}/><Focus blur={m(.1,.8,5,1)} alpha={.9}><Person {...common} x={880-shift*.35} y={1440} s={2.5} who="dad" dir={-1} view={u<.55?'side':'three'} mood="annoyed" gaze={-3} left={[-50,-190]} role="background"/></Focus></Cam>
  <g transform={`translate(${-shift*1.4} 0)`}><rect x="-160" y="170" width="210" height="1400" fill="#9D896A"/><rect x="-150" y="170" width="1280" height="46" fill="#9D896A"/></g>
 </>}
 if(id===8&&f>n-18)return <><rect x="0" y="160" width="1080" height="1380" fill="#546255"/><path d="M0 1100H1080V1540H0Z" fill="#9E7F5B"/><Hand x={540} y={ramp(f,n-18,n-1,660,760)} from="top"/></>;
 if(id===8)return <Cam z={m(0,1,1,1.13)} x={m(0,1,700,730)} y={1030}>
  <Room memory night/><Person {...common} x={735} y={1740} s={3.3} who="dad" view="three" dir={-1} mood="annoyed" left={[-58-m(.25,.9,0,18),-215+m(.25,.9,0,63)]} right={[42,-147]} lean={-3} talk={.15+Math.abs(Math.sin(f*.25))*.25} framing="medium"/>
  <Focus blur={2}><Person {...common} x={45} y={1670} s={1.7} who="boy" view="back" role="foreground" framing="medium"/></Focus><Table y={1410} w={880}/>
 </Cam>;
 if(id===9){const place=m(0,.6),lift=m(.66,.98);return <>
  <rect x="-100" y="130" width="1280" height="1500" fill="#BC956C"/><path d="M40 190v1300M1020 190v1300M80 490h920M80 1230h920" stroke="#CBA67D" strokeWidth="4" opacity=".7"/>
  <g transform={`translate(540 ${m(0,.6,940,1060)}) rotate(${m(0,.6,-6,0)})`}><Box x={0} y={0} s={1.75} top/><Hand x={0} y={-180} from="top"/>
   <g transform={`translate(0 -175) rotate(${-lift*24})`}><rect x="-245" y="-330" width="490" height="315" rx="15" fill="#DEC099" stroke="#AE8252" strokeWidth="5"/><path d="M-180-265h360" stroke="#CBA472" strokeWidth="4"/></g>
  </g>
 </>}
 if(id===10||id===11){const now=id===11,progress=now?m(0,.38,1,1.4):m(.1,.82),bx=630-progress*75;
  return <Cam x={540} y={1010} z={now?m(0,1,1.31,1.04):m(0,1,1.04,1.31)}>
   <Focus blur={now?m(.35,.8,0,3):1}><Room memory={!now}/></Focus>
   <Focus blur={now?m(.25,.8,3,0):0}><Person {...common} x={285} y={1460} s={now?2.3:1.52} who={now?'her':'boy'} view="three" dir={1} mood={now?'thinking':'hurt'} gaze={4} right={now?[62,-147]:[70,-151]} left={[-36,-145]}/></Focus>
   <Person {...common} x={805} y={1460} s={2.3} who={now?'him':'dad'} view="three" dir={-1} mood="soft" gaze={-4} left={[(bx-805)/2.3,(1258-1460)/2.3]} right={[38,-143]} head={ramp(f,30,75,0,-2)}/>
   <Table y={1280} w={710}/><Focus blur={now?m(.35,.9,0,5):0}><Box x={bx} y={1237} s={1.05} lid={.8}/></Focus><Cup x={390} y={1240}/>
  </Cam>
 }
 if(id===12)return <Cam z={m(0,1,1.02,1.10)} x={500} y={1010}>
  <Focus blur={5} alpha={.8}><Room/></Focus><Person {...common} x={500} y={2070} s={4.5} who="her" dir={1} mood={u<.5?'thinking':'soft'} gaze={3} head={m(.1,.8,-2,3)} left={[-40,-147]} right={[42,-180]} framing="close"/>
 </Cam>;
 if(id===13)return <Cam x={m(0,.75,650,550)} z={m(0,1,1.03,1.13)}>
  <Room shift={m(0,.75,0,35)}/><Person {...common} x={300} y={1450} s={2.35} who="her" gaze={4} mood="soft" right={[42,-157]}/>
  <Person {...common} x={m(0,.68,1030,790)} y={1450} s={2.35} who="him" dir={-1} mood="unsure" gaze={-4} left={[-70,-75.7]} step={Math.sin(f*.18)*(1-m(.05,.68))*.8}/>
  <Table y={1280}/><Box x={m(0,.68,865,625)} y={1240} s={1.05} lid={.1}/>
 </Cam>;
 if(id===14)return <Cam z={m(0,.5,1.12,1.25)} x={m(0,.5,550,455)} y={1030}>
  <Room/><Person {...common} x={320} y={1530} s={2.65} who="her" view="three" dir={1} mood="soft" gaze={4} right={[42+m(0,.65,0,32),-154-m(0,.65,0,50)]} left={[-25,-205]} framing="medium"/>
  <Focus blur={m(.25,.7,0,4)}><Person {...common} x={730} y={1480} s={2.35} who="him" dir={-1} mood="unsure" left={[-65,-110]} role="background"/></Focus><Table y={1375}/><Box x={650} y={1335} lid={.3}/>
 </Cam>;
 if(id===15)return <Cam z={m(0,1,1.03,1.15)} x={m(0,1,505,480)}>
  <Focus blur={5} alpha={.7}><Room/></Focus><Person {...common} x={425} y={1790} s={3.6} who="her" view="three" dir={1} mood="warm" gaze={4} head={m(.15,.75,0,3)} left={[-23,-210]} right={[53+m(.1,.7,0,17),-174]} talk={u<.9?.18+Math.abs(Math.sin(f*.23))*.23:0} framing="medium"/>
  <Focus blur={5}><Person {...common} x={1110} y={1910} s={4.8} who="him" view="back" role="foreground" framing="close"/></Focus>
 </Cam>;
 if(id===16){const breath=Math.sin(Math.min(1,u/.6)*Math.PI);return <Cam z={m(0,1,1.10,1.01)} x={650} y={1020}>
  <Focus blur={5} alpha={.7}><Room/></Focus><Focus blur={5}><Person {...common} x={-40} y={1910} s={4.5} who="her" view="back" role="foreground" framing="close"/></Focus>
  <Person {...common} x={690} y={1940-breath*6} s={4.0} who="him" view="three" dir={-1} mood={u<.6?'unsure':'soft'} gaze={-4} head={m(.12,.4,3,-2)+Math.sin(unit((u-.6)/.3)*Math.PI)*2} left={[-18,-214]} right={[38,-148]} framing="close"/>
  {u>.48&&<Serif x="785" y="470" textAnchor="middle" fontSize="70" fontStyle="italic" opacity={m(.48,.7,0,.65)} fill={P.wine}>maaf…</Serif>}
 </Cam>}
 if(id===17)return <Cam z={m(0,1,1.28,.95)} x={m(0,1,590,540)} y={1030}>
  <Room/><Person {...common} x={330+m(.15,.8,0,23)} y={1450} s={2.35} who="her" view="three" dir={1} mood="warm" gaze={4} head={2} right={[51,-166]}/><Person {...common} x={760-m(.15,.8,0,23)} y={1450} s={2.35} who="him" view="three" dir={-1} mood="soft" gaze={-4} head={-2} left={[-45,-168]}/>
 </Cam>;
 return null;
}
function Outro({f}:{f:number}){const q=quick(f,0,30),social=quick(f,30,52);return <><rect width="1080" height="1920" fill={P.ink}/><g opacity={q} transform={`translate(540 ${935+24*(1-q)})`}><Serif textAnchor="middle" fontSize="110" fill={P.cream} letterSpacing="-5">less.certain</Serif><path d={`M-265 42h${530*quick(f,22,36)}`} stroke={P.gold} strokeWidth="6" strokeLinecap="round"/></g><g opacity={social} transform={`translate(0 ${16*(1-social)})`}><Text x="540" y="1295" textAnchor="middle" fontSize="31" fill={P.cream}>TikTok  @less.certain</Text><Text x="540" y="1355" textAnchor="middle" fontSize="31" fill={P.cream}>Instagram  @less.certain</Text></g></>}
export const getShot=(frame:number)=>SHOTS.find(s=>frame>=s.start&&frame<s.end)??SHOTS[17];
export function World({frame}:{frame:number}){
 const shot=getShot(frame),f=frame-shot.start,n=shot.end-shot.start;
 const boundary=SHOTS[3].start;
 if(frame>=boundary-8&&frame<boundary+8){const p=ramp(frame,boundary-8,boundary+8);return <g style={p>.15&&p<.85?{filter:'url(#whip-v8)'}:undefined}><g transform={`translate(${-1080*p} ${-160*p})`}><Scene id={3} f={frame-SHOTS[2].start} n={SHOTS[2].end-SHOTS[2].start}/></g><g transform={`translate(${1080*(1-p)} ${160*(1-p)})`}><Scene id={4} f={Math.max(0,frame-boundary)} n={SHOTS[3].end-SHOTS[3].start}/></g></g>}
 if(shot.id===18)return <Outro f={f}/>;
 const next=SHOTS[shot.id],left=shot.end-frame;
 const scene=<Scene id={shot.id} f={f} n={n}/>;
 const door=shot.id===2&&left<=14,whip=false,lid=shot.id===9&&left<=12;
 const afterDoor=shot.id===3&&f<10,afterWhip=false,afterLid=shot.id===10&&f<10;
 return <>
  {whip?<g transform={`translate(${-ramp(left,0,7,1080,0)} ${-ramp(left,0,7,180,0)})`}>{scene}</g>:afterWhip?<g transform={`translate(${quick(f,0,8,1040,0)} ${quick(f,0,8,160,0)})`}>{scene}</g>:scene}
  {door&&<g transform={`translate(${ramp(left,0,14,0,1080)} 0)`}><rect x="-30" y="155" width="1180" height="1415" fill="#8B765D"/><path d="M10 155v1415" stroke="#C0A583" strokeWidth="28"/></g>}
  {afterDoor&&<g transform={`translate(${quick(f,0,10,0,-1160)} 0)`}><rect x="-30" y="155" width="1180" height="1415" fill="#8B765D"/><path d="M1110 155v1415" stroke="#C0A583" strokeWidth="28"/></g>}
  {lid&&<g transform={`translate(540 713) scale(${ramp(left,0,12,5.6,0)}) rotate(-4)`}><rect x="-245" y="-157" width="490" height="315" rx="10" fill="#DCBA8E"/><path d="M-120-110h240" stroke="#BB966A" strokeWidth="4"/></g>}
  {afterLid&&<g transform={`translate(${quick(f,0,10,540,-1850)} 713) scale(5.6) rotate(-4)`}><rect x="-245" y="-157" width="490" height="315" rx="10" fill="#DCBA8E"/></g>}
  {shot.id===17&&left<14&&<rect x="0" y="0" width="1080" height="1920" fill={P.ink} opacity={ramp(left,0,14,1,0)}/>}
 </>
}
export const FilmV8:React.FC=()=>{const frame=useCurrentFrame(),shot=getShot(frame),sec=frame/30,cue=timing.indonesianCaptions.find(c=>sec>=c.start&&sec<c.end),brand=shot.id===18;
 const heading=shot.id===1&&frame<85?'Satu kebiasaan.':shot.id===2&&frame<shot.start+70?'Tanpa kata maaf.':shot.id===12?'Aku mulai mengerti.':null;
 return <AbsoluteFill style={{background:P.paper}}>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920"><defs><filter id="whip-v8" x="-10%" y="-5%" width="120%" height="110%"><feGaussianBlur stdDeviation="5 0"/></filter><clipPath id="camera-v8"><rect x="0" y="160" width="1080" height="1380"/></clipPath><linearGradient id="caption-v8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.paper} stopOpacity="0"/><stop offset=".35" stopColor={P.paper}/></linearGradient></defs>
   <g clipPath={brand?undefined:'url(#camera-v8)'}><World frame={frame}/></g>
   {!brand&&<><rect y="1480" width="1080" height="440" fill="url(#caption-v8)"/>{heading&&<g opacity={quick(frame-shot.start,4,22)}><Serif x="83" y="280" fontSize="64" fontStyle="italic" fill={P.wine}>{heading}</Serif></g>}</>}
  </svg>
  {!brand&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:78,top:66,width:156,height:58,objectFit:'contain'}}/>}
  {!brand&&cue&&<div data-caption="true" style={{position:'absolute',left:100,width:880,top:1580,minHeight:140,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:'Lato',fontWeight:700,fontSize:40,lineHeight:1.4,color:P.ink,whiteSpace:'pre-line'}}>{cue.text}</div>}
  <Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile(timing.narrationFile)}/></Sequence>
 </AbsoluteFill>
};
