'use strict';
let __ = require('../util');

/*
Project Euler

10001st prime

Problem 7

https://projecteuler.net/problem=7

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?

Answer:  104743
Completed on Fri, 9 Sep 2022, 21:39

*/

let p = [2,3,5,7,11,13,17,19,23,29];
//       1,5,7
//       2,6,2,2,
//       012

// primes: 1
//        1
//        1  2
// primes: 1, 2
//              3
// new prime: 3
//        1  2  3

// remove 2 from list
//        1  2
//        1  x  
//        1
// add 3 - 1 more copies
//
//        1 
//              1     1 
//              3     5
//        1     3     5
//           2  3     5
//              3     5
//                                  10                            20                            30
//        1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
//                    5
//        1           5
// 2.3.5=30
//                          1           5     1           5     1           5     1           5
//        1           5     7          11    13          17    19          23    25          29   
//        1                 7          11    13          17    19          23    xx          29   
//           2  3     5     7          11    13          17    19          23                29   
//        1                 7          11    13          17    19          23                29   
// 2.3.5.7=210 210 < 343=7^3, 7,49
//        1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29   
//        1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29     1                 7          11    13          17    19          23                29   
// 2.3.5.7.11=2310 2310 < 14614=11^4, 11,121,1331

// 2.3.5.7.11.13=30030 30030 < 371293=13^5, 

// 2.3.5.7.11.13.17=510510 510510 < 1419857=17^5, 





//             
__.dlog('       p: ', p);
__.dlog('p.length: ', p.length);
function getprime(target_prime_index){
    __.dlog('target_prime_index: ', target_prime_index)

    if( p.length>=target_prime_index){
        return p[target_prime_index-1];
    }
    let lastPrime=p[p.length-1];
    for(let test_prime=lastPrime+2; p.length < target_prime_index; test_prime+=2){
        let itIsPrime=true;
        let stop = Math.ceil(Math.sqrt(test_prime))+1;
        for( let i=0; i<p.length && p[i]<stop; ++i){
            if( test_prime % (p[i]) === 0 ){
                itIsPrime = false;
                break;
            }
        }
        if( itIsPrime ){
            p.push(test_prime);
            __.dlog('push next prime: ', test_prime);
            lastPrime=test_prime;
        }
    }
    // __.dlog('      p.length: ', p.length );
    // __.dlog(' p[p.length-1]: ', p[p.length-1]);
    // let pop = p.pop();
    // __.dlog('           pop: ', pop );
    // __.dlog('     lastPrime: ', lastPrime );
    // p.push(pop);
    return lastPrime;
}
let msg =[
    'If no value is given, the value of 10,001 will be used.'
];

if( ! __.parseCommandLineArgs('ssd',msg) ) 
  return(0);

let nums = __.getNumbersFromCommandLine()
if( nums.length == 0){
  nums.push(10001);
}
//let target = 0
for( let target of nums ){
    let val = getprime(target)
    __.clog('target index:', target, 'value:',val)
    __.slog(target,val)
}


let args = __.getStringsFromCommandLine()
if( __.getIsVerbose() ||
    __.getIsDebug() 
){
    __.clog(p)
}
