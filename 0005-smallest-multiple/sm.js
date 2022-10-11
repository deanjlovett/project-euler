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
debugging boilerplate
*/
const dline = '========================';
const sline = '------------------------';

let isSilent = true;
let isVerboseLog = false;
let isDebugLog = false;

function progdot(){
    if(isSilent)
        process.stdout.write('.');
}
function clog(...args){
    if(isSilent)
        console.log(...args);
}
function dlog(...args){
    if(isDebugLog && isSilent)
        console.log(...args);
}
function vlog(...args){
    if(isVerboseLog && isSilent)
        console.log(...args);
}

function clogdline(){
    clog(dline);
}
function clogsline(){
    clog(sline);
}

function dlogdline(){
    dlog(dline);
}
function dlogsline(){
    dlog(sline);
}

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
    dlog(`  inside factor(n:${n})`)

    let w = n;
    let maxpidx = primes.length-1;    
    let stop = Math.trunc( Math.sqrt(n) ) + 1;
    // let lastPrime = primes[maxpidx];

    dlog(`    right before while(stop>primes[maxpidx:${maxpidx}])`)

    while(stop>primes[maxpidx]){
        lastPrime = getNextPrime();
        maxpidx = primes.length-1;
    }
    let fact = new Map();

    dlog(`    right before or(let i=0; i<=maxpidx:${maxpidx} && primes[i:0]:${primes[0]} < stop:${stop}; ++i){`)

    for(let i=0; w>1 && i<=maxpidx && primes[i]<=stop; ++i){
        dlog(`      w: ${w}`)
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
    dlog();
    dlog(`factors for n:${n}`);
    dlog(fact);
    dlog();
    return fact;
}

function smallestmult(target){
    dlog(`inside smallestmult(target:${target})`)

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

function parseCommandLineArgs(){
    
    let isError = false;
    let unknownArgs = [];
    const myArgs = process.argv.slice(2);
    let debugstrarr=['-d','--debug'];
    let verbosearr=['-v','--verbose'];
    let silentarr=['-s','--silent'];
    let smyArgs = myArgs.slice();
    for( ; myArgs.length >= 1; myArgs.shift()){
        let test=parseInt(myArgs[0]);
        if( debugstrarr.includes(myArgs[0].toLowerCase()) ){
            isDebugLog = true;
            isVerboseLog = true;
            isSilent = true; // what the hell, turn it on here
            // dlog('calling args: ',myArgs)
            // dlog('debug set to TRUE')
        }
        else if( verbosearr.includes(myArgs[0].toLowerCase()) ){
            isDebugLog = true;  // what the hell, turn it on here
            isVerboseLog = true;
            isSilent = true;
            // clog('calling args: ',myArgs)
            // clog('verbose set to TRUE')
            // clog('  debug set to TRUE')
        }
        else if( silentarr.includes(myArgs[0].toLowerCase()) ){
            isDebugLog = false;  // what the hell, turn it on here
            isVerboseLog = false;
            isSilent = false;
        }
        else if(test>0){
            nums.push(test);
        }
        else{
          isError = true;
          unknownArgs.push(myArgs[0]);
        }
        if(isError){
            console.log();
            console.log('unknown args:',unknownArgs )
            // let shelp = myArgs[0].toLowerCase();
            // if( shelp === '-h' || '--help')
            console.log();
            console.log('usage: node sm.js [number ...][-d] [--debug] [-v] [--verbose]');
            console.log('       -d or --debug. : extra debugging output');
            console.log('       -v or --verbose: extra chatty output');
            console.log();
            console.log('       Prints out the smallest positive number that is evenly divisible by all of the numbers from 1 to 20.');
            console.log();
            return(false);
        }
    }
    dlog()
    dlog('calling args: ',myArgs)
    if(isVerboseLog) clog('verbose set to TRUE')
    if(isDebugLog)   clog('  debug set to TRUE')
    return true;
}

if( ! parseCommandLineArgs() ) return(0);

let primes = [2,3,5,7,11,13,17,19];
let factMap = new Map();
primes.forEach((e,i,arr)=>{
    factMap.set(e,0);
});
dlog(`factMap`);
dlog(factMap);
dlog();

if( nums.length == 0) nums.push(10);
while(nums.length>0){
    let tar = nums.shift()
    let val = smallestmult( tar );
    console.log()
    console.log(`target: ${tar}  value: ${val}`);
}
