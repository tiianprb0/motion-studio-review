import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import timing from './timing.json';
import {Human,Phone,Bubble,P} from './DirectedFilm';
export const move=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.55,0,.2,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const out=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.2,.8,.2,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
type Point=[number,number];
type Mood='neutral'|'warm'|'firm'|'worried';
export type Actor={id:string;x:number;y:number;s:number;woman?:boolean;mood:Mood;left:Point;right:Point;look:number;lean?:number;nod?:number;seated?:boolean;alpha:number};
export type Device={id:string;x:number;y:number;s:number;angle:number;alpha:number;heldBy?:string};
export type Talk={id:string;x:number;y:number;w:number;text:string;alpha:number};
type State={actors:Actor[];phones:Device[];talk:Talk[];zoom:number;cx:number;cy:number;angle:number;dark:boolean;insert:number;screenY:number};
const seg=(id:string)=>timing.segments.find(s=>s.id===id)!;
export const ACTS=[
 {id:'hook',start:0,end:seg('phone').start},
 {id:'incident',start:seg('phone').start,end:seg('insecurity').start},
 {id:'understanding',start:seg('insecurity').start,end:seg('empathy').start},
 {id:'listening',start:seg('empathy').start,end:seg('repeat').start},
 {id:'boundary',start:seg('repeat').start,end:seg('mistake').start},
 {id:'pattern',start:seg('mistake').start,end:seg('accountability').start},
 {id:'change',start:seg('accountability').start,end:timing.duration}
];
const person=(id:string,x:number,y:number,s=1.6,woman=false):Actor=>({id,x,y,s,woman,mood:'neutral',left:[-55,-62],right:[55,-62],look:woman?2:-2,alpha:1});
function rawStateAt(id:string,f:number):State{
 const state:State={actors:[],phones:[],talk:[],zoom:1,cx:540,cy:1040,angle:0,dark:id==='incident',insert:0,screenY:1040};
 if(id==='hook'){
  const a=person('A',330,1270,1.55,true),b=person('B',750,1270,1.55);a.mood='neutral';b.mood='worried';a.right=[80,-107];b.left=[-80,-107];state.actors=[a,b];state.zoom=move(f,0,100,1.2,1);return state;
 }
 if(id==='incident'){
  const reach=move(f,15,42),pick=move(f,42,91),insert=f>=132?1:0;const b=person('B',780,1310,1.3);b.mood='worried';b.look=-3;b.left=[-55-reach*55+pick*13,-62-reach*23-pick*30];b.lean=-5*reach+pick*5;b.alpha=1-insert;
  state.actors=[b];state.phones=[{id:'phone',x:640+pick*14,y:1140-pick*40,s:.52,angle:-12+pick*4,alpha:1-insert,heldBy:pick>.5?'B':undefined}];state.insert=insert;
  state.zoom=move(f,91,126,1,1.08);state.cx=move(f,91,126,540,550);state.cy=move(f,91,126,1040,1080);state.angle=move(f,91,126,0,-2);return state;
 }
 if(id==='understanding'){
  const reveal=move(f,55,125);const closer=move(f,151,195);const arm=move(f,192,243);const a=person('A',out(f,70,133,200,355)+closer*60,1310,1.6,true);a.alpha=move(f,70,112);a.mood=f<190?'neutral':'warm';a.right=[55+arm*80,-62-arm*84];
  const b=person('B',630+reveal*105-closer*70,1310,3-reveal*1.4);b.mood=f<211?'worried':'neutral';b.lean=-3*(1-reveal);b.left=arm>0?[-22,-133]:[-55,-62];b.nod=move(f,268,285,0,5)-move(f,285,310,0,5);
  state.actors=[a,b];const alpha=out(f,195,220)*(1-move(f,335,366));state.talk=[{id:'assurance',x:278,y:650,w:480,text:'Aku memilih kamu.',alpha}];return state;
 }
 if(id==='listening'){
  const a=person('A',350,1260,1.7,true),b=person('B',730,1260,1.7);a.seated=b.seated=true;a.mood='warm';b.mood='neutral';a.right=[out(f,14,59,55,79),out(f,14,59,-62,-107)];b.left=[-58,-102];b.nod=move(f,61,77,0,5)-move(f,77,95,0,5);a.lean=out(f,20,70,0,3);
  state.actors=[a,b];state.zoom=move(f,0,110,1.05,1);state.cx=move(f,90,178,540,525);state.angle=move(f,0,115,-3,1);return state;
 }
 if(id==='boundary'){
  const a=person('A',330,1300,1.5,true),b=person('B',750,1300,1.5);const take=move(f,10,55),put=move(f,91,129),stop=move(f,51,92),own=move(f,138,192);
  a.mood=f<53?'neutral':'firm';a.right=[55+stop*52-own*14,-62-stop*87+own*30];b.mood=f<90?'neutral':'worried';b.left=[-55-take*65+put*65,-62-take*48+put*48];b.nod=move(f,205,222,0,5)-move(f,222,244,0,5);
  state.actors=[a,b];state.phones=[{id:'phone',x:540-own*70,y:1100-take*20+put*20-own*30,s:.52,angle:-8+own*8,alpha:1,heldBy:own>.7?'A':take-put>.6?'B':undefined}];state.angle=move(f,130,209,0,-2);state.zoom=move(f,130,209,1,1.08);state.cx=535;return state;
 }
 if(id==='pattern'){
  const a=person('A',300,1270,1.65,true);a.mood='firm';a.look=move(f,30,110,1,3);a.right=[89,-111];state.actors=[a];state.phones=[{id:'phone',x:448,y:1025,s:.5,angle:8,alpha:1,heldBy:'A'}];state.zoom=move(f,0,148,1.2,.95);state.cx=move(f,0,148,460,540);state.angle=move(f,30,140,-4,0);return state;
 }
 if(id==='change'){
  const give=move(f,20,78),settle=move(f,88,135);const listen=move(f,170,225);const boundary=move(f,250,288);const reach=move(f,358,379);const withdraw=move(f,390,423);const space=move(f,503,580);
  const a=person('A',360-space*20,1280,1.55,true),b=person('B',720+space*55,1280,1.55);a.mood=f<160?'firm':f<249?'warm':f<530?'firm':'neutral';b.mood=f>165&&f<250?'worried':'neutral';
  a.right=[55+give*57-settle*19,-62-give*67+settle*29];b.left=[-55-give*57+settle*57-reach*53+withdraw*53,-62-give*65+settle*65-reach*45+withdraw*45];
  b.nod=(move(f,88,104,0,5)-move(f,104,127,0,5))+(move(f,295,309,0,6)-move(f,309,331,0,6));a.lean=listen*2-boundary*2;
  state.actors=[a,b];state.phones=[{id:'phone',x:637-give*97-settle*42-space*20,y:1106+give*5-settle*31,s:.5,angle:-8+give*12-settle*4,alpha:1,heldBy:give<.8?'B':'A'}];
  state.talk=[{id:'boundary-talk',x:155,y:650,w:360,text:'Tanya dulu, ya.',alpha:out(f,265,287)*(1-move(f,338,355))},{id:'ask-first',x:610,y:650,w:245,text:'Boleh?',alpha:out(f,420,443)*(1-move(f,492,511))}];
  state.zoom=move(f,0,77,1,1.1)-move(f,88,160,0,.1)-move(f,515,650,0,.07);state.cx=move(f,185,230,540,505)+move(f,290,350,0,35);return state;
 }
 return state;
}

