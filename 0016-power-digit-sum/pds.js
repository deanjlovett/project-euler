'use strict';
/*
Project Euler

Power digit sum

Problem 16

https://projecteuler.net/problem=16

2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2¹⁰⁰⁰ ( 2^1000 )?
*/

let __ = require('../util');

function pds(num){
    let digits = 0;

    //__.clog(`__.isDebug = ${__.isDebug}`);
    // __.clog(`inside pds(num:${num}){...`);
    // console.log(`inside pds(num:${num}){...`);

    let two = BigInt(2);
    let bignum = BigInt(num);
    let str = '' + two**bignum;
    digits = str.length;
    let sum = 
        str.split('')
        .map(e=>parseInt(e))
        .reduce((a,e)=>a+e,0);

    return {dig:digits,sum:sum};
}

/*
test driver
*/
const default_value = 1000;
const msg = [
    `If no values are given on the command line, the following value is used: ${default_value}`
];
if( ! __.parseCommandLineArgs('pds',msg) ){
    return(0);
} 
let nums = __.getNumbersFromCommandLine();
if( nums.length==0){
    nums.push(default_value);
} 

__.clog();
while(nums.length>0){
    let input = nums.shift(); // shift is pop_front

    let ret = pds(input); // *** <<==  call the problem solving code  ***

    let si = (''+input  ).padEnd(6,' ');
    let sd = (''+ret.dig).padEnd(6,' ');
    
    __.clog(`input: ${si}   digits: ${sd}   sum: `,ret.sum);
    __.slog(ret.sum); // only prints if "-s" flag is used
}



