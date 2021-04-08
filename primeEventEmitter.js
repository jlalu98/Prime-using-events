const {EventEmitter}=require('events');
var x=require('./prime')
// const work=()=>{
//     let event = new EventEmitter();
//     let percent=0;
//     const iid=setInterval(() => {
//         let delta=Math.floor(Math.random()*5)+1;
//         percent+=delta;
//         if(percent>100)
//         {
//             percent=100;
//         }
//         event.emit('progress',percent);
//         if(percent===100){
//             clearInterval(iid);
//             event.emit('done');
//         }
//     },500);
//     return event;
// }
// let event=work();
// event 
//     .on('progress',value=>console.log(`completed ${value}%....`))
//     .on('done',()=>console.log('work is over'));

//console.log(Math.floor(Math.random()*5)+1);
const primeFinderEvent=(str,min,max)=>{
    let event= new EventEmitter();
    let low=min;
    let high=Math.min(low+100,max);
    let symbol="[]"
    let element="[]";
    let arr=[];
    let iid=setInterval(()=>{
        if(min>max){
            event.emit("error",{str,min,max});
        }
    //event.emit('started',{str});
    for(i=low;i<high;i++){
        if(x.prime(i)){
            arr.push(i);
            //event.emit("prime",{str,i});
        }
    }
    low=high;
    high=Math.min(low+100,max);
    let percentage=(low/max)*100;
    // for(let j=0;j<percentage/100;j++){
    //     element+=symbol;
    // }
    if(percentage>=5&&percentage<=25){
        element+=symbol;
    }
    else if(percentage>25&&percentage<=50){
        element+=(symbol+symbol);
    }
    else if(percentage>50&&percentage<=75){
        element+=(symbol+symbol+symbol);
    }
    else if(percentage>75&&percentage<100){
        element+=(symbol+symbol+symbol+symbol);
    }
    else if(percentage==100){
        element+=(symbol+symbol+symbol+symbol+symbol);
    }
    event.emit("percentage",{str,percentage,element});
    element="[]";
    symbol="[]";
    if(low>=high){
        clearInterval(iid);
        event.emit("done",arr);
    }

    },5);

    return event;
};
function displayArray(arr){
    count=1;
    for(let i=0;i<arr.length;i++){
        console.log(`${count}--->${arr[i]}`);
        count++;
    }
}
function primeFinder(str,min,max){
    let event=primeFinderEvent(str,min,max);

    event
        .on("error",(err)=>console.log(`${err.str}:${err.min} is greater than ${err.max}`))
        .on("done",(arr)=>displayArray(arr))
        .on("percentage",(progress)=>console.log(`${progress.str}:${progress.element}${progress.percentage}%`))
}
primeFinder("Error",200,100);
primeFinder("second",2,2000);
primeFinder("third",2,1000);
primeFinder("first",2,10);


