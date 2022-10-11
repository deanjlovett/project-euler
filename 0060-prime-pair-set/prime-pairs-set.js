/*

The primes 3, 7, 109, and 673, are quite remarkable. By taking any two primes and concatenating them in any order the result will always be prime. For example, taking 7 and 109, both 7109 and 1097 are prime. The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.
*/

/* 

implement method to check if number is prime

implement method 

*/
'use strict';
// const {readFileSync,stats, stat} = require('fs');

let _isDebug = true;
function debug_log(...args){
    if(_isDebug) console.log(...args);
}

let p=[2,3,5];
let ps = new Set(p);
function getprimes(limit){
    debug_log(`inside getprimes(lim:${limit})`);
    
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
            ps.add(i);
        }
    }  
    // debug_log('primes:');
    // debug_log(p);
}


function getsomeprimes(limit){
    // debug_log(`inside getsomeprimes(limit:${limit})`);

    if(p[p.length-1]>=limit) {
        return;
    } 
    debug_log(`getting more primes upto: `,limit);

    for(let i=p[p.length-1]+2; p[p.length-1]<limit; i+=2){
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
            ps.add(i);
        }
    }  
    let arrps = [...p].sort((a,b)=>a-b)
    // debug_log('primes set:');
    // debug_log(arrps);
    // debug_log('primes:');
    // debug_log(p);
}

function getprimeatindex(maxindex){
    while(p.length <= maxindex){
        getnextprime();
    }
    return p[maxindex];
}

function getnextprime(){
    // debug_log(`inside getnextprime()`);
    let foundIt = false;
    let i=p[p.length-1]+2;
    for(; !foundIt; i+=2){
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
            ps.add(i);
            foundIt = true;
            break;
        }
    }
    let nextPrime = i;
    // debug_log('  next prime: ', nextPrime);
    return nextPrime;
}

function isItPrime(n){
    let stop = Math.ceil( Math.sqrt( n ) ) + 1;
    getsomeprimes( stop );
    let isItPrime = true;
    for( let j=0; j<p.length && p[j]<stop; ++j){
        if( i % p[j] === 0 ){
            isItPrime = false;
            break;
        }
    }
    return isItPrime;
}

function testPrime(s){
    // console.log(`inside testPrime(s:${s})`);
    let n = parseInt(s);
    getsomeprimes(n);
    if( ps.has(n) ) return true;
    return false;
}


// getsomeprimes(109);
// let pps = [3, 7, 109];
getsomeprimes(673);
let pps = [3, 7, 109, 673];
let tp = getnextprime();
let lpi = p.length-1;
// for(;pps.length<4;tp=getprimeatindex(++lpi)){
for(;pps.length<5;tp=getprimeatindex(++lpi)){
        console.log(`index: ${lpi}   checking: ${tp}   max prime index: ${p.length}    max prime: ${p[p.length-1]}`);
    let isPrime = true;
    for(let i=0; i<pps.length; ++i){
        let e = pps[i];
        if( !testPrime(''+ e + tp) || !testPrime(''+ tp + e)){
            isPrime = false;
            break;
        }
    }
    if( isPrime ){
        pps.push(tp)
    }

}
console.log('pps:')
console.log(pps)
console.log('sum:')
console.log(pps.reduce((a,e)=>a+e,0));






