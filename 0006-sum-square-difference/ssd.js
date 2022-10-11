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
debugging boilerplate
*/
const dline = '========================';
const sline = '------------------------';

let isSilent = false;
let isVerboseLog = false;
let isDebugLog = false;

function progdot(){
    if(!isSilent)
        process.stdout.write('.');
}
function clog(...args){
    if(!isSilent)
        console.log(...args);
}
function dlog(...args){
    if(isDebugLog && !isSilent)
        console.log(...args);
}
function vlog(...args){
    if(isVerboseLog && !isSilent)
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
  dlog(`sum_a(n:${n}) = ${ret}`)
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
  dlog(`sum_g(n:${n}) = ${ret}`)
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
            // isVerboseLog = true;
            // isSilent = true; // what the hell, turn it on here
            // dlog('calling args: ',myArgs)
            // dlog('debug set to TRUE')
        }
        else if( verbosearr.includes(myArgs[0].toLowerCase()) ){
            // isDebugLog = true;  // what the hell, turn it on here
            isVerboseLog = true;
            // isSilent = true;
            // clog('calling args: ',myArgs)
            // clog('verbose set to TRUE')
            // clog('  debug set to TRUE')
        }
        else if( silentarr.includes(myArgs[0].toLowerCase()) ){
            // isDebugLog = false;  // what the hell, turn it on here
            // isVerboseLog = false;
            isSilent = true;
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
            console.log('usage: node ssd.js [number ...][-d] [--debug] [-v] [--verbose]');
            console.log('       -d or --debug. : extra debugging output');
            console.log('       -v or --verbose: extra chatty output');
            console.log();
            console.log('Prints out the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum..');
            console.log();
            return(false);
        }
    }
    dlog()
    dlog('calling args: ',smyArgs)
    dlog()
    if(isVerboseLog) clog('verbose set to TRUE')
    if(isDebugLog)   clog('  debug set to TRUE')
    return true;
}

if( ! parseCommandLineArgs() ) return(0);

if( nums.length == 0) nums.push(10);
clog();
while(nums.length>0){
  let tar = nums.shift()
  dlog();
  let val = gitDiff( tar );

  if(isSilent){
    console.log(val); 
  }else{
    clog();
    clog(`target: ${tar}  value: ${val}`);
  }
}
