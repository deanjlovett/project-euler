'use strict';
/*
0010-sum-primes

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.
*/

//=================
// boilerplate debugging helper function
//
let isDebug = false;
function debug_log(...myArgs){
    if(isDebug)
        console.log(...myArgs);
}

//====================
//
// actual problem solution
//
let p=[2,3,5];
function getprimes(limit){
    
    for(let i=p[p.length-1]+2; i<limit; i+=2){
        let stop=Math.ceil( Math.sqrt( i ) ) + 1;
        let isItPrime=true;
        for( let j=0; j<p.length && p[j]<stop; ++j){
            if( i % p[j] === 0 ){
                isItPrime = false;
                break;
            }
        }
        if( isItPrime ){
            p.push(i);
        }
    }
    if( isDebug ){
        debug_log('primes:');
        debug_log(p)
    }
}

function sumprimes(){
    return p.reduce((a,e,i,arr)=>{
        a += e;
        // debug_log(' e: ', e);
        return a;
    },0);
}

// let target=100;
let target=2000000;
const myArgs = process.argv.slice(2);
let debugstrarr=['-d','--debug'];
for( ; myArgs.length >= 1; myArgs.shift()){
    let test=parseInt(myArgs[0]);
    if( debugstrarr.includes(myArgs[0].toLowerCase()) ){
        isDebug = true;
        debug_log('calling args: ',myArgs)
        debug_log('debug set to TRUE')
    }
    else if( !isNaN(test) && test !== 0 ){
        target=test;
    }
    else{
        // let shelp = myArgs[0].toLowerCase();
        // if( shelp === '-h' || '--help')
        console.log('usage: node sumrpimes.js [some-number] [-d] [--debug]');
        console.log('       some-number: sum the primes less than some-number');
        console.log('                    ( default value is 2000000, two million )');
        console.log('       -d or --debug: extra debugging outup');
        return(0);
    }
    
}
console.log('target: ',target);
getprimes(target);

let ret=sumprimes();

console.log('sum primes: ', ret);
