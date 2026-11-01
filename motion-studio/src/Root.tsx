import React from 'react';
import {Composition, continueRender, delayRender, staticFile} from 'remotion';
import timing from './timing-v6.json';
import './style.css';
import {StoryFilmV6} from './StoryFilmV6';
import {FilmV20,TOTAL_FRAMES as V20_FRAMES} from './v20/Film';
import {FilmV19,TOTAL_FRAMES as V19_FRAMES} from './v19/Film';
import {FilmV18,TOTAL_FRAMES as V18_FRAMES} from './v18/Film';
import {FilmV17,TOTAL_FRAMES as V17_FRAMES} from './v17/Film';
import {FilmV16,TOTAL_FRAMES as V16_FRAMES} from './v16/Film';
import {FilmV15,TOTAL_FRAMES as V15_FRAMES} from './v15/Film';
import {FilmV14,TOTAL_FRAMES as V14_FRAMES} from './v14/Film';
import {FilmV13,TOTAL_FRAMES as V13_FRAMES} from './v13/Film';
import {FilmV12,TOTAL_FRAMES as V12_FRAMES} from './v12/Film';
import {FilmV11,TOTAL_FRAMES as V11_FRAMES} from './v11/Film';
import {FilmV10,TOTAL_FRAMES as V10_FRAMES} from './v10/Film';
import {FilmV9,TOTAL_FRAMES as V9_FRAMES} from './v9/Film';
import {FilmV8,TOTAL_FRAMES as V8_FRAMES} from './v8/Film';
import {FilmV7,TOTAL_FRAMES} from './v7/Film';

if(typeof document!=='undefined'){
 const handle=delayRender('Loading local typefaces');
 const specs:[string,string,FontFaceDescriptors][]=[['Lato','Lato-Regular.ttf',{weight:'400'}],['Lato','Lato-Bold.ttf',{weight:'700'}],['Lato','Lato-Black.ttf',{weight:'900'}],['Playfair','PlayfairDisplay-Regular.ttf',{}],['Playfair','PlayfairDisplay-Italic.ttf',{style:'italic'}]];
 Promise.all(specs.map(async ([family,file,desc])=>{const font=await new FontFace(family,`url(${staticFile('fonts/'+file)})`,desc).load();document.fonts.add(font);})).then(()=>continueRender(handle));
}

const STORY=Math.round(timing.duration*30);
const OUTRO=Math.round(3.4*30);

export const Root:React.FC=()=> <><Composition id="KepedulianV20" component={FilmV20} width={1080} height={1920} fps={30} durationInFrames={V20_FRAMES}/><Composition id="KepedulianV19" component={FilmV19} width={1080} height={1920} fps={30} durationInFrames={V19_FRAMES}/><Composition id="EmpatiPunyaBatasV18" component={FilmV18} width={1080} height={1920} fps={30} durationInFrames={V18_FRAMES}/><Composition id="EmpatiPunyaBatasV17" component={FilmV17} width={1080} height={1920} fps={30} durationInFrames={V17_FRAMES}/><Composition id="EmpatiPunyaBatasV16" component={FilmV16} width={1080} height={1920} fps={30} durationInFrames={V16_FRAMES}/><Composition id="EmpatiPunyaBatasV15" component={FilmV15} width={1080} height={1920} fps={30} durationInFrames={V15_FRAMES}/><Composition id="EmpatiPunyaBatasV14" component={FilmV14} width={1080} height={1920} fps={30} durationInFrames={V14_FRAMES}/><Composition id="EmpatiPunyaBatasV13" component={FilmV13} width={1080} height={1920} fps={30} durationInFrames={V13_FRAMES}/><Composition id="CaramuMintaMaafV12" component={FilmV12} width={1080} height={1920} fps={30} durationInFrames={V12_FRAMES}/><Composition id="CaramuMintaMaafV11" component={FilmV11} width={1080} height={1920} fps={30} durationInFrames={V11_FRAMES}/><Composition id="CaramuMintaMaafV10" component={FilmV10} width={1080} height={1920} fps={30} durationInFrames={V10_FRAMES}/><Composition id="CaramuMintaMaafV9" component={FilmV9} width={1080} height={1920} fps={30} durationInFrames={V9_FRAMES}/><Composition id="CaramuMintaMaafV8" component={FilmV8} width={1080} height={1920} fps={30} durationInFrames={V8_FRAMES}/><Composition id="CaramuMintaMaafV7" component={FilmV7} width={1080} height={1920} fps={30} durationInFrames={TOTAL_FRAMES}/><Composition id="TanpaKataMaaf" component={StoryFilmV6} width={1080} height={1920} fps={30} durationInFrames={STORY+OUTRO}/></>;
