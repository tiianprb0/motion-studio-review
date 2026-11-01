import React from 'react';
import {Composition,continueRender,delayRender,staticFile} from 'remotion';
import './style.css';
import {FilmV20,TOTAL_FRAMES} from './film/Film';
if(typeof document!=='undefined'){
 const handle=delayRender('Loading local typefaces');
 const specs:[string,string,FontFaceDescriptors][]=[['Lato','Lato-Regular.ttf',{weight:'400'}],['Lato','Lato-Bold.ttf',{weight:'700'}],['Lato','Lato-Black.ttf',{weight:'900'}],['Playfair','PlayfairDisplay-Regular.ttf',{}],['Playfair','PlayfairDisplay-Italic.ttf',{style:'italic'}]];
 Promise.all(specs.map(async ([family,file,desc])=>{const font=await new FontFace(family,`url(${staticFile('fonts/'+file)})`,desc).load();document.fonts.add(font);})).then(()=>continueRender(handle));
}


export const Root:React.FC=()=> <Composition id="MotionStudio" component={FilmV20} width={1080} height={1920} fps={30} durationInFrames={TOTAL_FRAMES}/>;
