import React from 'react';
import {AbsoluteFill,Audio,Img,Sequence,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import timing from './timing.json';
const P={paper:'#F4EFE5',ink:'#263D36',pale:'#DDE2D1',sage:'#91A087',rose:'#E8C5B8',wine:'#793F4D',clay:'#C67D65',night:'#213B3A',white:'#FFFCF5',muted:'#738073'};
const E=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.65,0,.2,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const O=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],{easing:Easing.bezier(.16,1,.3,1),extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const H='M0 45C-25 17-100-28-100-88C-100-148-28-163 0-112C28-163 100-148 100-88C100-28 25 17 0 45Z';
type Point=[number,number];
const Heart=({x,y,s=1,color=P.wine}:{x:number;y:number;s?:number;color?:string})=><path d={H} transform={`translate(${x} ${y}) scale(${s})`} fill={color}/>;
const Human=({x,y,s=1,f=0,woman=false,left=[-55,-62],right=[55,-62],lean=0,look=0,concern=false,walk=0,mood="neutral",nod=0,seated=false}:{x:number;y:number;s?:number;f?:number;woman?:boolean;left?:Point;right?:Point;lean?:number;look?:number;concern?:boolean;walk?:number;mood?:"neutral"|"warm"|"firm"|"worried";nod?:number;seated?:boolean})=>{
 const shirt=woman?P.clay:P.sage;const gait=Math.sin(f*.20)*walk;const worried=concern||mood==='worried';
 return <g transform={`translate(${x} ${y}) scale(${s})`}>
  <ellipse cy="7" rx="65" ry="9" fill="#000" opacity=".08"/>{seated&&<g><rect x="-64" y="-176" width="128" height="112" rx="13" fill={P.pale}/><path d="M-58-64V2M58-64V2" stroke={P.sage} strokeWidth="8"/></g>}
  <path d={seated?"M-23-67-49-49-48 0M23-67 49-49 48 0":`M-23-67Q${-27-gait*18}-27 ${-27+gait*22} 0M23-67Q${27+gait*18}-27 ${27-gait*22} 0`} fill="none" stroke={P.ink} strokeWidth="24" strokeLinecap="round"/>
  <path d={seated?"M-60 2h28M36 2h28":`M${-39+gait*22} 2h26M${15-gait*22} 2h26`} stroke={P.ink} strokeWidth="11" strokeLinecap="round"/>
  <g transform={`rotate(${lean} 0 -85)`}>
   <path d="M-39-150Q0-172 39-150L48-64Q0-49-48-64Z" fill={shirt}/><path d="M-12-170v24h24v-24" fill={P.rose}/>
   {([[-38,-143,left],[38,-143,right]] as [number,number,Point][]).map(([sx,sy,hand],i)=><g key={i}><path d={`M${sx} ${sy}Q${sx+(hand[0]-sx)*.25+(i?-13:13)} ${Math.max(hand[1],sy)+45} ${hand[0]} ${hand[1]}`} fill="none" stroke={shirt} strokeWidth="22" strokeLinecap="round"/><circle cx={hand[0]} cy={hand[1]} r="10" fill={P.rose}/></g>)}
   <g transform={`rotate(${look*1.8+nod} 0 -202)`}>
    {woman&&<><circle cx="-30" cy="-219" r="19" fill={P.ink}/><path d="M-34-194q-9-66 33-66q49 0 36 66l-3 28h-65Z" fill={P.ink}/></>}
    <ellipse cy="-207" rx="33" ry="40" fill={P.rose}/>
    <path d={woman?'M-33-214q-5-50 32-48q40 1 35 47q-24-2-36-24q-6 20-31 25':'M-33-216q-4-42 32-43q39 1 34 41L17-235q-26 16-50 19'} fill={P.ink}/>
    <path d={`M${-13+look}-209v3M${12+look}-209v3`} stroke={P.ink} strokeWidth="3.5" strokeLinecap="round"/>
    <path d={worried?'M-20-221l11 4m16 0 12-4':'M-20-219h11m18 0h11'} stroke={P.ink} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d={worried?'M-9-188q9-5 18 0':mood==='warm'?'M-9-190q9 6 18 0':'M-8-189h16'} stroke={P.wine} strokeWidth="2" fill="none" strokeLinecap="round"/>
   </g>
  </g>
 </g>;
};
const Phone=({x,y,s=1,angle=0,alert=false}:{x:number;y:number;s?:number;angle?:number;alert?:boolean})=><g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}><rect x="-65" y="-116" width="130" height="232" rx="22" fill={P.ink}/><rect x="-57" y="-107" width="114" height="213" rx="16" fill={P.white}/><rect x="-24" y="-101" width="48" height="9" rx="4.5" fill={P.ink}/><path d="M-34-57H34M-34-32H20" stroke={P.pale} strokeWidth="7" strokeLinecap="round"/><circle cy="35" r="31" fill={alert?P.rose:P.pale}/>{alert?<path d="M0 18v26m0 9v1" stroke={P.wine} strokeWidth="5" strokeLinecap="round"/>:<path d="M-20 20h40v27H4l-9 9v-9h-15Z" stroke={P.ink} strokeWidth="3.5" strokeLinejoin="round" fill="none"/>}</g>;
const Bubble=({x,y,w=400,text,f,at=0}:{x:number;y:number;w?:number;text:string;f:number;at?:number})=>{const p=O(f,at,at+22);return <g opacity={p} transform={`translate(${x} ${y+24*(1-p)}) scale(${.96+.04*p})`}><path d={`M0 0h${w}q24 0 24 24v70q0 24-24 24H${w*.4}l-32 30v-30H0q-24 0-24-24V24Q-24 0 0 0Z`} fill={P.white}/><text x={w/2} y="71" textAnchor="middle" fontFamily="Playfair" fontStyle="italic" fontSize="36" fill={P.wine}>{text}</text></g>};
const Floor=({dark=false}:{dark?:boolean})=><><path d="M-150 1250 540 1070l690 180-690 245Z" fill={dark?'#395451':P.pale} opacity=".45"/><path d="m-150 1250 690-180 690 180" fill="none" stroke={dark?'#58716B':'#CED4C4'} strokeWidth="2"/></>;
const Words=({f,lines,x=90,y=325,size=104,dark=false}:{f:number;lines:string[];x?:number;y?:number;size?:number;dark?:boolean})=><g>{lines.map((l,i)=><g key={i} opacity={O(f,i*7,i*7+21)} transform={`translate(0 ${O(f,i*7,i*7+25,40,0)})`}><text x={x} y={y+i*size*1.12} fontFamily="Playfair" fontSize={size} letterSpacing="-2.5" fontStyle={i===lines.length-1?'italic':'normal'} fill={i===lines.length-1?(dark?P.rose:P.wine):(dark?P.white:P.ink)}>{l}</text></g>)}</g>;