export function stateAt(id:string,f:number):State{
 const s=rawStateAt(id,f);let g=1,up=0;
 if(id==='incident'){g=1.06;up=-35;}
 if(id==='understanding'){g=1+move(f,55,125,0,.35);up=move(f,55,125,0,-180);}
 if(id==='listening'){g=1.28;up=-180;}
 if(id==='boundary'){g=1.28;up=-185;}
 if(id==='pattern'){g=1.12;up=-130;}
 if(id==='change'){g=1.35;up=-180;}
 s.zoom*=g;s.screenY=1100+up-60*g;return s;
}

const Camera=({state,children}:{state:State;children:React.ReactNode})=><g transform={`translate(540 ${state.screenY}) scale(${state.zoom}) rotate(${state.angle}) translate(${-state.cx} ${-state.cy})`}>{children}</g>;
const People=({state,f}:{state:State;f:number})=><>{state.actors.map(a=><g key={a.id} opacity={a.alpha}><Human x={a.x} y={a.y} s={a.s} f={f} woman={a.woman} mood={a.mood} left={a.left} right={a.right} lean={a.lean} nod={a.nod} seated={a.seated} look={a.look}/></g>)}{state.phones.map(p=><g key={p.id} opacity={p.alpha}><Phone x={p.x} y={p.y} s={p.s} angle={p.angle}/></g>)}{state.talk.map(t=><g key={t.id} opacity={t.alpha}><Bubble x={t.x} y={t.y} w={t.w} text={t.text} f={50}/></g>)}</>;
const Floor=({dark=false}:{dark?:boolean})=><><path d="M-200 1290 540 1085l740 205-740 280Z" fill={dark?'#3B5651':P.pale} opacity=".48"/><path d="m-200 1290 740-205 740 205" stroke={dark?'#587269':'#CBD1C1'} strokeWidth="2" fill="none"/></>;

