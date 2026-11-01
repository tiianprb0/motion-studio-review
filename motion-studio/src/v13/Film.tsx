import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,delayRender,continueRender} from 'remotion';
import timing from '../timing-v13.json';
import {P,Person,ramp,quick,Actor} from './Character';
import {ReferenceFace} from './ReferenceFace';
import {RichRoom,Context} from './Graphics';
import {Caption} from './Captions';
import {SocialIcon} from './SocialIcons';
export const CHARACTER_NAMES={her:'Naya',him:'Yan'} as const;
export const OUTRO_START=Math.ceil(timing.duration*30),TOTAL_FRAMES=OUTRO_START+108;
export const SHOTS=[...timing.segments.map((s,i)=>({id:i+1,key:s.id,start:Math.round(s.start*30),end:i===timing.segments.length-1?OUTRO_START:Math.round(timing.segments[i+1].start*30)})),{id:15,key:'brand',start:OUTRO_START,end:TOTAL_FRAMES}];
const Text:React.FC<React.SVGProps<SVGTextElement>>=p=><text fontFamily="Lato" fill={P.ink} {...p}/>;
const Cam=({z=1,x=540,y=1000,a=0,children}:{z?:number;x?:number;y?:number;a?:number;children:React.ReactNode})=><g transform={`translate(540 1000) rotate(${a}) scale(${z}) translate(${-x} ${-y})`}>{children}</g>;
const Focus=({blur=0,children}:{blur?:number;children:React.ReactNode})=>{const id='focus13-'+React.useId().replace(/[^a-zA-Z0-9_-]/g,'');return blur>.1?<><defs><filter id={id} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation={blur}/></filter></defs><g filter={`url(#${id})`}>{children}</g></>:<g>{children}</g>};
const Room=({f=0,night=false}:{f?:number;night?:boolean})=><Context.Provider value={{id:1,f,n:300}}><RichRoom night={night} shift={Math.sin(f*.012)*7}/></Context.Provider>;
const Desk=({y=1320}:{y?:number})=><g data-prop="desk"><path d={`M150 ${y}l35 325M930 ${y}l-25 325`} stroke="#9D7754" strokeWidth="24"/><path d={`M112 ${y-30}h832l30 58H92Z`} fill="#D3B38B"/><path d={`M92 ${y+28}h882v18H92Z`} fill="#AD855E"/><path d={`M150 ${y-11}h730`} stroke="#E3C9A8" strokeWidth="4"/></g>;
const Phone=({x=540,y=1170,s=1,a=0,locked=false,back=false,tilt=0}:{x?:number;y?:number;s?:number;a?:number;locked?:boolean;back?:boolean;tilt?:number})=><g data-prop="phone" transform={`translate(${x} ${y}) rotate(${a}) scale(${s}) scale(1 ${1-.6*tilt}) rotate(${90*tilt})`}><rect x="-77" y="-146" width="154" height="292" rx="24" fill={P.ink}/>{back?<><circle cx="-48" cy="-113" r="10" fill="#526A5F"/><circle cx="-48" cy="-113" r="4" fill="#1E302A"/><path d="M-22-5h44" stroke="#60796C" strokeWidth="4"/></>:<><rect x="-67" y="-135" width="134" height="270" rx="17" fill="#FFF9EF"/><rect x="-24" y="-128" width="48" height="7" rx="3" fill={P.ink}/>{locked?<g transform="translate(0 -10)"><path d="M-22-5v-21a22 22 0 0144 0v21" fill="none" stroke={P.sage} strokeWidth="8"/><rect x="-31" y="-5" width="62" height="52" rx="10" fill={P.sage}/><circle cy="17" r="5" fill={P.cream}/><path d="M0 20v11" stroke={P.cream} strokeWidth="4"/><Text y="89" textAnchor="middle" fontSize="15">Pribadi</Text></g>:<><Text y="-87" textAnchor="middle" fontSize="17" fontWeight="700">Pesan</Text><rect x="-53" y="-63" width="102" height="37" rx="10" fill="#DCE4D4"/><path d="M-41-50h55M-41-40h72" stroke="#93A690" strokeWidth="4" strokeLinecap="round"/><rect x="-24" y="-5" width="76" height="49" rx="10" fill="#F0C4AD"/><path d="M-12 9h46M-12 22h32" stroke="#C4937D" strokeWidth="4" strokeLinecap="round"/><circle cy="102" r="8" fill="#E1E7DB"/></>}</>}</g>;
const Reach=({x,y,side='right',cloth=P.sage,open=false}:{x:number;y:number;side?:'left'|'right';cloth?:string;open?:boolean})=>{const sign=side==='right'?1:-1;return <g data-prop="hand"><path d={`M${side==='right'?1250:-170} ${y+145}Q${x+sign*250} ${y+70} ${x+sign*85} ${y+10}`} stroke={cloth} strokeWidth="85" fill="none" strokeLinecap="round"/><path d={`M${x+sign*88} ${y+12}L${x} ${y}`} stroke={P.skin} strokeWidth="48" fill="none" strokeLinecap="round"/><ellipse cx={x} cy={y} rx={open?37:28} ry={open?26:23} fill={P.skin}/>{open&&<path d={`M${x-25} ${y-10}q-17-38-7-40q14-3 29 32M${x-7} ${y-18}q-7-34 5-34q12 0 19 36M${x+12} ${y-16}q1-29 13-26q10 3 5 37`} stroke={P.skin} strokeWidth="13" strokeLinecap="round" fill="none"/>}</g>};
function Clock({f=0,night=false}:{f?:number;night?:boolean}){return <g data-prop="clock" transform="translate(825 610)"><circle r="65" fill={night?'#D6D9C7':'#F8EFD9'} stroke="#AF906D" strokeWidth="8"/>{[0,1,2,3].map(i=><path key={i} d="M0-50v7" stroke="#9A8369" strokeWidth="4" transform={`rotate(${i*90})`}/>)}<g transform={`rotate(${f*2.8})`}><path d="M0 0v-37" stroke={P.ink} strokeWidth="4" strokeLinecap="round"/></g><path d="M0 0l26 14" stroke={P.ink} strokeWidth="5" strokeLinecap="round"/><circle r="5" fill={P.gold}/></g>}
function Face({who='her',x=540,y=800,s=4.6,mood='thinking',f=0,talk=0}:{who?:'her'|'him';x?:number;y?:number;s?:number;mood?:Actor['mood'];f?:number;talk?:number}){return <Person who={who} x={x} y={y+279*s} s={s} dir={who==='her'?1:-1} mood={mood} gaze={who==='her'?3:-3} head={Math.sin(Math.min(1,f/38)*Math.PI)*2} right={[43,-180]} left={[-33,-160]} talk={talk} f={f} framing="close"/>}
function Pair({f=0,n=150,mode='listen',night=false}:{f?:number;n?:number;mode?:'listen'|'boundary'|'return'|'ask'|'growth';night?:boolean}){
 const p=ramp(f,0,n*.6),boundary=mode==='boundary',give=mode==='return',ask=mode==='ask',growth=mode==='growth';
 const px=give?610-85*p:ask?575-65*ramp(f,n*.62,n*.9):growth?490:575;
 const lift=ask?ramp(f,n*.62,n*.9):0,py=1314-90*lift,grip=129-61*lift;
 const yanHand: [number,number]=give?[(px+129-790)/2.45,(py+10-1520)/2.45]:boundary?[(-75+50*p),-139]:ask?[(-49-14*p),-165]:growth?[-35,-146]:[-51,-155];
 const nayaHand:[number,number]=ask?[(px-grip-300)/2.45,(py+22-1520)/2.45]:growth?[55,-170]:boundary?[70,-185]:[55+8*p,-178];
 return <Cam z={ramp(f,0,n,1.01,1.095)} x={540} y={1000}><Focus blur={1}><Room f={f} night={night}/></Focus><Clock f={f*.28} night={night}/>
  <Person x={300} y={1520} s={2.45} who="her" mood={growth?'warm':boundary?'thinking':'soft'} gaze={3} right={nayaHand} left={[-34,-150]} head={ramp(f,0,n*.7,-2,1)} talk={boundary?.18+Math.abs(Math.sin(f*.18))*.13:0} f={f}/>
  <Person x={790} y={1520} s={2.45} who="him" dir={-1} mood={growth?'soft':ask?'thinking':'unsure'} gaze={-3} left={yanHand} right={[38,-145]} head={ramp(f,0,n*.65,2,-2)} f={f}/>
  <Desk/>{growth?<Phone x={px} y={1314} s={.8} locked tilt={1}/>:<Phone x={px} y={py} s={.88} tilt={1-lift} a={give?ramp(f,0,n*.6,9,0):0} locked={boundary||ask}/>}
  {ask&&<g transform={`translate(${790+yanHand[0]*2.45} ${1520+yanHand[1]*2.45})`}><path d="M-14-6q-14-29-8-32q9-4 21 24M0-11q-4-29 4-29q8 0 13 28M15-8q2-25 10-23q9 3 3 24" stroke={P.skin} strokeWidth="10" strokeLinecap="round" fill="none"/></g>}
  {boundary&&<path data-prop="boundary" d={`M680 1262v${140*p}`} stroke={P.wine} strokeWidth="7" strokeLinecap="round"/>}
  {mode==='listen'&&<path d="M535 745c-30-42-63 4 0 43c63-39 30-85 0-43Z" fill="none" stroke="#B17875" strokeWidth="5" opacity={ramp(f,n*.1,n*.3)*.65}/>}
 </Cam>
}
function Bedroom({f,n}:{f:number;n:number}){const reach=ramp(f,10,n*.55);return <><Room f={f} night/><path d="M90 1000q0-90 90-90h600q90 0 90 90v460H90Z" fill="#AD8A6E"/><path d="M85 1160h800v365H85Z" fill="#DFD6C0"/><rect x="145" y="1015" width="255" height="150" rx="49" fill="#F8EED9"/><g data-actor="her" data-role="principal"><g data-face="her" transform="translate(278 1112) rotate(-13) scale(2.1) translate(0 279)"><ReferenceFace who="her" view="three" dir={1} mood="soft" blink={true} gaze={0} talk={0}/></g></g><path d="M360 1075q220-55 500 70v340H345Z" fill="#93AA96"/><path d="M367 1120q223-30 488 77M385 1175q180-20 450 60" fill="none" stroke="#B5C4AB" strokeWidth="7"/><path d="M100 1530v130M850 1530v130" stroke="#997757" strokeWidth="21"/>
 <Person x={842} y={1450} s={2.3} who="him" dir={-1} mood="unsure" head={3} gaze={-4} left={[-45-23.3*reach,-45.6-50*reach]} f={f}/>
 <path d="M565 1360h245v30H565ZM590 1390v170M783 1390v170" stroke="#A58360" strokeWidth="14"/>
 <Phone x={638} y={1325-115*reach} s={.61} a={ramp(f,10,n*.55,79,5)}/>
 </>}
