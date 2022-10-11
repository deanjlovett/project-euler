/*
What is the largest prime factor of the number 600851475143 ?

*/
'use strict';

let target = 600851475143;
console.log(`What is the largest prime factor of the number ${target} ?`);

console.log(`  first, find the primes less than the sqrt of ${target} `);

let p = [2,3];
console.log('       p: ', p);
console.log('p.length: ', p.length);

function getprimes(targetPrime){
    let lastPrime=3;
    console.log('targetPrime: ', targetPrime)
    let sqrttarget = Math.floor(Math.sqrt(targetPrime));
    console.log('sqrt(target): ', sqrttarget)
    console.log();
    console.log('for(let j=5;...');
    for( let j=5; j < targetPrime; j+=2 ){
        let stop = Math.floor(Math.sqrt(j)+1);
        // console.log(`  floor(sqrt(j: ${j} )): stop : ${stop}`)
    
        let itIsPrime=true;
        // console.log(`  p.length: ${p.length}`);
        // console.log('  for( let i=0; i<p.length;...');
        for( let i=0; i<p.length && p[i]<stop; ++i){
            if( j % p[i] === 0 ){
                itIsPrime = false;
                break;
            }
        }
        if( itIsPrime ){
            p.push(j);
            // console.log('push next prime: ', j);
            lastPrime=j;
        }
    }
    console.log('      p.length: ', p.length );
    console.log(' p[p.length-1]: ', p[p.length-1]);
    console.log(' p[...]: \n', p);

    let pop = p.pop();
    console.log('           pop: ', pop );
    console.log('     lastPrime: ', lastPrime );
    p.push(pop);
    return lastPrime;
}


const myArgs = process.argv.slice(2);
console.log('   myArgs: ', myArgs);
if( myArgs.length >= 1 ) {
    console.log('myArgs[0]: ', myArgs[0]);
    let tp = parseInt(myArgs[0])
    if( ! (tp === 0) ){
        target = tp;
        console.log('target: ', target)
    }
}
console.log();
console.log('      target: ', target);

let sqrttarget = Math.floor(Math.sqrt(target));

console.log('sqrt(target): ', sqrttarget);
console.log();

let ret = getprimes(sqrttarget);


console.log();
console.log('p:');
console.log(p);
console.log();

let revp = p.slice().reverse();
console.log('revp:');
console.log(revp);
console.log();

let largetPrimeFactor = 0
let pfs = new Set();
let w = [target];
while(w.length>0){
    let mt = w.shift();
    for( let i=0; i<revp.length; ++i){
        if( mt % revp[i] === 0) {
            console.log('prime factor: ',revp[i])
            pfs.add( revp[i] );
            mt = mt / revp[i];
            while( mt % revp[i] === 0){
                console.log('            : ',revp[i])
                mt = mt / revp[i];
            }
            w.push( mt );
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
console.log(' Prime Factors: ');
console.log(pfa);
