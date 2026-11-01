import React from 'react';
import {quick,ramp,P} from './Character';
export type Cue={start:number;end:number;text:string;segment:string};
type Mode='plain'|'glass'|'impact'|'chat'|'tag';
type Layout={x:number;y:number;w:number;size:number;mode:Mode;text:string};
// Authored screen-space staging: locations follow the meaning/action, not the camera.
export const CAPTION_LAYOUTS:Layout[]=[
 {x:110,y:270,w:820,size:48,mode:'plain',text:'Pacarku punya\nsatu kebiasaan'},
 {x:60,y:1010,w:245,size:32,mode:'plain',text:'yang selalu\nmembuatku\nkesal.'},
 {x:330,y:290,w:670,size:43,mode:'glass',text:'Setiap kali\nkami bertengkar,'},
 {x:390,y:340,w:600,size:49,mode:'impact',text:'dia nggak pernah\nbilang maaf.'},
 {x:110,y:295,w:820,size:43,mode:'glass',text:'Tapi besoknya, dia\ntiba-tiba bertanya'},
 {x:330,y:440,w:670,size:44,mode:'chat',text:'apakah aku\nsudah makan,'},
 {x:110,y:320,w:860,size:46,mode:'tag',text:'membelikan makanan\nkesukaanku,'},
 {x:420,y:450,w:590,size:42,mode:'glass',text:'atau melakukan hal-hal\nkecil untukku.'},
 {x:800,y:1060,w:230,size:32,mode:'plain',text:'Awalnya\naku pikir'},
 {x:95,y:270,w:600,size:64,mode:'impact',text:'dia cuma\ngengsi.'},
 {x:120,y:275,w:840,size:44,mode:'glass',text:'Sampai aku tahu,\ndi rumahnya dulu,'},
 {x:110,y:340,w:820,size:50,mode:'impact',text:'nggak ada yang terbiasa\nmeminta maaf.'},
 {x:100,y:280,w:850,size:49,mode:'impact',text:'Setelah bapaknya\nmarah besar,'},
 {x:65,y:760,w:220,size:34,mode:'plain',text:'besoknya\nmungkin\nsudah ada'},
 {x:190,y:1450,w:700,size:60,mode:'impact',text:'martabak di meja.'},
 {x:120,y:300,w:840,size:43,mode:'glass',text:'Buat keluarganya,\nitulah cara'},
 {x:150,y:350,w:780,size:54,mode:'impact',text:'mereka kembali\nberdamai.'},
 {x:130,y:300,w:800,size:58,mode:'plain',text:'Akhirnya aku\nmengerti,'},
 {x:290,y:1415,w:700,size:43,mode:'glass',text:'mungkin dia bukan\nnggak mau meminta maaf.'},
 {x:95,y:270,w:880,size:48,mode:'plain',text:'Dia hanya mengenal\ncara berbeda\nuntuk menunjukkannya.'},
 {x:110,y:300,w:850,size:44,mode:'glass',text:'Jadi, suatu hari ketika\ndia kembali'},
 {x:270,y:1450,w:700,size:46,mode:'glass',text:'melakukan hal kecil\nuntukku'},
 {x:100,y:310,w:870,size:48,mode:'plain',text:'setelah bertengkar,\naku bilang,'},
 {x:60,y:1050,w:260,size:44,mode:'impact',text:'“Makasih\nya.'},
 {x:95,y:315,w:820,size:51,mode:'chat',text:'Aku tahu ini caramu\nminta maaf.”'},
 {x:805,y:1040,w:230,size:32,mode:'plain',text:'Dan mungkin,\ndari situ'},
 {x:95,y:290,w:860,size:52,mode:'impact',text:'dia mulai belajar\nbahwa kata maaf'},
 {x:65,y:1010,w:265,size:32,mode:'plain',text:'juga boleh\ndiucapkan.'},
 {x:100,y:270,w:880,size:48,mode:'glass',text:'Terkadang, memahami\nlatar belakang seseorang'},
 {x:250,y:365,w:740,size:51,mode:'plain',text:'adalah langkah pertama'},
 {x:110,y:1415,w:860,size:50,mode:'impact',text:'untuk membantunya\nbertumbuh.'},
];
export const Caption:React.FC<{cue:Cue;index:number;frame:number}>=({cue,index,frame})=>{
 const l=CAPTION_LAYOUTS[index],entry=Math.round(cue.start*30),end=Math.round(cue.end*30),q=quick(frame,entry,entry+6),leave=1-ramp(frame,end-2,end);
 const align=l.mode==='plain'?'flex-start':'center';
 return <div data-caption="true" data-cue={index} data-caption-mode="word-backgrounds" style={{position:'absolute',left:l.x,top:l.y,width:l.w,fontFamily:'Lato',fontSize:l.size,fontWeight:l.mode==='impact'?900:700,lineHeight:1.12,color:P.ink,background:'none',border:'none',padding:0,boxShadow:'none',opacity:q*leave,transform:`translateY(${(1-q)*(l.y>1000?14:-10)})`,boxSizing:'border-box'}}>
  <div data-caption-text="true" style={{display:'flex',flexDirection:'column',gap:8}}>
   {l.text.split('\n').map((line,row)=><div key={row} style={{display:'flex',flexWrap:'wrap',justifyContent:align,columnGap:8,rowGap:8}}>
    {line.split(/\s+/).filter(Boolean).map((word,i)=>{const normalized=word.replace(/[^\p{L}]/gu,'').toLowerCase(),accent=['maaf','kesal','gengsi','martabak','bertumbuh','makasih','kebiasaan','berdamai'].includes(normalized);return <span data-caption-word="true" key={i} style={{display:'inline-block',whiteSpace:'nowrap',padding:l.size>=43?'5px 9px':'4px 8px',borderRadius:8,background:accent?(normalized==='bertumbuh'?P.ink:P.wine):'rgba(255,250,241,.96)',color:accent?P.cream:P.ink,fontWeight:accent?900:undefined,boxShadow:'0 3px 9px rgba(42,64,50,.08)',border:'1px solid rgba(255,255,255,.35)',boxSizing:'border-box'}}>{word}</span>})}
   </div>)}
  </div>
 </div>
};