const Bedroom=({f}:{f:number})=>{
 const pickup=E(f,27,92);const insert=E(f,133,157);const close=E(f,83,145,1,1.8);const focusX=E(f,83,145,540,632);const focusY=E(f,83,145,1010,1045);
 return <>
  <g opacity={1-insert} transform={`translate(540 1010) scale(${close}) translate(${-focusX} ${-focusY})`}>
   <rect x="-100" y="550" width="1300" height="970" fill="#294644"/><Floor dark/>
   <path d="M124 680h230v360H124Z" fill="#172D32"/><path d="M240 720a58 58 0 1 0 51 88q-61 6-51-88" fill="#D7D6AF"/>
   <path d="M110 1108q0-35 40-35h424q38 0 38 35v137H110Z" fill={P.white}/>
   <path d="M110 1238h511v44H110Zm22 44v60m466-60v60" stroke="#7E9587" strokeWidth="13"/>
   <ellipse cx="211" cy="1100" rx="72" ry="38" fill="#E1D8C6"/><ellipse cx="222" cy="1083" rx="39" ry="33" fill={P.rose}/><path d="M183 1084q-5-50 42-42q41 8 35 42q-37-25-77 0" fill={P.ink}/><path d="m217 1082 15 3" stroke={P.ink} strokeWidth="3"/>
   <path d="M276 1085q194-66 309 31v111H276Z" fill="#B77D6C"/><path d="M302 1162q139-30 267 3" stroke="#A36B5D" strokeWidth="4" fill="none"/>
   <path d="M713 1250h196m-166 0v98m138-98v98" stroke="#172D32" strokeWidth="13"/>
   <Human x={760} y={1330} s={1.45} f={f} concern look={-3} lean={E(f,13,48,0,-8)+E(f,75,103,0,8)} left={[E(f,27,92,-55,-91),E(f,27,92,-62,-122)]}/>
   <Phone x={E(f,27,92,815,630)} y={E(f,27,92,1220,1050)} s={.62} angle={E(f,27,92,-84,-10)} alert/>
   <path d="m608 1074-15-65 78 10Z" fill="#FFF3C1" opacity={pickup*.25}/>
  </g>
  <g opacity={insert} transform={`translate(540 1010) rotate(${O(f,133,184,-20,-10)}) scale(${O(f,133,186,3.6,2.65)})`}>
   <path d="M-145 240-110 98q-2-29 23-39l20-19 19 27-17 51-7 133Z" fill={P.rose}/><path d="M-165 250-120 135l69 19-7 126Z" fill={P.clay}/><path d="M48 92q77-6 88 152H34Z" fill={P.sage}/><Phone x={0} y={0} s={1}/><circle cy="35" r="30" fill={P.pale}/><path d="M-25 35Q0 7 25 35Q0 63-25 35Z" stroke={P.ink} strokeWidth="3" fill="none"/><circle cy="35" r="8" fill={P.ink}/>
   <path d="M45 93q-44-59-22-66q15-3 38 26" stroke={P.rose} strokeWidth="17" fill="none" strokeLinecap="round"/>
  </g>
 </>;
};

