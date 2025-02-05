import {config} from '$lib/state.svelte';

export const getIntakeBar=(scr:number,std:string):string=>{

    let band='X';
    const scrs:{scr:number,band:string}[]=[{scr:110,band:"A"},{scr:100,band:"B"},{scr:90,band:"C"},{scr:0,band:"D"}];
    if(scr!==null && scr>0) {
        const f=scrs.find(el=>scr>el.scr);
        band=f? f.band : 'X';
    }
    let txt=`<svg width="2.5rem" height="1.25rem" viewbox="0 0 50 25" xmlns="http://www.w3.org/2000/svg">`;
    txt+=`<g>`;
    txt+=` <rect x="0" y="12" width="50" height="8" fill='#ddd'></rect>`;
    txt+=`<text x="0" y="10" font-size="10" font-weight="600" fill='#333'>${std==='GCSE'?String(Math.round(10*scr)/10):String(Math.round(scr))}</text>`;
    if(std!=='GCSE') {
        txt+=`<text x="40" y="10" font-size="10" font-weight="600" fill='#333'>${band}</text>`;
    }
    if(std==='GCSE') {
        txt+=` <rect x="0" y="12" width=${50*scr/9} height="8" fill='#1E90FF88'></rect>`;
    } else {
        if(scr>=100) {
            txt+=` <rect x="0" y="12" width="${(50*(scr-60)/(140-60))>0 ? (50*(scr-60)/(140-60)) : 0}" height="8" fill='rgba(34,139,34,0.5)'></rect>`;
        } else {
            txt+=` <rect x="0" y="12" width="${(50*(scr-60)/(140-60))>0 ? (50*(scr-60)/(140-60)) : 0}" height="8" fill='rgba(178,34,34,0.5)'></rect>`;
        }
    }
    
    txt+=`</g>`;
    txt+=`</svg>`;
    
    return txt;
};

export const getGrade=(isRag:boolean,gd:string,residual:number):string=>{
   

    let txt=``;

    if(isRag) {
        if(residual<config.rag.red) {
            txt=` <div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;background:rgba(${178},${34},${34},${0.05+0.87*Math.abs(residual)/10})">${gd}</div>`;
        } else if(residual>=config.rag.green) {
            txt=` <div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;background:rgba(${34},${139},${34},${0.05+0.7*Math.abs(residual)/10})">${gd}</div>`;
        } else txt=`<div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;">${gd}</div>`;
    } else txt=`<div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;">${gd}</div>`;
    return txt;
};

export const getTotal=(isPercentage:boolean,total:string|number):string=>{
   

    let txt=``;

    if(isPercentage) 
        txt=` <div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;background:rgba(${34},${139},${34},${0.7*Math.abs(Number(total))/100})">${total}</div>`;
    else 
        txt=`<div style="width:1.5rem;text-align: center;overflow:hidden;padding:0.1rem;">${total}</div>`;
    return txt;
};


export const getAssessmentTitle=(title:string,subTitle:string):string=>{


    return `<div style="position:relative;font-size:0.8rem;width:2rem;height:6rem">
        <div style="border:0px solid black;position:absolute;bottom:0;line-height:1rem;writing-mode:vertical-rl;overflow:hidden;transform:rotate(-180deg);">
             <div style=" font-weight:bold;">${title}</div>
             <div style="font-weight:normal;">${subTitle}</div>
        </div>
    </div>
    `;
  
};


