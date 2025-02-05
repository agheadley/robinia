export const readFile=(file:File) : Promise<string|ArrayBuffer|null>=> {
    return new Promise((resolve, reject) => {
      const reader:FileReader= new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsText(file,'utf-8');
    })
  };

  export const csvProcess = (txt:string) : object[] => {
    const data:string[][] = csvToArray(txt);
  
    const out : object[] = [];
    for (let row = 1; row < data.length; row++) {
      const obj : {[key: string]: string|null }= {};
      for (let col=0;col<data[0].length;col++) {
        obj[data[0][col]] = data[row][col] && data[0][col] ? data[row][col] : null ;
      }
      out.push(obj);
    }
    return out;
  };

  //https://stackoverflow.com/questions/8493195/how-can-i-parse-a-csv-string-with-javascript-which-contains-comma-in-data
  
  const csvToArray=(text:string) : string[][]=>{
    let p = '', row = [''];
    const ret = [row];
    let i = 0;
    let r = 0;
    let s = !0;
    let l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};


export const csvDownload = (arr2d:string[][], filename:string):void => {
    const eol = String.fromCharCode(13) + String.fromCharCode(10);
    let content = ``;
    for(const row of arr2d) {
      //console.log(row);
      for(let col of row) {
        if(col?.[0]) col = col.length && col.includes(',') ? `"${col}"` : col;
        //console.log(col);
        content+=`${col},`;
      }
      content.slice(0,-1);
      content += eol;
    }
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };
  
  
  
    
  export const  download = (text:string, filename:string):void => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
};