const Pair=({f,mode}:{f:number;mode:string})=>{
 const enter=O(f,0,43);const reassure=mode==='reassurance';const empathy=mode==='empathy';const zoom=mode==='insecurity'?E(f,0,94,1.55,1):empathy?E(f,0,115,1.32,.93):E(f,0,105,1.15,1);
 const ax=mode==='insecurity'?O(f,20,88,160,410):410;const bx=670;const reach=reassure?E(f,20,67):empathy?.7:E(f,53,100,0,.8);
 return <g transform={`translate(540 1080) scale(${zoom}) rotate(${E(f,0,90,-3,0)}) translate(-540 -1080)`}>
  <Floor/>
  <path d="M130 1320v-200q0-33 33-33h49v233" fill={P.pale}/><path d="M150 1085v-150m0 46q-52-15-48-54q54 4 48 54m0-11q58-23 47-68q-54 16-47 68" fill={P.sage} stroke={P.sage} strokeWidth="4"/>
  <Human x={ax} y={1290} s={1.5} f={f} woman look={2} right={[55+reach*70,-62-reach*97]} walk={(1-enter)*.7}/>
  <Human x={bx} y={1290} s={1.5} f={f} look={-2} concern={mode==='insecurity'} left={reassure?[-23,-135]:[-68,-85]}/>
  {mode==='insecurity'&&<g opacity={1-E(f,90,140)} transform={`translate(670 ${780+O(f,0,45,45,0)})`}><path d="M-110 33q-27-68 29-88q33-56 88-29q61-14 82 32q58 42 9 85Z" fill={P.wine}/><text y="21" textAnchor="middle" fontFamily="Playfair" fontSize="92" fill={P.rose}>?</text><path d="m-21 64 16 29-20 13 17 24" stroke={P.clay} strokeWidth="6" fill="none"/></g>}
  <g opacity={O(f,reassure?13:63,reassure?48:103)} transform={`translate(540 ${O(f,45,110,1080,865)}) scale(${O(f,45,110,.5,.85)})`}><path d={H} fill={P.wine}/></g>
  {reassure&&<Bubble x={257} y={668} w={520} text="Aku memilih kamu." f={f} at={25}/>}
  {empathy&&<path d="M220 1330Q540 1400 865 1330" stroke={P.wine} strokeWidth="5" fill="none" strokeDasharray="670" strokeDashoffset={670*(1-E(f,49,110))}/>}
 </g>;
};

const Repeats=({f,pattern=false}:{f:number;pattern?:boolean})=>{
 const z=pattern?E(f,0,62,1.9,.84):E(f,0,105,2.5,.88);const angle=E(f,0,105,-9,4);
 return <g transform={`translate(540 1010) scale(${z}) rotate(${angle}) translate(-540 -1010)`}>
  {[-1,0,1].flatMap((row)=>[-1,0,1].map((col)=>{const i=(row+1)*3+col+1;const p=pattern?1:O(f,Math.max(0,i-4)*11,Math.max(0,i-4)*11+35);return <g key={i} opacity={p} transform={`translate(${col*390} ${row*370+(1-p)*50})`}>
   <rect x="365" y="837" width="350" height="315" rx="26" fill={i===4?P.rose:P.pale} opacity=".7"/>
   <Human x={452} y={1105} s={.76} woman f={f} look={2}/><Human x={625} y={1105} s={.76} f={f} look={-2} concern left={[-75,-120]}/><Phone x={567} y={1005} s={.28} angle={-12} alert/>
   <text x="683" y="889" textAnchor="end" fill={P.wine} fontFamily="Lato" fontSize="23">{i+1}</text>
  </g>}))}
 </g>;
};

