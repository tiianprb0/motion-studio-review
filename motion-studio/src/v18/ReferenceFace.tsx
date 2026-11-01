import React from 'react';
// Face geometry and palette adapted directly from the SVG supplied by the user.
export const ReferenceFace:React.FC<{who:string;view:string;dir:number;mood:string;blink:boolean;gaze:number;talk:number}>=({who,view,dir,mood,blink,gaze,talk})=>{
 const girl=who==='her',boy=who==='boy',dad=who==='dad',cx=girl?355:185,back=view==='back';
 const smile=mood==='warm'||mood==='soft',angry=mood==='annoyed',hurt=mood==='hurt'||mood==='unsure';
 const g=Math.max(-2.4,Math.min(2.4,gaze*.45)),brown=girl?'#3D281D':'#382E31';
 return <g transform={`translate(${-cx*.86} ${-279-180*.86}) scale(.86)`}>
  {girl?<path d="M312 170 Q305 130 350 120 Q405 118 412 165 Q418 215 390 225 Q375 230 360 225 Q320 230 312 170Z" fill="#3D281D"/>:<path d="M135 160 Q125 125 175 118 Q225 112 235 155 Q240 185 225 205 Q190 215 135 160Z" fill="#382E31"/>}
  {back?<><path d={girl?'M315 160Q350 105 399 150L404 211Q360 239 316 213Z':'M141 155Q170 106 224 146L228 201Q186 226 142 201Z'} fill={brown}/><path d={girl?'M344 219h24v25h-24Z':'M173 210h24v33h-24Z'} fill="#FCEADE"/></>:<>
   <circle cx={girl?398:140} cy={girl?182:180} r={girl?11:12} fill="#FCEADE"/>
   <circle cx={girl?398:140} cy={girl?182:180} r={girl?2.5:6} fill={girl?'#FFF':'#F2C6B6'} opacity={girl?1:.6}/>
   <rect x={girl?314:144} y="135" width="82" height="90" rx={boy?40:38} fill="#FFF2E8"/>
   <circle cx={girl?326:156} cy={girl?188:190} r={girl?9:8.5} fill={girl?'#FF9E80':'#E8998D'} opacity=".45"/>
   <circle cx={girl?384:214} cy={girl?188:190} r={girl?9:8.5} fill={girl?'#FF9E80':'#E8998D'} opacity=".45"/>
   {(girl?[334,374]:[166,206]).map((x,i)=><g key={i}>{blink?<path d={`M${x-5} 174q5 3 10 0`} stroke={brown} strokeWidth="2.2" fill="none" strokeLinecap="round"/>:<><ellipse cx={x+g} cy="173" rx={boy?5.3:5} ry={6} fill={brown}/><circle cx={x+g+(girl?-2:2)} cy="171" r="2" fill="#FFF"/></>}</g>)}
   <path d={girl?(angry?'M328 159l16 6M366 165l16-6':hurt?'M328 164q8-8 16-7M366 157q8-1 16 7':'M328 161 Q336 156 344 160 M366 160 Q374 156 382 161'):(angry?'M158 159l16 6M198 165l16-6':hurt?'M158 164q8-8 16-7M198 157q8-1 16 7':'M158 162 Q166 157 174 161 M198 161 Q206 157 214 162')} stroke={girl?'#543A2A':'#4A3E41'} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
   {talk>.15?<ellipse cx={girl?355:186} cy={girl?197:198} rx="6" ry={2.3+talk*5} fill={girl?'#D15368':'#A84C62'}/>:<path d={girl?(smile?'M347 194Q355 203 363 194':hurt?'M347 198Q355 191 363 198':'M347 196h16'):(smile?'M178 196Q186 203 194 196':hurt?'M178 200Q186 193 194 200':'M178 198h16')} stroke={girl?'#D15368':'#A84C62'} strokeWidth={girl?2.8:2.6} strokeLinecap="round" fill="none"/>}
   <circle cx={girl?355:186} cy="184" r="2" fill="#EAA89B"/>
   {girl?<><path d="M312 160 Q325 140 355 138 Q385 140 398 160" stroke="#4A3326" strokeWidth="16" strokeLinecap="round" fill="none"/><path d="M310 160 Q308 195 318 215" stroke="#4A3326" strokeWidth="14" strokeLinecap="round" fill="none"/></>:<><path d="M140 152 Q136 122 176 116 Q226 112 234 145 Q210 132 186 138 Q162 144 140 152Z" fill="#4A3E41"/><path d="M172 136 Q180 148 184 156" stroke="#4A3E41" strokeWidth="4.5" strokeLinecap="round"/>{dad&&<path d="M143 153q-3 17 2 29M226 149l3 25" stroke="#BDB3A4" strokeWidth="5" fill="none"/>}</>}
  </>}
 </g>
};