const Bedroom=({f,state}:{f:number;state:State})=><>
 <g opacity={1-state.insert}><rect x="-100" y="420" width="1280" height="1020" fill="#2A4741"/><Floor dark/><rect x="150" y="530" width="220" height="300" rx="5" fill="#172F31"/><path d="M270 577a63 63 0 1 0 48 97q-65 5-48-97" fill="#D9D9BA"/><path d="M130 1092q0-35 35-35h412q35 0 35 35v165H130Z" fill={P.white}/><path d="M130 1250h490v44H130Zm25 44v50m440-50v50" stroke="#8A9D88" strokeWidth="12"/><ellipse cx="240" cy="1090" rx="69" ry="36" fill="#E2D9C6"/><ellipse cx="249" cy="1073" rx="37" ry="32" fill={P.rose}/><path d="M212 1073q-7-47 38-42q38 5 35 43q-36-26-73-1" fill={P.ink}/><path d="m245 1075 12 2" stroke={P.ink} strokeWidth="3"/><path d="M300 1078q166-57 279 27v134H300Z" fill="#B87D6A"/><path d="M329 1166q135-28 233 3" stroke="#A46E5F" strokeWidth="4" fill="none"/><path d="M595 1208h111m-91 0v135m72-135v135" stroke="#17322F" strokeWidth="10"/></g>
 <People state={state} f={f}/>
</>;
const Room=({f,id,state}:{f:number;id:string;state:State})=><>
 <Floor/>
 {id==='understanding'&&<>{f<190&&<g opacity={1-move(f,125,174)} transform={`translate(${state.actors[1].x} ${state.actors[1].y-state.actors[1].s*280-110})`}><path d="M-102 35q-29-67 27-86q31-48 80-25q63-9 78 35q53 38 9 76Z" fill={P.wine}/><text textAnchor="middle" y="19" fontFamily="Playfair" fontSize="83" fill={P.rose}>?</text></g>}</>}
 {id==='listening'&&<><ellipse cx="540" cy="1125" rx="110" ry="28" fill="#D7C4B1"/><path d="M440 1125v153m200-153v153" stroke="#B39C85" strokeWidth="9"/></>}
 {id==='boundary'&&<><ellipse cx="540" cy="1160" rx="140" ry="34" fill="#D7C4B1"/><path d="M416 1160v145m248-145v145" stroke="#B39C85" strokeWidth="9"/><circle cx="540" cy="690" r="66" fill={P.white}/><path d="M540 650v40l28 18" stroke={P.sage} strokeWidth="5" strokeLinecap="round" fill="none" transform={`rotate(${move(f,0,91,0,250)} 540 690)`}/><path d="M540 1345V1230" stroke={P.wine} strokeWidth="5" strokeDasharray="115" strokeDashoffset={115*(1-move(f,153,210))}/></>}
 {id==='change'&&<path d="M525 1340v-116" stroke={P.wine} strokeWidth="4" opacity={move(f,272,325,.0,.65)} strokeDasharray="5 9"/>}
 <People state={state} f={f}/>
</>;
const Pattern=({f,state}:{f:number;state:State})=><>
 <Floor/><path d="M500 1180Q490 915 720 920Q925 930 840 1155Q756 1350 537 1217" stroke={P.wine} strokeWidth="6" fill="none" strokeDasharray="1100" strokeDashoffset={1100*(1-move(f,30,148))}/>
 {[{x:552,y:998},{x:775,y:957},{x:839,y:1160}].map((pt,i)=><g key={i} opacity={out(f,29+i*29,49+i*29)}><circle cx={pt.x} cy={pt.y} r="27" fill={P.rose}/><text x={pt.x} y={pt.y+9} textAnchor="middle" fontFamily="Lato" fontSize="26" fill={P.wine}>{i+1}</text></g>)}
 <People state={state} f={f}/><text x="655" y="720" textAnchor="middle" fontFamily="Playfair" fontSize="90" fontStyle="italic" fill={P.wine} opacity={out(f,155,181)}>pola.</text>
</>;

