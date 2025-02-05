import {config} from '$lib/state.svelte';


export const wait = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay));
  

export const getDateTime=() : string =>{
  const x = new Date();
  const y = x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
  return y+" "+x.toTimeString().substring(0,5);
        
};

export const getDate=():string =>{
  const x = new Date();
  const y = x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');
  return `${y}`;        
};

/* https://stackoverflow.com/questions/38613654/javascript-find-unique-objects-in-array-based-on-multiple-properties */
/* TYPES - https://www.geeksforgeeks.org/how-to-get-an-object-value-by-key-in-typescript/ */
export const unique = (arr : { [key: string]: string|number|boolean }[],props:string[]) => [...new Map(arr.map(entry => [props.map(k=> String(entry[k])).join('|'), entry])).values()];


export const random=(min:number, max:number) : number=> {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const getShortDate=(d:string):string=>{
  return d?.length===10 ? d[5]+d[6]+"/" +d[2]+d[3]: '00/00';
        
};

/* CEM scores > bands A-D */
export const getBand=(scr:number|null):string=>{
  let band='X';
  const scrs:{scr:number,band:string}[]=[{scr:110,band:"A"},{scr:100,band:"B"},{scr:90,band:"C"},{scr:0,band:"D"}];
  if(scr!==null && scr>0) {
      const f=scrs.find(el=>scr>el.scr);
      band=f? f.band : 'X';
  }
  return band;
};


export const getExamYear=(nc:number,):number|null=>{
  const x = new Date();
  let currentYear=x.getFullYear();
  const month=x.getMonth()+1;
  if(month>config.year.rollover.month) currentYear+=1;
  //console.log(month,currentYear);
  const f= config.year.yr.find(el=>el.nc===nc);
  return f ? currentYear+f.add : null;

};


export const getStd=(nc:number):{A:string,B:string}=>{
    const f=config.std.find(el=>el.nc===nc);
    return f ? {A:f.A,B:f.B} : {A:'',B:''};
}

export const findGradeResidual=(sc:string,baseGrade:string,grade:string):number=>{
    const grades=config.grade.filter(el=>el.sc===sc).sort((a,b)=>b.pc-a.pc);
    const s1=grades.findIndex((/** @type {{ gd: string; }} */ el)=>el.gd===baseGrade);
    const s2=grades.findIndex((/** @type {{ gd: string; }} */ el)=>el.gd===grade);  
    return (s1===-1 || s2===-1) ? 0 : (s1-s2);
    
}

export const findAverageGrade=(sc:string,gradeArr:string[]):string=>{
    const grades=config.grade.filter(el=>el.sc===sc).sort((a,b)=>b.pc-a.pc);
    const indexArr:number[]=[];
    for(const gd of gradeArr) {
        const s=grades.findIndex((/** @type {{ gd: string; }} */ el)=>el.gd===gd);
        if(s>-1) indexArr.push(s);
    }
    //console.log(indexArr);
    let gd='X';
    if(indexArr.length) {
        const mean = Math.round(indexArr.reduce((a,b) => a+b) / indexArr.length);
        if(grades?.[mean]) gd=grades[mean].gd;
    }
    return gd;



    
};




export const getTotals=(results:{sc:string,gd:string}[],courses:string[]):{sc:string,gd:string,t:number}[]=>{

  const grades=config.grade.filter(el=>courses.includes(el.sc)).sort((a,b)=>a.sc.localeCompare(b.sc) ||b.pc-a.pc).map(el=>({sc:el.sc,gd:el.gd}));
//console.log(grades);


  let ts:{sc:string,gd:string,t:number}[]=[];
  //const c = ['a','b','a','c','a'].reduce((acc,el)=>acc + (el==='a' ? 1 : 0),0);
  ts=grades.map(el=>({sc:el.sc,gd:el.gd,t:results.reduce((a,e)=>a+(e.gd===el.gd ? 1: 0),0)}));
  return ts;
};


export const getPercentages=(results:{sc:string,gd:string}[],courses:string[]):{sc:string,gd:string,t:number}[]=>{

  const grades=config.grade.filter(el=>courses.includes(el.sc)).sort((a,b)=>a.sc.localeCompare(b.sc) ||b.pc-a.pc).map(el=>({sc:el.sc,gd:el.gd}));
//console.log(grades);


  let ts:{sc:string,gd:string,t:number}[]=[];
  //const c = ['a','b','a','c','a'].reduce((acc,el)=>acc + (el==='a' ? 1 : 0),0);
  ts=grades.map(el=>({sc:el.sc,gd:el.gd,t:results.length && results.length>0 ? Math.round(10000*results.reduce((a,e)=>a+(e.gd===el.gd ? 1: 0),0)/results.length)/100 : 0}));
  return ts;
};