export const getChance=(sc:string,pre:number):string=>{

    const grade=config.grade.filter(el=>el.sc===sc);
    const w=100;
    const startY=15;
    const maxH=50;

    let txt=``;

    const s=grade[0] ? grade[0].pre/5 : 0;
    const points=grade.map((/** @type {{ gd: any; pre: any; }} */ el)=>({gd:el.gd,pre:el.pre,h:0,p:0,residual:0,w:0,x:0,y:0})).sort((/** @type {{ pre: number; }} */ a,/** @type {{ pre: number; }} */ b)=> a.pre-b.pre);

   
    
    //console.log(points);
    
    const itemW= points[0] ? w/points.length : 0;   
    const datum= pre>0 ? pre : 0;
    if(datum>0) {
        for(const item of points) {
            item['residual']=datum>0 ? Math.abs(item.pre-datum) : 0 ;
            const h=s>0 ? Math.exp(-(item['residual']*item['residual'])/(2*s*s))*1/(2*Math.PI*s) : 0;
            item['p']=h;
        }
        const total=points.map((/** @type {{ [x: string]: any; }} */ el)=>el['p']).reduce((/** @type {any} */ partialSum, /** @type {any} */ a) => partialSum + a, 0);
        for(let i=0;i<points.length;i++) {
            const item=points[i];
            item['p']=Math.floor(100*item['p']/total);
            item['y']=startY+maxH-item['h'];
            item['x']=i*itemW+itemW/10;
            item['w']=0.8*itemW;
        }
        const max=Math.max(...points.map((/** @type {{ [x: string]: any; }} */ el)=>el['p']));
        for(const item of points) {
            item['h'] = maxH*item['p']/max;
            item['y']=startY+maxH-item['h'];
        }


    }

    txt+=`<svg width="6rem" height="4.8rem" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">`;
    txt+=`<g>`;
    for(const p of points) {
        txt+=`<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" fill="rgba(0,128,255,0.5)"></rect>`;
        if(p.p>15) {
            txt+=`<text x="${p.x}" y="${p.y-2}" font-size="10" fill="#333">${p.gd}</text>`;
        }
    }
    txt+=`</g>`;
    txt+=`<svg>`;

    //console.log(points);

    return txt;
};

export const getVA=(data:{n:number,v:number,s:0|2|3}):string=>{
  
    const cfg = {
        colors:{bg2:'#aaa',bg3:'#ddd',red:'#B22222',green:'#228B22',grey:'#7a7a7a',text:'#333',line:'#888'},
        height:80,
        width:50,
        d:40,  
        max:3
    };

    const graph = {
        poly2:'',
        poly3:'',
        rect:{x:0,y:0,w:0,h:0,color:cfg.colors.text},
        text:{x:cfg.width/4,y:cfg.d-10,v:''},
        line:{x1:0,y1:0,x2:0,y2:0}

    };

    const h=data.n===0 ? 0 : cfg.d/(cfg.max*Math.sqrt(data.n));
    const midX=20;
    const dx=20;
    const midY=cfg.height/2;
    
    graph.line.x1=midX-dx;
    graph.line.y1=midY;
    graph.line.x2=midX+dx;
    graph.line.y2=midY;
    
    
    
    graph.poly3=`${midX-dx},${midY} ${midX},${midY-3*h} ${midX+dx},${midY} ${midX},${3*h+midY}`;
    graph.poly2=`${midX-dx},${midY} ${midX},${midY-2*h} ${midX+dx},${midY} ${midX},${2*h+midY}`;
    
    graph.rect.w=cfg.width/10;
    graph.rect.x=midX - graph.rect.w/2;
    //console.log(cfg.width/2,graph.rect.w);
    graph.rect.h= Math.abs(data.v)>cfg.max? cfg.d : cfg.d*Math.abs(data.v)/cfg.max ;
    
    graph.rect.y = data.v < 0 ? cfg.d : cfg.d-graph.rect.h;
    graph.rect.color = data.s>0 ? data.v > 0 ? cfg.colors.green : cfg.colors.red  : cfg.colors.grey;
    
    graph.text.x=cfg.width/4;
    graph.text.y= data.v > 0 ? cfg.d+20 : cfg.d-10;
    graph.text.v =data.s >0 ? `${Math.round(10*data.v)/10} (${data.s})` : `${Math.round(10*data.v)/10}`;

    let txt=`<svg width="5rem" height="8rem" xmlns="http://www.w3.org/2000/svg">`;
   
    txt+=`<g>`;
    txt+=`<polygon points="${graph.poly3}" fill="${cfg.colors.bg3}" stroke="none"></polygon>`;
    txt+=`<polygon points="${graph.poly2}" stroke="none" fill="${cfg.colors.bg2}"></polygon>`;
    txt+=`</g>`;
    txt+=`<line x1="${graph.line.x1}" y1="${graph.line.y1}" x2="${graph.line.x2}" y2="${graph.line.y2}" stroke="${cfg.colors.line}"></line>`;
    txt+=`<rect x="${graph.rect.x}" y="${graph.rect.y}" width="${graph.rect.w}" height="${graph.rect.h}" fill="${graph.rect.color}" stroke="#333"></rect>             `;
    txt+=`<text x="${graph.text.x}" y="${graph.text.y}" font-size="10" font-weight="500" fill="${cfg.colors.text}">${graph.text.v}</text> `;
    txt+=`</svg>`;
    txt+=``;
    txt+=``;
    txt+=``;
    




    return txt;
};