const Boundary=({f,step=false}:{f:number;step?:boolean})=>{
 const reveal=E(f,17,62);const stop=E(f,36,72,0,1);return <g transform={`translate(540 1070) scale(${E(f,0,110,1.18,.96)}) translate(-540 -1070)`}>
  <path d="M0 700H540V1400H0Z" fill={P.pale}/><path d="M540 700H1080V1400H540Z" fill={P.rose}/>
  <Floor/>
  <Human x={290} y={1300} s={1.42} woman f={f} look={2} right={[O(f,25,67,55,105),O(f,25,67,-62,-145)]}/>
  <Human x={803} y={1300} s={1.42} f={f} look={-2} left={[-95,-120]}/>
  <Phone x={E(f,5,61,660,570)+Math.sin(stop*Math.PI)*-22} y={1080} s={.57} angle={E(f,8,65,-19,0)} alert/>
  <path d="M540 1360V780" stroke={P.wine} strokeWidth="9" strokeDasharray="580" strokeDashoffset={580*(1-reveal)}/>
  <path d="M528 917h24m-24 93h24m-24 93h24m-24 93h24" stroke={P.wine} strokeWidth="5" opacity={reveal}/>
  {step?<Bubble x={95} y={722} w={414} text="Ini batasanku." f={f} at={25}/>:<><text x="276" y="769" textAnchor="middle" fontFamily="Lato" fontSize="27" fill={P.ink}>PAHAMI RASA</text><text x="804" y="769" textAnchor="middle" fontFamily="Lato" fontSize="27" fill={P.wine}>BATASI TINDAKAN</text></>}
 </g>;
};
const Repair=({f,walk=false}:{f:number;walk?:boolean})=>{
 const pass=E(f,29,92);const move=walk?E(f,40,110):0;return <g transform={`translate(540 1080) scale(${E(f,0,125,1.28,.91)}) translate(-540 -1080)`}>
  <Floor/>
  <path d="M210 1320Q540 1240 902 1320" stroke={P.sage} strokeWidth="14" fill="none" strokeDasharray="700" strokeDashoffset={700*(1-E(f,62,125))}/>
  <Human x={390+move*100} y={1290} s={1.45} woman f={f} look={2} right={[55+pass*42,-62-pass*70]} walk={walk?Math.sin(move*Math.PI)*.8:0}/>
  <Human x={715+move*90} y={1290} s={1.45} f={f} look={-2} left={[-55-pass*48,-62-pass*65]} walk={walk?Math.sin(move*Math.PI)*.8:0}/>
  <g opacity={1-E(f,105,132)}><Phone x={E(f,29,92,634,534)} y={E(f,29,92,1100,1122)} s={.48} angle={E(f,29,92,-15,8)}/></g>
  {['akui','perbaiki','ubah'].map((text,i)=><g key={text} opacity={O(f,45+i*19,64+i*19)} transform={`translate(0 ${O(f,45+i*19,67+i*19,20,0)})`}><text x={250+i*290} y="825" textAnchor="middle" fontFamily="Playfair" fontStyle="italic" fontSize="46" fill={P.wine}>{text}.</text></g>)}
 </g>;
};
const Garden=({f}:{f:number})=>{
 const pour=E(f,20,63);const grow=E(f,53,145);return <g transform={`translate(540 1100) scale(${E(f,0,160,1.4,.86)}) translate(-540 -1100)`}>
  <Floor/>
  <Human x={270} y={1310} s={1.4} woman f={f} look={3} lean={pour*10} right={[55+pour*58,-62-pour*75]}/>
  <Human x={842} y={1310} s={1.4} f={f} look={-3} left={[-62,-75]}/>
  <g transform={`translate(430 1084) rotate(${pour*24})`}><path d="M-39-22h75v55h-75Z" fill={P.sage}/><path d="M36-8h35l-10 17H36m-75-14q-34-26-32 13q0 25 32 18" fill="none" stroke={P.sage} strokeWidth="9"/></g>
  {[0,1,2].map(i=><path key={i} d={`M${481+i*7} ${1120+i*14}l10 25`} stroke={P.sage} strokeWidth="3" strokeLinecap="round" opacity={Math.sin(pour*Math.PI)*.7}/>)}
  <path d="M540 1280V932" stroke={P.ink} strokeWidth="9" strokeLinecap="round" strokeDasharray="348" strokeDashoffset={348*(1-grow)}/>
  {[0,1,2].map(i=>{const p=O(f,61+i*25,91+i*25);return <g key={i} transform={`translate(540 ${1210-i*97}) scale(${p})`}><path d="M0 0q-110-3-111-94q85-4 111 94" fill={P.sage}/><path d="M0-13q110-3 111-103q-85-4-111 103" fill={P.ink}/></g>})}
  <path d="M455 1280h170l-23 82H478Z" fill={P.rose}/><path d="M447 1280h186" stroke={P.wine} strokeWidth="8" strokeLinecap="round"/>
 </g>;
};

