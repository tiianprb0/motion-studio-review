import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame} from 'remotion';
import timing from '../timing-v7.json';
import {C,Person,Room,Box,Table,Bubble,move,out,clamp,Pose} from './People';

export type Shot={id:string;start:number;end:number;chapter:string;title:string[]};
const seg=(id:string)=>timing.segments.find(x=>x.id===id)!;
const cap=(id:string,n:number)=>timing.indonesianCaptions.filter(c=>c.segment===id)[n]?.start;
const care=seg('care');
const cuts=[care.start,cap('care',2)??care.start+(care.end-care.start)*.50,cap('care',3)??care.start+(care.end-care.start)*.76,care.end];
const titleMap:Record<string,string[]>={habit:['Satu kebiasaan.','Selalu bikin kesal.'],silence:['Bertengkar.','Lalu, tanpa maaf.'],message:['Besoknya…','“Sudah makan?”'],food:['Makanan favorit.'],little:['Hal-hal kecil.'],pride:['Kupikir,','dia cuma gengsi.'],home:['Sampai aku tahu','cerita rumahnya.'],martabak:['Marah hari ini.','Martabak besoknya.'],peace:['Begitulah mereka','kembali berdamai.'],understand:['Mungkin, ini bahasa','yang dia kenal.'],again:['Kali ini,','aku memilih bicara.'],thanks:['“Makasih, ya.”'],learn:['Kata maaf','juga boleh diucapkan.'],growth:['Memahami asalnya.','Memberi ruang tumbuh.'],brand:['less.certain']};
export const SHOTS:Shot[]=timing.segments.flatMap((s,i)=>{
 const chapter=i<4?'01 / YANG MEMBUATKU KESAL':i<8?'02 / CERITA DARI RUMAHNYA':'03 / BELAJAR BERSAMA';
 if(s.id==='care')return ['message','food','little'].map((id,n)=>({id,start:cuts[n],end:cuts[n+1],chapter,title:titleMap[id]}));
 return [{id:s.id,start:s.start,end:s.end,chapter,title:titleMap[s.id]}];
});
export const TOTAL_FRAMES=Math.ceil((timing.duration+3.6)*30);
export const getShot=(frame:number)=>SHOTS.find(s=>frame/30>=s.start&&frame/30<s.end)??SHOTS[SHOTS.length-1];
const Serif:React.FC<React.SVGProps<SVGTextElement>>=p=><text fontFamily="Playfair" fill={C.ink} {...p}/>;
const Sans:React.FC<React.SVGProps<SVGTextElement>>=p=><text fontFamily="Lato" fill={C.ink} {...p}/>;
const cup=(x:number,y:number,f:number)=><g transform={`translate(${x} ${y})`}><path d="M-20-28h40l-5 44h-30Z" fill={C.cream}/><path d="M20-19q24 0 16 17q-4 9-19 6" fill="none" stroke={C.cream} strokeWidth="6"/>{[0,1].map(i=><path key={i} d={`M${-8+i*18}-42q${7*Math.sin(f*.035+i)}-14 0-29`} stroke={C.wood} fill="none" strokeWidth="2" opacity=".45"/>)}</g>;
function Title({shot,f,dark=false}:{shot:Shot;f:number;dark?:boolean}){
 const lines=shot.title,em=shot.id==='thanks'||shot.id==='learn',size=shot.id==='growth'?65:em?78:74;
 return <g>
  {lines.map((line,i)=>{const p=out(f,i*5,22+i*5);return <g key={line} opacity={p} transform={`translate(0 ${28*(1-p)})`}><Serif x="84" y={318+i*88} fontSize={size} letterSpacing="-2.5" fontStyle={i===lines.length-1?'italic':'normal'} fill={dark?C.cream:i===lines.length-1?C.wine:C.ink}>{line}</Serif></g>})}
  <path d={`M90 ${339+(lines.length-1)*88}q${160*out(f,29,40)} 3 ${320*out(f,29,40)} -4`} stroke={dark?'#D6B28B':C.ochre} strokeWidth="9" opacity=".5" strokeLinecap="round" fill="none"/>
 </g>;
}
function PeoplePair({f,left={},right={},distance=0}:{f:number;left?:Partial<Pose>;right?:Partial<Pose>;distance?:number}){
 return <><Person x={330-distance} y={1360} s={1.95} female mood="hurt" gaze={3} {...left}/><Person x={750+distance} y={1360} s={1.98} mood="unsure" gaze={-3} {...right}/></>;
}
function Camera({z=1,x=540,y=1080,angle=0,children}:{z?:number;x?:number;y?:number;angle?:number;children:React.ReactNode}){return <g transform={`translate(540 1080) rotate(${angle}) scale(${z}) translate(${-x} ${-y})`}>{children}</g>}
export function Scene({id,f,n}:{id:string;f:number;n:number}){
 const t=f/Math.max(1,n),p=(a:number,b:number,x=0,y=1)=>move(t,a,b,x,y);
 if(id==='habit')return <Camera z={p(0,1,1.10,1.02)} x={p(0,1,505,540)}><Room f={f}/><path d="M540 782v470" stroke={C.line} strokeWidth="2" strokeDasharray="8 14" opacity={p(.1,.6,.1,.8)}/><Person x={p(0,1,395,350)} y={1380} s={p(0,1,2.5,2.15)} female mood="annoyed" gaze={3} tilt={p(.1,.5,0,-6)} rh={[57,-109]} lh={[-39,-99]} lean={p(.3,.9,0,-3)}/><Person x={p(.1,.85,865,760)} y={p(0,1,1305,1360)} s={p(0,1,1.45,1.95)} mood="unsure" lh={[-58,-111]} rh={[53,-94]} gaze={p(.35,.65,-3,0)} step={Math.sin(f*.16)*(1-p(.2,.7))}/><g transform={`translate(${p(.05,.45,90,0)} 0)`} opacity={out(f,7,28)}><Sans x="650" y="720" fontSize="26" fill={C.wine}>lagi…</Sans><path d="M670 746q26 15 16 37" fill="none" stroke={C.wine} strokeWidth="2"/></g></Camera>;
 if(id==='silence')return <Camera z={p(0,1,1.12,1)}><Room night f={f}/><rect x="460" y="755" width="160" height={p(.05,.65,0,590)} fill={C.line} opacity=".25"/><PeoplePair f={f} distance={p(.1,.7,0,35)} left={{mood:'annoyed',gaze:p(.25,.75,3,-4),tilt:-3,lh:[-48,-100],rh:[48,-103]}} right={{mood:'unsure',gaze:-2,tilt:p(.3,.65,0,7),lh:[-35,-130],rh:[35,-98]}}/><Bubble x={780} y={680} w={160} text="…" p={p(.12,.3)*(1-p(.72,.95))}/></Camera>;
 if(id==='message')return <>
  <ellipse cx="540" cy="1200" rx="290" ry="190" fill={C.pale}/>
  <g transform={`translate(${p(0,1,585,540)} ${p(0,1,1065,1020)}) rotate(${p(0,.65,10,-3)}) scale(${p(0,1,1.12,1.20)})`}>
   <path d="M-310 365Q-300 265-200 190L-158 65q30-35 45 5l-11 171q-48 96-52 137" fill={C.skin}/>
   <rect x="-153" y="-270" width="306" height="548" rx="42" fill={C.ink}/><rect x="-137" y="-249" width="274" height="503" rx="28" fill={C.cream}/>
   <rect x="-41" y="-238" width="82" height="10" rx="5" fill={C.ink}/><Sans x="0" y="-179" textAnchor="middle" fontSize="24">Dia</Sans><path d="M-110-146h220" stroke={C.line} strokeWidth="2"/>
   <g opacity={out(f,16,30)} transform={`translate(0 ${20*(1-out(f,16,30))})`}><rect x="-116" y="-104" width="229" height="96" rx="22" fill={C.pale}/><Sans x="-94" y="-65" fontSize="24">Sudah makan?</Sans><Sans x="88" y="-25" textAnchor="end" fontSize="13" fill={C.sage}>08.12</Sans></g>
   <g opacity={p(.6,.85)}><circle cx="-62" cy="30" r="4" fill={C.sage}/><circle cx="-43" cy="30" r="4" fill={C.sage}/><circle cx="-24" cy="30" r="4" fill={C.sage}/></g>
   <path d="M-163 172q-5-52 20-88q18-18 28-1q8 19-9 58l-12 51" fill={C.skin}/>
  </g>
 </>;
 if(id==='food'){
  const q=p(.08,.65),mx=825-q*65,bx=mx-140,by=1165;
  return <Camera z={p(0,1,1.04,1.10)} x={p(0,1,540,570)}><Room f={f}/><Person x={310} y={1360} s={1.95} female mood="unsure" gaze={p(.2,.7,0,4)} rh={[50,-103]} tilt={p(.5,.9,-3,2)}/><Person x={mx} y={1360} s={1.98} gaze={-4} mood="soft" lh={[-70,-87]} rh={[35,-90]} lean={-q*3}/><Table y={1235} w={500}/><Box x={bx} y={by} s={1.05} open={q*.5}/>{cup(430,1208,f)}<path d={`M${bx-100} 1165q-45 5-48 34`} fill="none" stroke={C.ochre} strokeWidth="3" opacity={Math.sin(q*Math.PI)*.7}/></Camera>;
 }
 if(id==='little'){
  const q=p(.05,.7),fold=p(.5,.92);return <Camera x={p(0,1,570,520)} z={1.06}><Room f={f}/><Person x={750} y={1360} s={1.95} mood="soft" gaze={-3} lh={[-67+fold*10,-108]} rh={[-32-fold*10,-106]} lean={-q*4}/><Person x={285} y={1360} s={1.95} female mood="unsure" gaze={3} tilt={-3} rh={[48,-102]}/><Table y={1210} w={440}/><g transform={`translate(620 1152) rotate(${p(0,.5,8,0)})`}><path d={`M-110 0h${220-80*fold}v${44+14*fold}h-${220-80*fold}Z`} fill={C.pale} stroke={C.sage} strokeWidth="3"/><path d={`M${110-80*fold} 0l${-80*fold} 10v48`} fill={C.sage} opacity=".3"/></g><Sans x="420" y="744" fontSize="26" letterSpacing="3" fill={C.wine}>PERHATIAN KECIL</Sans></Camera>;
 }
 if(id==='pride')return <><circle cx="690" cy="1070" r="300" fill={C.pale}/><Camera x={p(0,1,455,490)} z={p(0,1,1.05,1.16)}><Person x={475} y={1390} s={2.35} female mood="annoyed" gaze={p(0,.8,-4,3)} tilt={p(.15,.65,-7,0)} lh={[-43,-107]} rh={[33,-181]}/></Camera><g opacity={out(f,6,20)} transform={`translate(${p(.2,.7,40,0)} 0)`}><Serif x="735" y="735" textAnchor="middle" fontStyle="italic" fontSize="48" fill={C.wine}>gengsi?</Serif><path d={`M630 755h${200*p(.6,.9)}`} stroke={C.ochre} strokeWidth="4"/></g></>;
 if(id==='home'){
  const q=p(.05,.75);return <Camera z={p(0,1,1.15,1)} x={p(0,1,460,540)}>
   <rect x="0" y="640" width="1080" height="760" fill={C.memory}/><Room memory f={f}/>
   <Person x={770} y={1360} s={2.15} dad mood="annoyed" gaze={-4} lean={p(.1,.4,-4,0)} lh={[-65,-150]} rh={[43,-98]}/>
   <Person x={400} y={1360} s={1.30} child mood="hurt" gaze={p(.1,.6,4,-2)} tilt={-4} shirt="#C18B62" lh={[-26,-105]} rh={[25,-104]}/>
   <path d="M135 670v695M945 670v695M135 670h810" fill="none" stroke="#BBA582" strokeWidth="18"/>
   <g transform={`translate(${-340*q} 0)`}><rect x="115" y="655" width="330" height="710" fill={C.paper}/><path d="M440 655v710" stroke={C.line} strokeWidth="7"/></g>
  </Camera>;
 }
 if(id==='martabak'){
  const q=p(.32,.65);return <>
   <g opacity={t<.39?1:0}><Room memory night f={f}/><Person x={760} y={1360} s={2.1} dad mood="annoyed" gaze={-4} lh={[-70,-158]} talk={.5+Math.sin(f*.25)*.3}/><Person x={325} y={1360} s={1.28} child mood="hurt" gaze={2} shirt="#C18B62"/><path d={`M610 875l-25-18m8 50l-30-3m46 34l-22 16`} stroke={C.wine} strokeWidth="4" opacity={1-p(.22,.4)}/></g>
   <g opacity={t>=.39?1:0}><rect x="86" y="720" width="908" height="680" rx="45" fill="#D9B78E"/><path d="M120 1330h840" stroke="#C9A37C" strokeWidth="3"/><g transform={`translate(540 ${p(.35,.65,980,1090)}) scale(1.22) rotate(${p(.4,.9,-6,0)})`}><Box x={0} y={0} s={1.75} top/><path d={`M-60-195q60-35 120 0`} fill="none" stroke={C.cream} strokeWidth="3" opacity={q}/></g><g><path d={`M505 720h70v${p(.35,.65,61,171)}q-35 23-70 0Z`} fill="#5B665A"/><path d={`M505 ${p(.35,.65,781,891)}q35 18 70 0v45q-36 24-70 0Z`} fill={C.skin}/></g></g>
  </>;
 }
 if(id==='peace'){
  const q=p(.15,.65);return <Camera z={p(0,1,1.13,1)} x={p(0,1,600,540)}><Room memory f={f}/><Person x={760} y={1360} s={2.10} dad mood="soft" gaze={-3} lh={[-54,-106]} tilt={p(.15,.7,0,3)}/><Person x={330} y={1360} s={1.28} child mood={q>.65?'soft':'hurt'} gaze={3} rh={[35+q*70,-100-q*55]} shirt="#C18B62"/><Table y={1200} w={470}/><Box x={550} y={1164} open={.8} s={1.1}/><path d={`M${p(.35,.8,440,470)} 1000q40-34 81 0`} fill="none" stroke={C.ochre} strokeWidth="3" opacity={Math.sin(q*Math.PI)*.65}/></Camera>;
 }
 if(id==='understand'){
  const q=p(.03,.22),reach=p(.35,.8);return <Camera z={p(0,1,1.02,1.12)} x={p(0,1,540,505)}>
   <Room f={f}/><g opacity={(1-q)*.7}><Person x={750} y={1360} s={2.1} dad mood="soft" gaze={-3} lh={[-54,-106]}/><Person x={330} y={1360} s={1.28} child mood="soft" gaze={3} shirt="#C18B62"/></g>
   <g opacity={q}><Person x={750} y={1360} s={1.98} mood="soft" gaze={-3} lh={[-65,-98]}/><Person x={330} y={1360} s={1.95} female mood={reach>.4?'soft':'unsure'} gaze={3} tilt={p(.2,.8,-4,3)} lh={[-42,-101]} rh={[45,-90-reach*58]}/></g><Table y={1230} w={510}/><Box x={555} y={1189} s={1.1} open={.5}/>
   <g opacity={p(.65,.8)}><Sans x="540" y="700" textAnchor="middle" fontSize="23" letterSpacing="4" fill={C.wine}>CARA YANG DIA KENAL</Sans><path d={`M370 730h${340*p(.65,.9)}`} stroke={C.ochre} strokeWidth="2"/></g>
  </Camera>;
 }
 if(id==='again'){
  const q=p(.08,.58),hand=p(.6,.9);return <Camera z={p(0,.5,1,1.08)-p(.7,1,0,.03)} x={p(0,1,560,520)}><Room f={f}/><Person x={870-q*130} y={1360} s={1.98} mood="unsure" gaze={-3} lh={[-65,-88]} lean={-q*2} step={Math.sin(f*.16)*(1-q)*.6}/><Person x={325} y={1360} s={1.95} female mood={hand>.5?'soft':'hurt'} gaze={3} rh={[40+hand*12,-96-hand*48]} lh={[-42,-100]} tilt={hand*3}/><Table y={1230} w={500}/><Box x={740-q*130} y={1172} open={q*.3} s={1.05}/>{cup(425,1200,f)}<g opacity={1-p(.5,.85)}><Sans x="565" y="735" textAnchor="middle" fontSize="28" fill={C.wine}>Kebiasaan yang sama.</Sans></g></Camera>;
 }
 if(id==='thanks'){
  const q=p(.1,.7);return <Camera z={p(0,1,1.04,1.11)} x={p(0,1,520,540)}><Room f={f}/><Person x={325} y={1360} s={1.95} female mood="warm" gaze={3} rh={[45+q*25,-109-q*30]} lh={[-20,-152]} lean={q*2} talk={t>.2&&t<.83?.2+Math.abs(Math.sin(f*.18))*.3:0}/><Person x={750} y={1360} s={1.98} mood={q>.6?'soft':'unsure'} gaze={-4} tilt={p(.4,.8,0,-4)} lh={[-43,-107]} rh={[33,-98]}/><Table y={1230} w={500}/><Box x={585} y={1186} open={.7} s={1.05}/><path d={`M420 720q${120*q}-45 ${240*q} 0`} stroke={C.ochre} strokeWidth="3" fill="none" opacity={q}/><Sans x="540" y="700" textAnchor="middle" fontSize="25" letterSpacing="3" opacity={q} fill={C.wine}>AKU MENGENALI USAHAMU.</Sans></Camera>;
 }
 if(id==='learn'){
  const q=p(.08,.7),draw=p(.45,.9);return <Camera z={p(0,1,1.10,1.02)}><Room f={f}/><Person x={330} y={1360} s={1.95} female mood="warm" gaze={3} tilt={2} rh={[45,-110]}/><Person x={750} y={1360} s={1.98} mood={q>.65?'soft':'unsure'} gaze={-4} lh={[-22,-158]} rh={[42,-105]} tilt={p(.1,.65,5,-3)}/><Table y={1230} w={500}/><Box x={585} y={1187} s={1.05} open={.7}/><g opacity={q} transform={`translate(730 ${720+14*(1-q)})`}><Serif textAnchor="middle" fontSize="67" fontStyle="italic" fill={C.wine} opacity={.35+.65*draw}>maaf</Serif><path d={`M-85 18h${170*draw}`} stroke={C.ochre} strokeWidth="5" strokeLinecap="round"/><Sans textAnchor="middle" y="65" fontSize="19" letterSpacing="3" fill={C.wine}>MULAI BELAJAR</Sans></g></Camera>;
 }
 if(id==='growth'){
  const q=p(.05,.8);return <Camera z={p(0,1,1.10,.88)}><circle cx="540" cy="1090" r={370+q*35} fill={C.pale}/><path d="M120 1375h840" stroke={C.line} strokeWidth="3"/><Person x={365} y={1360} s={1.95} female mood="warm" gaze={3} rh={[58,-114]} tilt={3}/><Person x={710} y={1360} s={1.98} mood="soft" gaze={-4} lh={[-58,-115]} tilt={-3}/><g opacity={q}><path d="M520 890v300" stroke={C.sage} strokeWidth="2" strokeDasharray="3 14"/><Serif x="540" y="740" textAnchor="middle" fontSize="42" fontStyle="italic" fill={C.wine}>pelan-pelan, bersama.</Serif></g></Camera>;
 }
 return null;
}
function Outro({f}:{f:number}){
 const p=out(f,0,30),line=out(f,24,36),social=out(f,40,62);
 return <AbsoluteFill style={{background:C.ink,color:C.cream}}><svg width="1080" height="1920" viewBox="0 0 1080 1920"><path d={`M90 ${940-220*p}H990M90 ${980+220*p}H990`} stroke="#91A18E" strokeWidth="1" opacity=".5"/><g transform={`translate(540 ${910+30*(1-p)})`} opacity={p}><Serif textAnchor="middle" fontSize="106" fill={C.cream} letterSpacing="-5">less.certain</Serif><path d={`M-257 34q${257*line} 8 ${514*line} -3`} stroke={C.ochre} strokeWidth="7" fill="none" strokeLinecap="round"/><Sans y="116" textAnchor="middle" fontSize="23" letterSpacing="4" fill="#D7DCCF">MEMAHAMI. LALU BERTUMBUH.</Sans></g><g opacity={social} transform={`translate(0 ${18*(1-social)})`}><Sans x="540" y="1368" textAnchor="middle" fontSize="28" fill={C.cream}>TikTok  @less.certain</Sans><Sans x="540" y="1422" textAnchor="middle" fontSize="28" fill={C.cream}>Instagram  @less.certain</Sans></g></svg></AbsoluteFill>
}
export const FilmV7:React.FC=()=>{
 const frame=useCurrentFrame(),shot=getShot(frame),f=frame-Math.round(shot.start*30),n=Math.round((shot.end-shot.start)*30),sec=frame/30;
 const brand=seg('brand').start,ending=sec>=brand;
 const cue=timing.indonesianCaptions.find(c=>sec>=c.start&&sec<c.end);
 const memory=['home','martabak','peace'].includes(shot.id);
 return <AbsoluteFill style={{background:memory?C.memory:C.paper}}>
  {!ending?<>
   <svg width="1080" height="1920" viewBox="0 0 1080 1920">
    <defs><pattern id="paper-v7" width="23" height="29" patternUnits="userSpaceOnUse"><circle cx="3" cy="8" r=".6" fill={C.ink} opacity=".10"/><circle cx="17" cy="23" r=".5" fill={C.wood} opacity=".14"/></pattern></defs>
    <rect width="1080" height="1920" fill="url(#paper-v7)"/>
    <Title shot={shot} f={f}/><Scene id={shot.id} f={f} n={n}/>
   </svg>
   <Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:87,top:76,width:138,height:50,objectFit:'contain'}}/>
   {cue&&<div style={{position:'absolute',left:110,width:860,top:1570,minHeight:132,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:'Lato',fontWeight:700,fontSize:38,lineHeight:1.42,color:C.ink,whiteSpace:'pre-line'}}>{cue.text}</div>}
  </>:<Outro f={frame-Math.round(brand*30)}/>}
  <Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile(timing.narrationFile)}/></Sequence>
 </AbsoluteFill>;
};
