import React from 'react';
export const Portrait:React.FC<{view:string;dir:number;mood:string;blink:boolean;gaze:number;talk:number}>=({view,dir,mood,blink,gaze,talk})=>{
 const back=view==='back',side=view==='side',soft=mood==='warm'||mood==='soft',hurt=mood==='hurt'||mood==='unsure',angry=mood==='annoyed';
 const gx=Math.max(-2,Math.min(2,gaze*.42)),skin='#E8BCA4',hair='#24322E';
 return <g>
  <path d="M-33-272q-11-52 30-57q41-5 43 44l-1 45q-11 12-24 7l-5-20h-22l-8 21q-14 2-25-11Z" fill={hair}/>
  <path d="M-29-277q-5-39 23-47" fill="none" stroke="#556154" strokeWidth="3.4" opacity=".45"/>
  <path d="M27-308q12 20 8 55l-7 15" fill="none" stroke="#62705C" strokeWidth="2.6" opacity=".35"/>
  {back?<><path d="M-30-286q30-53 61 0l1 36q-32 16-64-1Z" fill={hair}/><path d="M-9-249h18v13h-18Z" fill={skin}/><path d="M-5-322q-12 38-5 72M10-321q20 24 15 73" stroke="#47554A" strokeWidth="1.7" fill="none"/></>:<>
   <path d="M-26-297C-18-319 19-319 28-296C35-276 23-252 9-245Q0-240-9-245C-26-253-33-276-26-297Z" fill={skin}/>
   <path d="M-25-294q-6 35 18 48q-22-5-25-31Z" fill="#DCA68C" opacity=".55"/>
   <path d="M11-307q12 5 13 20" fill="none" stroke="#F4D4BD" strokeWidth="3" opacity=".6" strokeLinecap="round"/>
   <ellipse cx="-29" cy="-274" rx="4.2" ry="6" fill={skin}/><ellipse cx="29" cy="-274" rx="4.2" ry="6" fill={skin}/>
   <path d="M-31-286q-4-37 31-40q38-2 33 41q-13-7-19-25q-13 20-45 24Z" fill={hair}/>
   <path d="M-26-292q26-3 38-22M18-315q9 12 11 23" fill="none" stroke="#4B5B4C" strokeWidth="1.7" opacity=".65"/>
   {[-12.5,12].map((cx,i)=>{const w=i===1&&view==='three'?6.0:6.7;return <g key={i}>
    <path d={`M${cx-w}-280q${w} -${blink?0:5.0} ${w*2} 0q-${w} ${blink?0:4.0} -${w*2} 0Z`} fill="#FFF9ED"/>
    {!blink&&<><ellipse cx={cx+gx} cy="-279.8" rx="2.8" ry="3.3" fill="#735844"/><ellipse cx={cx+gx} cy="-279.7" rx="1.45" ry="2.4" fill="#273A31"/><circle cx={cx+gx-.7} cy="-281" r=".85" fill="#FFFDF4"/></>}
    <path d={`M${cx-w}-280q${w} -${blink?0:5} ${w*2} 0`} fill="none" stroke="#344037" strokeWidth="1.35" strokeLinecap="round"/>
    <path d={`M${cx-w+.8}-277.8q${w-1} 2 ${w*1.7} -.2`} stroke="#C88875" strokeWidth=".6" fill="none" opacity=".8"/>
    <path d={`M${cx+(i?-w:w)} -280l${i?-1.6:1.6} -1.2`} stroke="#344037" strokeWidth="1"/>
   </g>})}
   <path d={angry?'M-20-292q6-2 12 1M6-291q6-3 13-1':hurt?'M-20-291q6-5 12-4M6-295q7 0 13 4':'M-20-293q6-3 12-1M6-294q7-2 13 1'} stroke="#52604C" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
   <path d="M1-279q-1 6-3 10q3 2 6 0" stroke="#BD8A72" strokeWidth="1" fill="none" strokeLinecap="round"/><path d="M-1-278v5" stroke="#F2D2BA" strokeWidth="1.3" strokeLinecap="round"/>
   <ellipse cx="-18" cy="-265" rx="7" ry="3" fill="#D68F80" opacity=".20"/><ellipse cx="18" cy="-265" rx="7" ry="3" fill="#D68F80" opacity=".20"/>
   <path d={soft?'M-7-256q4-2 7-.8q3-1.2 7 .8q-7 7-14 0Z':hurt?'M-7-255q7-4 14 0q-7 3-14 0Z':'M-7-256q4-2 7-1q3-1 7 1q-7 5-14 0Z'} fill="#AD6A6C"/>
   {talk>.12&&<><ellipse cy="-255.4" rx={4.7+talk} ry={1.1+talk*3} fill="#75434C"/><path d="M-3-257h6" stroke="#F8DFD0" strokeWidth=".9" strokeLinecap="round"/></>}
   <path d={soft?'M-5-253q5 2 10 0':'M-4-253h8'} stroke="#D99A93" strokeWidth=".8" fill="none" opacity=".8"/>
   <circle cx="-29" cy="-267" r="2.1" fill="#D3AD68"/><circle cx="29" cy="-267" r="2" fill="#D3AD68"/>
  </>}
 </g>
};