const Frame=({segment,index}:{segment:typeof timing.segments[number];index:number})=>{
 const f=useCurrentFrame();const id=segment.id;const dark=id==='phone'||id==='repeat';const dur=(segment.end-segment.start)*30;
 const enter=O(f,0,15);const exit=E(f,dur-14,dur);
 let art:React.ReactNode;let heading:string[]=[];
 if(id==='hook'){
  const zoom=E(f,0,100,1.62,1);art=<g transform={`translate(540 1040) scale(${zoom}) translate(-540 -1040)`}><Floor/><Human x={350} y={1280} s={1.6} woman f={f} look={2} right={[75,-115]}/><Human x={737} y={1280} s={1.6} f={f} look={-2} concern left={[-75,-115]}/><Heart x={540} y={943} s={E(f,0,70,.68,1.05)}/><path d="M540 1340V1070" stroke={P.wine} strokeWidth="6" strokeDasharray="270" strokeDashoffset={270*(1-E(f,61,112))}/></g>;heading=['Paham.','Bukan pasrah.'];
 }else if(id==='phone'){art=<Bedroom f={f}/>;heading=['Saat dia tidur,','HP-nya diperiksa.'];}
 else if(['insecurity','reassurance','empathy'].includes(id)){art=<Pair f={f} mode={id}/>;heading=id==='insecurity'?['Ada rasa','tidak aman.']:id==='reassurance'?['Mencoba','meyakinkan.']:['Itu bisa','menjadi empati.'];}
 else if(id==='repeat'){art=<Repeats f={f}/>;heading=['Tapi, bila','terus berulang?'];}
 else if(id==='distinction'){art=<Boundary f={f}/>;heading=['Memahami rasa.','Membatasi tindakan.'];}
 else if(id==='mistake'||id==='pattern'){art=<Repeats f={id==='pattern'?f+45:f} pattern/>;heading=id==='mistake'?['Bukan sekadar','satu kesalahan.']:['Sebuah pola.'];}
 else if(id==='accountability'||id==='step3'){art=<Repair f={f} walk={id==='step3'}/>;heading=id==='step3'?['Tanggung jawab.','Dan perubahan.']:['Perlu lebih dari','pengertian.'];}
 else if(id==='step1'){art=<Pair f={f+25} mode="empathy"/>;heading=['Pahami','perasaannya.'];}
 else if(id==='step2'){art=<Boundary f={f} step/>;heading=['Sampaikan','batasanmu.'];}
 else{art=<Garden f={f}/>;heading=['Empati membantu','seseorang tumbuh.'];}
 const typographic=id==='pattern';const shift=id==='pattern'?E(f,0,40,45,0):0;
 return <AbsoluteFill style={{background:dark?(id==='phone'?P.night:P.wine):P.paper,overflow:'hidden',opacity:enter}}>
  <svg width="1080" height="1920" style={{position:'absolute'}}>
   <defs><clipPath id={'stage'+index}><rect x="-300" y="570" width="1680" height="885"/></clipPath></defs>
   <g clipPath={`url(#stage${index})`}><g transform={`translate(${id==='repeat'?exit*-180:0} ${shift})`}>
    {art}
   </g></g>
   <g opacity={id==='phone'?E(f,126,152,1,0):1}><Words f={f} lines={heading} size={typographic?145:Math.max(...heading.map(t=>t.length))>18?83:100} x={85} y={id==='pattern'?488:332} dark={dark}/></g>
   {id==='distinction'&&<path d="M86 523H946" stroke={P.wine} strokeWidth="3" strokeDasharray="860" strokeDashoffset={860*(1-E(f,15,65))}/>}
  </svg>
  {index>0&&<div style={{position:'absolute',inset:0,background:dark?P.paper:P.wine,transform:`translateX(${O(f,0,12,0,110)}%)`,opacity:1-enter}}/>}
 </AbsoluteFill>;
};

