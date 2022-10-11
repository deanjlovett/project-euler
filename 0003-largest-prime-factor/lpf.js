/*
What is the largest prime factor of the number 600851475143 ?

*/
'use strict';

let targetarr = [];
let target_def = 600851475143;

let primes = [2,3,5,7,11,13,17,19];

function getprimes(targetPrime){
    let lastPrime=primes[primes.length-1];
    for( let j=lastPrime+2; j <= targetPrime; j+=2 ){
        let stop = Math.ceil(Math.sqrt(j)+1);
        let itIsPrime=true;
        for( let i=0; i<primes.length && primes[i]<stop; ++i){
            if( j % primes[i] === 0 ){
                itIsPrime = false;
                break;
            }
        }
        if( itIsPrime ){
            primes.push(j);
            lastPrime=j;
        }
    }
    let pop = primes.pop();
    primes.push(pop);
    return lastPrime;
}

const myArgs = process.argv.slice(2);
console.log('   myArgs: ', myArgs);
while( myArgs.length > 0 ) {
    let tp = parseInt(myArgs.shift())
    if( ! (tp === 0) ){
        targetarr.push(tp);
    }
}
if(targetarr.length === 0) targetarr.push(target_def);
console.log(`targetarr:`);
console.log(targetarr);


while(targetarr.length>0){
    let target = targetarr.shift();
    const larget_int = 9007199254740991;
    console.log();
    console.log(`By the way, the largest integer in Javascript is near :`, larget_int);
    console.log();
    console.log(`What is the largest prime factor of the number ${target} ?`);
    console.log();
    
    let sqrttarget = Math.ceil(Math.sqrt(target))+1;
    
    let ret = getprimes(sqrttarget);
    let revprimes = primes.slice().reverse();
    
    // let largetPrimeFactor = 0
    let pfs = new Set();
    let worklist = [target];


    //
    // we could just stop after we find the first.
    //
    // algorithm
    //
    // get square root of the target number
    // get the ceiling (the integer > target)
    // get the list of primes equal to or less than the ceiling
    // walk through that list of primes, starting at the largest one
    // test to see if that leaves a remainder after modulo
    //

    while(worklist.length>0){
        let mt = worklist.shift();
        for( let i=0; i<revprimes.length  ; ++i){
            if( mt % revprimes[i] === 0) {
                console.log('prime factor: ',revprimes[i])
                pfs.add( revprimes[i] );
                mt = mt / revprimes[i];
                while( mt % revprimes[i] === 0){
                    console.log('            : ',revprimes[i])
                    mt = mt / revprimes[i];
                }
                worklist.push( mt );
                break;
            }
        }
    }
    // console.log('pfs.size: ',pfs.size)
    if( pfs.size === 0 ) {
        pfs.add( target );
    }
    let pfa = [...pfs];
    pfa = pfa.sort((a,b)=>a-b);
    
    // console.log('Larget Prime Factor: ');
    // console.log(largetPrimeFactor);
    console.log();
    console.log(' Prime Factors: ');
    console.log(pfa);
    
    console.log();
    console.log(' Larget Prime Factors: ', pfa.pop());
    console.log();
}

