'use strict';
let __ = require('../util');

/*
Project Euler - Smallest Multiple

https://projecteuler.net/problem=5

Smallest multiple

Problem 5

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
*/


/*
function to solve the problem
*/

function getNextPrime(){
    let maxpidx = primes.length-1;
    let npg = primes[maxpidx];
    let isPrime = true;
    do{
        npg += 2;
        let stop = Math.trunc( Math.sqrt(npg) ) + 1;
        for(let i=0; i<=maxpidx && primes[i]<stop; ++i){
            if( npg % primes[i] === 0) {
                isPrime = false;
                break;
            }
        }
    }while(!isPrime)
    primes.push( npg );
    factMap.set(primes(npg,0));
    return npg;
}

function factor(n){
    __.dlog(`  inside factor(n:${n})`)

    let w = n;
    let maxpidx = primes.length-1;    
    let stop = Math.trunc( Math.sqrt(n) ) + 1;
    // let lastPrime = primes[maxpidx];

    __.dlog(`    right before while(stop>primes[maxpidx:${maxpidx}])`)

    while(stop>primes[maxpidx]){
        lastPrime = getNextPrime();
        maxpidx = primes.length-1;
    }
    let fact = new Map();

    __.dlog(`    right before or(let i=0; i<=maxpidx:${maxpidx} && primes[i:0]:${primes[0]} < stop:${stop}; ++i){`)

    for(let i=0; w>1 && i<=maxpidx && primes[i]<=stop; ++i){
        __.dlog(`      w: ${w}`)
        let pt = primes[i];
        fact.set(pt,0);
        if( factMap.has(w) ){ // w is prime
            fact.set(w,1);
            w = 1;
            break;
        }
        while( w % pt === 0) {
            fact.set(pt, fact.get(pt)+1);
            w /= pt;
        }
        for(let j=1; w % pt === 0; ++j) {
            fact.set(pt, j);
            w /= pt;
            if( w === 1) break;
        }
    }
    __.dlog();
    __.dlog(`factors for n:${n}`);
    __.dlog(fact);
    __.dlog();
    return fact;
}

function smallestmult(target){
    __.dlog(`inside smallestmult(target:${target})`)

    let ret = 1;
    
    for( let i=2;i<=target;++i) {
        let f = factor(i);
        f.forEach((v,k,map)=>{
            let ftv = factMap.get(k);
            if(v>ftv){
                factMap.set(k,v);
            }
        });
    }
    factMap.forEach((v,k,map)=>{
        for( let i=0; i<v; ++i){
            ret *= k
        }
    });

    return ret;
}

/*
driver
*/
let nums = [];

if( ! __.parseCommandLineArgs('sm') ) return(0);
nums = __.getNumbersFromCommandLine()

let primes = [2,3,5,7,11,13,17,19];
let factMap = new Map();
primes.forEach((e,i,arr)=>{
    factMap.set(e,0);
});
__.dlog(`primes:`);
__.dlog(primes);
__.dlog();
__.dlog(`factMap`);
__.dlog(factMap);
__.dlog();

if( nums.length == 0) nums.push(10);
while(nums.length>0){
    let tar = nums.shift()
    let val = smallestmult( tar );
    __.clog()
    __.clog(`target: ${tar}  value: ${val}`);
    __.slog(tar, val);
}