const Shot=({act}:{act:typeof ACTS[number]})=>{
 const f=useCurrentFrame();const s=stateAt(act.id,f);const duration=(act.end-act.start)*30;
 return <AbsoluteFill style={{background:s.dark?P.night:P.paper}}>
  <svg width="1080" height="1920" style={{position:'absolute'}}>
   <Camera state={s}>
    {act.id==='incident'?<Bedroom f={f} state={s}/>:act.id==='pattern'?<Pattern f={f} state={s}/>:<Room f={f} state={s} id={act.id}/>}
    {act.id==='hook'&&<><path d="M445 1110Q540 1070 635 1110" stroke={P.wine} strokeWidth="5" fill="none" strokeDasharray="210" strokeDashoffset={210*(1-out(f,0,55))}/><path d="M540 1350v-140" stroke={P.wine} strokeWidth="5" strokeDasharray="140" strokeDashoffset={140*(1-move(f,63,116))}/></>}
   </Camera>
   {act.id==='incident'&&<g opacity={s.insert} transform={`translate(${out(f,132,186,660,540)} ${out(f,132,186,1025,940)}) rotate(${out(f,126,186,-18,-6)}) scale(${out(f,126,186,2.55,2.2)})`}><ellipse cx="10" cy="26" rx="82" ry="128" fill="#152E2C" opacity=".45"/><Phone x={0} y={0} s={1}/><circle cy="35" r="30" fill={P.pale}/><path d="M-25 35Q0 7 25 35Q0 63-25 35Z" fill="none" stroke={P.ink} strokeWidth="3"/><circle cy="35" r="8" fill={P.ink}/></g>}
   {act.id==='hook'&&<g opacity={1-move(f,125,155)}><text x="90" y="350" fontFamily="Playfair" fontSize="108" letterSpacing="-2.5" fill={P.ink} opacity={out(f,0,20)}>Memahami.</text><text x="90" y="476" fontFamily="Playfair" fontSize="108" letterSpacing="-2.5" fontStyle="italic" fill={P.wine} opacity={out(f,15,39)}>Bukan membiarkan.</text></g>}
  </svg>
  <div style={{position:'absolute',left:0,right:0,top:1460,height:300,background:s.dark?P.night:P.paper}}/>
 </AbsoluteFill>;
};

const Caption=()=>{
 const t=useCurrentFrame()/30;const c=timing.indonesianCaptions.find(c=>t>=c.start&&t<c.end+.04);if(!c)return null;const dark=t>=ACTS[1].start&&t<ACTS[1].end;
 return <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',top:1490,width:840,textAlign:'center',fontFamily:'Lato',fontSize:44,lineHeight:1.42,fontWeight:700,color:dark?P.white:P.ink}}><span style={{textWrap:'balance'}}>{c.text}</span></div>;
};
const BrandOutro=()=>{
 const f=useCurrentFrame();const rise=out(f,0,28,16,0),second=out(f,12,40,-16,0);const alpha=out(f,0,23);const handles=out(f,43,65);
 const base:React.CSSProperties={position:'absolute',left:130,top:790,width:820,height:274,objectFit:'contain'};
 return <AbsoluteFill style={{background:P.paper}}>
  <Img src={staticFile('less-certain-logo.png')} style={{...base,clipPath:'inset(0 64.2% 0 0)',opacity:alpha,transform:`translateY(${rise}px)`}}/>
  <Img src={staticFile('less-certain-logo.png')} style={{...base,clipPath:'inset(0 0 0 38.4%)',opacity:out(f,12,37),transform:`translateY(${second}px)`}}/>
  <Img src={staticFile('less-certain-logo.png')} style={{...base,clipPath:'inset(0 61.6% 0 35.8%)',opacity:out(f,32,43)}}/>
  <div style={{position:'absolute',top:1113,left:540-out(f,27,57,0,410),width:out(f,27,57,0,820),height:1,background:P.wine}}/>
  <div style={{position:'absolute',top:1164,width:1080,textAlign:'center',opacity:handles,transform:`translateY(${12*(1-handles)}px)`,fontFamily:'Lato',fontSize:25,letterSpacing:4,color:P.muted}}>TIKTOK · INSTAGRAM</div>
  <div style={{position:'absolute',top:1220,width:1080,textAlign:'center',opacity:out(f,49,72),fontFamily:'Lato',fontSize:36,color:P.ink}}>@less.certain</div>
 </AbsoluteFill>;
};

export const StoryFilm=()=>{
 const f=useCurrentFrame();const storyFrames=Math.round(timing.duration*30);const total=storyFrames+102;const dark=f/30>=ACTS[1].start&&f/30<ACTS[1].end;
 return <AbsoluteFill style={{background:P.paper,fontFamily:'Lato'}}>
  {ACTS.map(act=><Sequence key={act.id} from={Math.round(act.start*30)} durationInFrames={Math.round(act.end*30)-Math.round(act.start*30)} premountFor={10}><Shot act={act}/></Sequence>)}
  <Caption/>
  {f<storyFrames&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:85,top:128,width:248,height:83,objectFit:'contain',filter:dark?'brightness(0) invert(1)':undefined}}/>}
  <Sequence from={storyFrames} durationInFrames={102}><BrandOutro/></Sequence>
  <Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile('narration.mp3')}/></Sequence>
  <Audio src={staticFile('ambience.wav')} loop volume={frame=>.24*move(frame,total-72,total,1,0)}/>
 </AbsoluteFill>;
};