function PhoneDetail({f=0,night=false,mode='reach'}:{f?:number;night?:boolean;mode?:'reach'|'stop'|'return'|'wait'}){const phase=f%52,p=ramp(phase,0,31),ret=mode==='return',stop=mode==='stop',wait=mode==='wait';const x=ret?650-130*ramp(f,0,35):stop?600:540;return <>
 <Focus blur={5}><Room f={f} night={night}/></Focus><path d="M-100 880L1200 780V1900H-100Z" fill="#CCAC87"/><path d="M-100 926L1200 826M-100 1620h1400" stroke="#E0C6A4" strokeWidth="5"/>
 <Phone x={x} y={1210} s={1.5} tilt={wait?1:0} a={ret?ramp(f,0,35,10,0):-5} locked={stop||wait}/>
 <Reach x={ret?x+116:wait?850:x+240-112*p} y={1285} open={wait} cloth={P.sage}/>
 {(stop||ret)&&<Reach x={stop?x-120:398} y={stop?1160:1345} side="left" cloth="#FFCDB2" open={stop}/>}
 {stop&&<path d={`M${x-100} 940v${ramp(f,0,18,0,650)}`} stroke={P.wine} strokeWidth="8" strokeLinecap="round"/>}
 </>}
function Close({f,who='her',mood='thinking',night=false}:{f:number;who?:'her'|'him';mood?:Actor['mood'];night?:boolean}){return <Cam z={ramp(f,0,80,1,1.06)} x={540}><Focus blur={5}><Room f={f} night={night}/></Focus><Face who={who} f={f} mood={mood} y={795}/></Cam>}
function Scene({id,f,n}:{id:number;f:number;n:number}){const u=f/Math.max(n,1);
 if(id===1)return u<.52?<PhoneDetail f={f} mode="stop"/>:<Close f={f-n*.52} mood="thinking"/>;
 if(id===2){if(u<.43)return <Bedroom f={f} n={n}/>;if(u<.74)return <PhoneDetail f={f-n*.43} night/>;return <Close f={f-n*.74} who="him" mood="unsure" night/>}
 if(id===3){if(u<.35)return <Pair f={f} n={n} mode="boundary"/>;return <Close who={u<.70?'him':'her'} f={f-(u<.70?n*.35:n*.70)} mood={u<.70?'unsure':'thinking'}/>}
 if(id===4)return u>.38&&u<.66?<Close f={f-n*.38} who="him" mood="soft"/>:<Pair f={f} n={n} mode="listen"/>;
 if(id===5){if(u<.38)return <Pair f={f} n={n}/>;if(u<.68)return <Pair f={f-n*.38} n={n*.30} night/>;return <Close f={f-n*.68} mood="warm"/>}
 if(id===6)return u<.64?<PhoneDetail f={f} mode="reach"/>:<Pair f={f-n*.64} n={n*.36} mode="boundary"/>;
 if(id===7)return u<.5?<Pair f={f} n={n} mode="boundary"/>:<PhoneDetail f={f-n*.5} mode="stop"/>;
 if(id===8)return u<.48?<PhoneDetail f={f} night/>:<Close f={f-n*.48} mood="thinking"/>;
 if(id===9)return <PhoneDetail f={f} mode="stop"/>;
 if(id===10)return u<.55?<Pair f={f} n={n} mode="return"/>:<PhoneDetail f={f-n*.55} mode="return"/>;
 if(id===11)return <Close f={f} who={u<.56?'him':'her'} mood={u<.56?'unsure':'soft'}/>;
 if(id===12)return <Pair f={f} n={n} mode="boundary"/>;
 if(id===13)return <Pair f={f} n={n} mode="ask"/>;
 if(id===14)return u<.35?<PhoneDetail f={f} mode="wait"/>:<Pair f={f-n*.35} n={n*.65} mode="growth"/>;
 return null;
}
function Outro({f}:{f:number}){const q=quick(f,3,23),social=quick(f,20,35);return <><rect width="1080" height="1920" fill={P.ink}/><g opacity={q} transform={`translate(540 ${920+38*(1-q)})`}><text fontFamily="Playfair" textAnchor="middle" fontSize="110" fill={P.cream} letterSpacing="-5">less.certain</text><path d={`M-265 46h${530*quick(f,14,28)}`} stroke={P.gold} strokeWidth="6" strokeLinecap="round"/></g><g data-social-row="true" opacity={social} transform={`translate(77 ${22*(1-social)})`}><SocialIcon name="tiktok" x={247} y={1146} color={P.cream}/><SocialIcon name="instagram" x={327} y={1146} color={P.cream}/><Text x="415" y="1187" fontSize="45" fontWeight="700" fill={P.cream}>@less.certain</Text></g></>}
export const getShot=(frame:number)=>SHOTS.find(s=>frame>=s.start&&frame<s.end)??SHOTS[14];
export function World({frame}:{frame:number}){const shot=getShot(frame);if(shot.id===15)return <Outro f={frame-OUTRO_START}/>;
 const hiddenAt=SHOTS[2].start;
 if(frame>=hiddenAt-9&&frame<hiddenAt+10){const before=frame<hiddenAt,s=before?SHOTS[1]:SHOTS[2],tx=before?ramp(frame,hiddenAt-9,hiddenAt,1130,-30):quick(frame,hiddenAt,hiddenAt+10,-30,-1360);return <><Scene id={s.id} f={Math.max(0,frame-s.start)} n={s.end-s.start}/><g data-transition="curtain" transform={`translate(${tx} 0)`}><rect x="-35" y="-100" width="1280" height="2120" fill="#C5AD8B"/><path d="M12-100V2020M47-100V2020" stroke="#E0CEAC" strokeWidth="10"/></g></>}
 return <><Scene id={shot.id} f={frame-shot.start} n={shot.end-shot.start}/>{frame>=OUTRO_START-18&&<g data-transition="outro" transform={`translate(${ramp(frame,OUTRO_START-18,OUTRO_START-1,1100,0)} 0)`}><rect x="0" y="-100" width="1200" height="2120" fill={P.ink}/><path d="M4-100V2020" stroke={P.gold} strokeWidth="8" opacity={Math.sin(ramp(frame,OUTRO_START-18,OUTRO_START-1)*Math.PI)}/></g>}</>;
}
export const getCue=(frame:number)=>timing.indonesianCaptions.findIndex(c=>frame/30>=c.start&&frame/30<c.end);
export const AuditFrame:React.FC<{frame:number}>=({frame})=>{const index=getCue(frame);return <div style={{position:'relative',width:1080,height:1920,overflow:'hidden'}}><svg width="1080" height="1920" viewBox="0 0 1080 1920"><World frame={frame}/>{index>=0&&frame<OUTRO_START&&<Caption cue={{...timing.indonesianCaptions[index],segment:''}} index={index} frame={frame}/>}</svg></div>};
export const FilmV13:React.FC=()=>{const frame=useCurrentFrame();React.useLayoutEffect(()=>{const h=delayRender('Wait for complete frame paint');let r1=0,r2=0;const t=setTimeout(()=>{r1=requestAnimationFrame(()=>{r2=requestAnimationFrame(()=>continueRender(h))})},70);return()=>{clearTimeout(t);cancelAnimationFrame(r1);cancelAnimationFrame(r2);continueRender(h)}},[frame]);return <AbsoluteFill style={{background:P.paper}}><AuditFrame key={frame} frame={frame}/>{frame<OUTRO_START&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:78,top:66,width:156,height:58,objectFit:'contain',opacity:1-ramp(frame,OUTRO_START-18,OUTRO_START-1)}}/>}<Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile(timing.narrationFile)}/></Sequence></AbsoluteFill>};
