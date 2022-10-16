'use strict';
let __ = require('../util');

/*
Project Euler - Highly divisible triangular number

https://projecteuler.net/problem=12

Highly divisible triangular number

Problem 12

The sequence of triangle numbers is generated by adding the natural numbers. So the 7th triangle number would be 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28. The first ten terms would be:

1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

Let us list the factors of the first seven triangle numbers:

 1: 1
 3: 1,3
 6: 1,2,3,6
10: 1,2,5,10
15: 1,3,5,15
21: 1,3,7,21
28: 1,2,4,7,14,28
We can see that 28 is the first triangle number to have over five divisors.

What is the value of the first triangle number to have over five hundred divisors?
*/

const clog = __.clog
const dlog = __.dlog


/*

What is the value of the first triangle number to have over five hundred divisors?

*/

//
//  sum of first 'n' numbers 
//  in arithmatic series
//  1, 2, 3, ..., n
//
//  [ n(1 + n) ] / 2
//
// function sum_a( n ){
//   let ret = ( n * (1 + n) / 2 );
//   dlog(`sum_a(n:${n}) = ${ret}`)
//   return ret;
// }

//
// todo: djl,2022-10-16
// look into recurisive factorization
//

let factor_map = new Map();

function factor(n){
  n = Math.trunc(n);
  if( factor_map.has(n)){
    return factor_map.get(n);
  }
  let stop = Math.ceil( Math.sqrt(n) );
  let fct = new Set([1,n]);
  for(let i=2; i<=stop; ++i){
      if( n % i === 0 ){ 
        fct.add(i);
        fct.add(n/i);
      }
  }
  factor_map.set(n,fct);
  return fct;
}

function gethdtri(target){
  let fc = 0;
  let f;
  let t = 0;
  let i = 1;
  let maxc = 0;
  let maxi = 0;
  let maxt = 0;

  dlog();

  for(;maxc<target;++i){
    t += i;
    f = factor(t);
    if( f.size > maxc ){
      maxc = f.size;
      maxi = i;
      maxt = t;
      dlog(`i:`, i);
      dlog(`t:`, t);
      dlog(`fc:`, maxc);
      // dlog(f);
      dlog();
    }
  }

  return maxt;
}

/*
driver
*/

const defualt_num = 500;

let msg = [
  'Prints out the value of the first triangle number to have over the number input.',
  `Default number is ${defualt_num}.`
];

if( ! __.parseCommandLineArgs('hdtri',msg) ){
  return(0);
} 

let nums = [];
nums = __.getNumbersFromCommandLine(); 

clog();
clog('Print out the value of the first triangle number to have over the number input:')
clog();
if(nums.length === 0){
  clog('No number of command line. Using:',defualt_num);
  nums.push(defualt_num);
}else{
  clog('Numbers from the command line:',nums);
}

while(nums.length>0){
  let tar = nums.shift();
  let val = gethdtri( tar );

  clog();
  clog(`target: ${tar}  value: ${val}`);
  __.slog(tar,val)
}
