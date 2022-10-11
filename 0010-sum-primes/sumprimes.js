'use strict';
let __ = require('../util');
/*
0010-sum-primes

Project Euler

Problem 10

https://projecteuler.net/problem=10

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.

Answer:  142913828922
Completed on Sun, 11 Sep 2022, 18:15

*/

//====================
//
// actual problem solution
//
let p=[2,3,5];
function getprimes(limit){
    
    for(let i=p[p.length-1]+2; i<=limit; i+=2){
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
    __.dlog('primes:');
    __.dlog(p)
}

function sumprimes(){
    return p.reduce((a,e,i,arr)=>{
        a += e;
        return a;
    },0);
}

let msg = [
    'If no value give, default value is 2000000, two million.'
]

if( ! __.parseCommandLineArgs('sumprimes',msg) ) 
  return(0);
let nums = __.getNumbersFromCommandLine()
if( nums.length == 0){
    nums.push(2000000);
}
__.clog();
while(nums.length>0){
    let target = nums.shift();

    //
    // get the primes
    // then get the sums
    //
    getprimes(target);
    let ret=sumprimes();

    __.clog('target: ',target,'sum primes: ', ret);  
    __.slog(target,ret);  
}
