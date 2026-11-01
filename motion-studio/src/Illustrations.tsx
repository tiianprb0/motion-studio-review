import React from 'react';
import {spring,interpolate} from 'remotion';
const C={paper:'#F4EFE5',ink:'#263D36',muted:'#6D776D',sage:'#9AA58B',pale:'#DDE2D1',rose:'#E8C5B8',coral:'#C9755B',wine:'#793F4D',white:'#FFFCF5',line:'#D7D4C6',night:'#3D514C'};
const ease=(f:number,start=0,length=20)=>spring({frame:f-start,fps:30,config:{damping:19,stiffness:115,mass:0.85},durationInFrames:length});

const Heart:React.FC<{x?:number;y?:number;size?:number;fill?:string;stroke?:string}>=({x=0,y=0,size=100,fill=C.coral,stroke='none'})=><g transform={`translate(${x} ${y}) scale(${size/100})`}><path d="M50 89C43 82 8 60 8 33C8 9 37 4 50 24C63 4 92 9 92 33C92 60 57 82 50 89Z" fill={fill} stroke={stroke} strokeWidth="3"/></g>;
const Phone:React.FC<{x?:number;y?:number;scale?:number;angle?:number;alert?:boolean}>=({x=0,y=0,scale=1,angle=0,alert=false})=><g transform={`translate(${x} ${y}) rotate(${angle} 65 114) scale(${scale})`}><rect width="130" height="228" rx="23" fill={C.ink}/><rect x="9" y="11" width="112" height="207" rx="16" fill={C.white}/><rect x="44" y="15" width="43" height="9" rx="4.5" fill={C.ink}/><path d="M38 77H92M38 96H80M38 115H86" stroke={C.line} strokeWidth="8" strokeLinecap="round"/><circle cx="65" cy="166" r="23" fill={alert?C.rose:C.pale}/>{alert?<path d="M65 153v17m0 9v1" stroke={C.wine} strokeWidth="6" strokeLinecap="round"/>:<path d="m53 167 9 9 17-19" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round"/>}</g>;
const Star=({x,y,size=20,color=C.coral}:{x:number;y:number;size?:number;color?:string})=><path d={`M${x} ${y-size} Q${x} ${y} ${x+size} ${y} Q${x} ${y} ${x} ${y+size} Q${x} ${y} ${x-size} ${y} Q${x} ${y} ${x} ${y-size}`} fill={color}/>;
const Person:React.FC<{x:number;y:number;scale?:number;female?:boolean;shirt?:string;pose?:'neutral'|'open'|'hold'}>=({x,y,scale=1,female=false,shirt=C.sage,pose='neutral'})=><g transform={`translate(${x} ${y}) scale(${scale})`}>
  {female&&<path d="M-52 23Q-70-61-8-77Q65-81 66 27L49 101H-46Z" fill={C.ink}/>}
  <path d="M-37 296l-3 102M38 296l20 102" stroke={C.ink} strokeWidth="34" strokeLinecap="round"/>
  <path d="M-61 402H-25M40 402h38" stroke={C.ink} strokeWidth="14" strokeLinecap="round"/>
  <path d="M-16 55v39h34V56" fill={C.rose}/>
  <path d="M-65 123Q-57 83-20 85H22Q63 87 69 126L61 284Q0 308-65 283Z" fill={shirt}/>
  <ellipse cy="3" rx="48" ry="61" fill={C.rose}/>
  <path d={female?'M-48-7Q-54-69 3-66Q56-65 49-2Q15-18 3-43Q-6-15-48-7':'M-47-11Q-58-62 3-65Q58-61 47-8L25-36Q-13-18-47-11'} fill={C.ink}/>
  <path d="M-15 5v4M19 5v4" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
  <path d="M1 15-2 25h9M-7 37q11 8 22 0" stroke={C.wine} fill="none" strokeWidth="2.5" strokeLinecap="round"/>
  {pose==='open'?<><path d="M-57 119Q-83 176-126 155M60 120q33 64 81 33" stroke={shirt} strokeWidth="29" fill="none" strokeLinecap="round"/><path d="m-127 156-17-12m285 10 17-13" stroke={C.rose} strokeWidth="20" strokeLinecap="round"/></>:pose==='hold'?<><path d="M-55 121q-29 95 53 78M57 120q30 95-46 77" stroke={shirt} strokeWidth="30" fill="none" strokeLinecap="round"/><path d="m-5 199 23-5" stroke={C.rose} strokeWidth="22" strokeLinecap="round"/></>:<><path d="m-58 126-14 118m133-118 12 118" stroke={shirt} strokeWidth="29" strokeLinecap="round"/><circle cx="-72" cy="250" r="14" fill={C.rose}/><circle cx="73" cy="250" r="14" fill={C.rose}/></>}
</g>;

const Art:React.FC<{kind:string;f:number;step?:number;id:string}>=({kind,f,step=0,id})=>{
 const p=ease(f,4,30);const drift=Math.sin(f/30)*4;const draw=interpolate(f,[5,45],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const base=<><ellipse cx="450" cy="595" rx="327" ry="25" fill={C.ink} opacity="0.055"/><path d="M91 596H809" stroke={C.line} strokeWidth="3" strokeLinecap="round"/></>;
 let content:React.ReactNode;
 if(kind==='hook')content=<>
   <ellipse cx="450" cy="310" rx="278" ry="244" fill={C.pale}/>
   <g transform={`translate(450 290) scale(${0.93+p*0.07}) translate(-450 -290)`}>
    <Heart x={282} y={134+drift} size={337} fill={C.wine}/>
    <path d="M271 507q165-42 355 0" fill="none" stroke={C.ink} strokeWidth="7" strokeLinecap="round"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`M${292+i*60} 486v96`} stroke={C.ink} strokeWidth="10" strokeLinecap="round"/>)}
    <path d="M286 553H625" stroke={C.ink} strokeWidth="7"/>
   </g>
   <Star x={211} y={172} size={23}/><Star x={720} y={385} size={15} color={C.sage}/>
   <text x="450" y="661" textAnchor="middle" fontSize="27" fill={C.muted} letterSpacing="3">EMPATI JUGA PUNYA BATAS.</text>
 </>;
 else if(kind==='bed')content=<>
   <rect x="106" y="65" width="688" height="465" rx="40" fill={C.pale}/>
   <rect x="599" y="107" width="140" height="157" rx="70" fill={C.night}/>
   <path d="M678 129a48 48 0 1 0 37 67 51 51 0 0 1-37-67" fill={C.white}/>
   <circle cx="628" cy="141" r="3" fill={C.white}/><circle cx="710" cy="128" r="3" fill={C.white}/>
   <rect x="132" y="362" width="414" height="150" rx="20" fill={C.white}/><rect x="130" y="441" width="427" height="91" rx="8" fill={C.sage}/>
   <path d="M143 529v62M535 529v62" stroke={C.ink} strokeWidth="13" strokeLinecap="round"/>
   <ellipse cx="210" cy="391" rx="57" ry="40" fill={C.paper}/><ellipse cx="228" cy="385" rx="40" ry="34" fill={C.rose}/>
   <path d="M193 386q-8-54 46-40q29 10 21 34q-32-17-67 6" fill={C.ink}/>
   <path d="m229 390 12 2" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/>
   <path d="M268 383q93-61 199 28l-5 66H274Z" fill={C.rose}/>
   <path d="M276 424h165" stroke={C.coral} opacity=".4" strokeWidth="3"/>
   <Person x={657} y={290} scale={.71} shirt={C.night} pose="hold"/>
   <Phone x={592} y={337+drift/2} scale={.66} angle={-11} alert/>
   <path d="M537 289q-10-25 8-37m13 30q-4-21 11-27" stroke={C.coral} strokeWidth="4" fill="none" strokeLinecap="round" opacity={p}/>
   <text x="310" y="283" fontFamily="Playfair" fontSize="44" fill={C.muted} transform="rotate(-8 310 283)">z z z</text>
 </>;
 else if(kind==='empathy')content=<>
   <ellipse cx="450" cy="342" rx="290" ry="236" fill={C.pale}/>
   <Person x={270} y={257} scale={.79} female shirt={C.sage} pose="open"/>
   <Person x={648} y={257} scale={.79} shirt={C.night} pose="hold"/>
   <path d="M379 312Q450 215 533 304" stroke={C.coral} strokeWidth="5" fill="none" strokeDasharray="9 12" strokeDashoffset={-f*.7}/>
   <g opacity={p} transform={`translate(0 ${-drift})`}><path d="M510 110q0-65 69-65h97q67 0 67 64q0 60-60 60h-39l-37 34v-34h-26q-71 0-71-59" fill={C.white}/><path d="M621 83q20-25 36 0q14 22-12 38v9m0 16v2" stroke={C.wine} strokeWidth="6" fill="none" strokeLinecap="round"/></g>
   <Star x={180} y={127} size={17}/>
 </>;
 else if(kind==='reassure')content=<>
   <ellipse cx="450" cy="328" rx="283" ry="245" fill={C.rose} opacity=".55"/>
   <Person x={293} y={276} scale={.76} female shirt={C.sage} pose="open"/>
   <Person x={614} y={276} scale={.76} shirt={C.night} pose="open"/>
   <g transform={`translate(0 ${drift})`}><Heart x={379} y={137} size={144} fill={C.wine}/><Star x={326} y={183} size={17}/><Star x={582} y={144} size={23}/></g>
   <rect x="238" y="446" width="424" height="100" rx="50" fill={C.white}/><text x="450" y="509" textAnchor="middle" fontFamily="Playfair" fontSize="36" fontStyle="italic" fill={C.wine}>“aku memilih kamu.”</text>
 </>;
 else if(kind==='heart')content=<>
   <ellipse cx="450" cy="309" rx="275" ry="247" fill={C.pale}/>
   <Heart x={303} y={107+drift} size={294} fill={C.wine}/>
   <path d="M178 477q48-71 80-61l100 44q13 9 4 23q-6 11-24 6l-46-11 89 54q17 11 40 8l129-21q28-4 32 14q3 15-23 23l-149 43q-29 9-57-2l-170-71" fill={C.rose} stroke={C.coral} strokeWidth="3"/>
   <path d="m128 491 63-63 65 91-78 60" fill={C.sage}/>
   <path d="M721 477q-48-71-80-61l-100 44q-13 9-4 23q6 11 24 6l46-11-89 54q-17 11-40 8" fill={C.rose} stroke={C.coral} strokeWidth="3"/>
   <path d="m771 491-63-63-65 91 78 60" fill={C.night}/>
   <Star x={220} y={170} size={18}/><Star x={690} y={268} size={23} color={C.sage}/>
 </>;
 else if(kind==='repeat')content=<>
   <circle cx="450" cy="330" r="243" fill={C.rose} opacity=".45"/>
   <g transform={`rotate(${Math.sin(f/60)*4} 450 330)`}><path d="M235 228a242 242 0 0 1 420 17M667 423a242 242 0 0 1-420 16" fill="none" stroke={C.wine} strokeWidth="6" strokeDasharray="12 12" strokeDashoffset={-f}/><path d="m621 232 39 18 15-41M282 434l-40-11-13 40" stroke={C.wine} strokeWidth="6" fill="none" strokeLinecap="round"/></g>
   <Phone x={374} y={183+drift} scale={1.17} alert/>
   {[0,1,2].map(i=><g key={i} opacity={ease(f,8+i*9)}><circle cx={250+i*200} cy="585" r="37" fill={C.white}/><text x={250+i*200} y="598" textAnchor="middle" fontSize="36" fontWeight="700" fill={C.wine}>{i+1}</text></g>)}
 </>;
 else if(kind==='split')content=<>
   <rect x="117" y="64" width="666" height="222" rx="32" fill={C.pale}/>
   <Heart x={156} y={118+drift/2} size={113} fill={C.sage}/>
   <text x="311" y="158" fontSize="33" letterSpacing="3" fill={C.ink}>PERASAAN</text><text x="311" y="217" fontFamily="Playfair" fontStyle="italic" fontSize="39" fill={C.ink}>bisa dipahami.</text>
   <path d="M450 312v48m-17-17 17 17 17-17" stroke={C.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>
   <rect x="117" y="389" width="666" height="222" rx="32" fill={C.rose}/>
   <g transform="translate(176 428)"><path d="M-5 12H81M-5 113h86M5 0v130m32-130v130M69 0v130" stroke={C.wine} strokeWidth="7" strokeLinecap="round"/></g>
   <text x="311" y="481" fontSize="33" letterSpacing="3" fill={C.wine}>PERILAKU</text><text x="311" y="541" fontFamily="Playfair" fontStyle="italic" fontSize="39" fill={C.wine}>perlu dibatasi.</text>
 </>;
 else if(kind==='pattern')content=<>
   <rect x="121" y="83" width="659" height="464" rx="38" fill={id==='pattern'?C.rose:C.pale} opacity=".65"/>
   <path d="M200 466H710" stroke={C.wine} strokeWidth="5" strokeDasharray="9 11" strokeDashoffset={-f*.8}/>
   {[0,1,2,3].map(i=>{const a=ease(f,4+i*8);return <g key={i} opacity={a} transform={`translate(0 ${(1-a)*24})`}><Phone x={195+i*137} y={200-i*15} scale={.66} angle={i*3-5} alert/><circle cx={237+i*137} cy="466" r="21" fill={i===3?C.wine:C.coral}/><text x={237+i*137} y="520" textAnchor="middle" fontSize="25" fill={C.wine}>{i+1}</text></g>})}
   <text x="450" y="646" textAnchor="middle" fontFamily="Playfair" fontStyle="italic" fontSize="39" fill={C.wine}>{id==='pattern'?'yang sama, terus berulang.':'lihat rangkaian kejadiannya.'}</text>
 </>;
 else if(kind==='action')content=<>
   <ellipse cx="450" cy="320" rx="280" ry="265" fill={C.pale}/>
   <Person x={280} y={268} scale={.76} female shirt={C.sage} pose="open"/>
   {['AKUI','PERBAIKI','UBAH'].map((text,i)=>{const a=ease(f,7+i*10);return <g key={text} opacity={a} transform={`translate(${(1-a)*40} 0)`}><rect x="425" y={151+i*135} width="301" height="107" rx="23" fill={C.white}/><circle cx="477" cy={205+i*135} r="24" fill={i===2?C.wine:C.sage}/><path d={`m${465} ${205+i*135} 8 8 15-18`} stroke={C.white} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><text x="522" y={215+i*135} fontSize="31" fontWeight="700" fill={C.ink}>{text}</text></g>})}
   <Star x={704} y={85} size={21}/>
 </>;
 else if(kind==='steps')content=<>
   <path d="M198 138V525" stroke={C.line} strokeWidth="5"/>
   {[
    ['Pahami perasaannya.','EMPATI'],
    ['Sampaikan batasanmu.','BATASAN'],
    ['Harapkan perubahan.','TANGGUNG JAWAB']
   ].map((texts,i)=>{const active=i===step;return <g key={i} opacity={i<=step?1:.32} transform={`translate(${active?(1-p)*25:0} 0)`}>
    <rect x="123" y={71+i*183} width="665" height="151" rx="30" fill={active?C.ink:C.white}/>
    <circle cx="198" cy={147+i*183} r="40" fill={active?C.rose:C.pale}/>
    <text x="198" y={161+i*183} textAnchor="middle" fontSize="39" fontFamily="Playfair" fill={C.ink}>{i+1}</text>
    <text x="276" y={129+i*183} fontSize="23" letterSpacing="2" fill={active?C.rose:C.muted}>{texts[1]}</text>
    <text x="276" y={179+i*183} fontSize="35" fontWeight="700" fill={active?C.white:C.ink}>{texts[0]}</text>
   </g>})}
   <text x="450" y="676" textAnchor="middle" fontSize="24" letterSpacing="3" fill={C.muted}>RASA DIPAHAMI. TINDAKAN DIPERBAIKI.</text>
 </>;
 else content=<>
   <circle cx="450" cy="322" r="257" fill={C.pale}/>
   <path d="M450 505V218" stroke={C.ink} strokeWidth="9" strokeLinecap="round" strokeDasharray="287" strokeDashoffset={287*(1-draw)}/>
   {[0,1,2].map(i=><g key={i} opacity={ease(f,8+i*9)} transform={`translate(450 ${401-i*78}) scale(${.8+i*.1})`}><path d="M-2 0Q-133 7-143-94Q-27-105-2 0" fill={i===1?C.sage:C.ink}/><path d="M2-20Q137-19 138-119Q32-121 2-20" fill={i===1?C.ink:C.sage}/><path d="m-14-6-95-62M14-28l89-62" stroke={C.white} strokeWidth="2" opacity=".5"/></g>)}
   <Heart x={414} y={91+drift} size={76} fill={C.coral}/>
   <path d="M329 485h242l-29 136H357Z" fill={C.rose}/><path d="M318 484h263" stroke={C.wine} strokeWidth="12" strokeLinecap="round"/>
   <path d="M386 516l10 71m118-71-10 71" stroke={C.coral} strokeWidth="3" opacity=".4"/>
   <Star x={219} y={202} size={20}/><Star x={703} y={344} size={16} color={C.wine}/>
 </>;
 return <svg viewBox="0 0 900 710" width="900" height="710" style={{overflow:'visible'}} aria-label={kind}>{kind!=='split'&&kind!=='steps'&&base}{content}</svg>;
};


export {C, Heart, Phone, Person, Star, Art};
