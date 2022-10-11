'use strict';
let __ = require('../util');

/*
Project Euler - Sum square difference

https://projecteuler.net/problem=6

Sum square difference

Problem 6

The sum of the squares of the first ten natural numbers is,</p>

$$1^2 + 2^2 + ... + 10^2 = 385$$

The square of the sum of the first ten natural numbers is,</p>

$$(1 + 2 + ... + 10)^2 = 55^2 = 3025$$

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is $3025 - 385 = 2640$.</p>

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

*/

/*
function to solve the problem
*/

/*
Find the difference between the sum of the squares of the 
first one hundred natural numbers and the square of the sum.

*/

//
//  sum of first 'n' numbers 
//  in arithmatic series
//  1, 2, 3, ..., n
//
//  [ n(1 + n) ] / 2
//
function sum_a( n ){
  let ret = ( n * (1 + n) / 2 );
  __.dlog(`sum_a(n:${n}) = ${ret}`)
  return ret;
}

//
//  sum of first 'n' numbers 
//  in geometric series
//  1^2, 2^2, 3^2, ..., n^2
//
//   [ n(n + 1)(2n + 1) ] / 6
//
function sum_g( n ){
  let ret = ( ( n * (n + 1) * (2*n + 1) ) / 6 );
  __.dlog(`sum_g(n:${n}) = ${ret}`)
  return ret;
}

function gitDiff(n){
  let sa = sum_a(n);
  let ret =  sa*sa - sum_g(n);
  return ret;
}

/*
driver
*/
let nums = [];

let msg = [
  'Find the difference between the sum of the squares of the first "N" natural numbers and the square of the sum.',
  'If no value is give, the value of 100 will be used.'
]

if( ! __.parseCommandLineArgs('ssd',msg) ) 
  return(0);

nums = __.getNumbersFromCommandLine()
if( nums.length == 0){
  nums.push(100);
} 

while(nums.length>0){
  let tar = nums.shift()

  let val = gitDiff( tar );

  __.clog();
  __.clog(`target: ${tar}  value: ${val}`);

  __.slog(tar,val);
}