const Caption=()=>{
 const f=useCurrentFrame();const t=f/30;const c=timing.indonesianCaptions.find(c=>t>=c.start&&t<c.end+.04);const s=timing.segments.find(s=>t>=s.start&&t<s.end);if(!c||!s)return null;
 const dark=['phone','repeat'].includes(s.id);return <div style={{position:'absolute',left:'50%',transform:'translateX(-50%)',top:1502,width:840,minHeight:140,display:'flex',justifyContent:'center',alignItems:'flex-start',textAlign:'center',fontFamily:'Lato',fontSize:43,fontWeight:700,lineHeight:1.42,color:dark?P.white:P.ink}}><span style={{display:'inline-block',maxWidth:840,textWrap:'balance'}}>{c.text}</span></div>;
};
const Outro=()=>{
 const f=useCurrentFrame();const travel=E(f,0,38);const x=839+(433-839)*travel;const y=178+(957-178)*travel-Math.sin(travel*Math.PI)*170;const reveal=E(f,29,71);const handles=O(f,64,86);
 return <AbsoluteFill style={{background:P.paper,overflow:'hidden'}}>
  <svg width="1080" height="1920"><path d="M839 178Q370-80 433 957" stroke={P.rose} strokeWidth="2" strokeDasharray="1070" strokeDashoffset={1070*(1-travel)} opacity={1-E(f,45,70)}/><circle cx={x} cy={y} r={E(f,0,38,10,24)} fill={P.wine} opacity={1-E(f,61,72)}/><path d="M130 1115H950" stroke={P.wine} strokeWidth="2" strokeDasharray="820" strokeDashoffset={820*(1-E(f,53,83))}/></svg>
  <div style={{position:'absolute',left:130,top:790,width:820,height:274,clipPath:`inset(0 ${100*(1-reveal)}% 0 0)`,transform:`translateY(${O(f,29,64,13,0)}px)`}}><Img src={staticFile('less-certain-logo.png')} style={{width:820,height:274,objectFit:'contain'}}/></div>
  <div style={{position:'absolute',left:0,top:1165,width:1080,textAlign:'center',fontFamily:'Lato',fontSize:26,letterSpacing:4,color:P.muted,opacity:handles,transform:`translateY(${18*(1-handles)}px)`}}>TIKTOK <span style={{padding:'0 18px'}}>·</span> INSTAGRAM</div>
  <div style={{position:'absolute',left:0,top:1220,width:1080,textAlign:'center',fontFamily:'Lato',fontSize:38,color:P.ink,opacity:O(f,72,95),transform:`translateY(${O(f,72,95,15,0)}px)`}}>@less.certain</div>
 </AbsoluteFill>;
};

export const DirectedFilm=()=>{
 const f=useCurrentFrame();const storyFrames=Math.ceil(timing.duration*30);const outro=126;const s=timing.segments.find(s=>f/30>=s.start&&f/30<s.end);const dark=s&&['phone','repeat'].includes(s.id);
 return <AbsoluteFill style={{background:P.paper,fontFamily:'Lato'}}>
  {timing.segments.map((s,i)=><Sequence key={s.id} from={Math.round(s.start*30)} durationInFrames={Math.round(s.end*30)-Math.round(s.start*30)} premountFor={12}><Frame segment={s} index={i}/></Sequence>)}
  <Caption/>
  {f<storyFrames&&<Img src={staticFile('less-certain-logo.png')} style={{position:'absolute',right:85,top:128,width:248,height:83,objectFit:'contain',filter:dark?'brightness(0) invert(1)':undefined}}/>}
  <Sequence from={storyFrames} durationInFrames={outro}><Outro/></Sequence>
  <Sequence from={storyFrames} durationInFrames={outro}><Audio src={staticFile('brand-sting.wav')} volume={.75}/></Sequence>
  <Sequence from={Math.round(timing.audioLead*30)}><Audio src={staticFile('narration.mp3')}/></Sequence>
  <Audio src={staticFile('ambience.wav')} loop volume={frame=>.25*E(frame,storyFrames+outro-70,storyFrames+outro,1,0)}/>
 </AbsoluteFill>;
};

export {Human,Phone,Bubble,Floor,P};
