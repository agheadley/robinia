export interface ExamTable {
    id:number,
    created_at: string,
    g: string
    gd:string,
    gnd:string,
    hse:string,
    isEAL:boolean,
    isGT:boolean,
    isIEP:boolean,
    isTotal:boolean,
    isKPI:boolean,
    isVA:boolean,
    log:string|null,
    mid:string,
    pid:number,
    pn:string,
    sn:string,
    sc:string,
    sl:string,
    ss:string,
    sr:string,
    stdResA:number|null,
    stdResB:number|null,
    tg:string,
    yr:number,
    nc:number

}

export interface IntakeTable {
    id:number,
    created_at: string,
    yr:number,
    nc:number,
    mid:string,
    pid:number,
    pn:string,
    sn:string,
    gnd:string,
    test:string,
    pre:{sc:string,ss:string,A:number|null,B:number|null}[],
    base:{type:string,A:number|null,B:number|null}[]
}