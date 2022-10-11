'use strict';
/*
Project Euler

Power digit sum

Problem 16

https://projecteuler.net/problem=16

2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

What is the sum of the digits of the number 2¹⁰⁰⁰ ( 2^1000 )?
*/

var __ = require('./util');

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
if( ! __.parseCommandLineArgs('pds') ) return(0);
let nums = __.getNumbersFromCommandLine();
if( nums.length==0) nums.push(1000)

if(!__.getIsSilent()){console.log();}
while(nums.length>0){
    let input = nums.shift(); // shift is pop_front
    let ret = pds(input);
    let si = (''+input  ).padEnd(6,' ');
    let sd = (''+ret.dig).padEnd(6,' ');
    
    if(__.getIsSilent()){
        console.log(ret.sum);
    }else{
        console.log(`input: ${si}   digits: ${sd}   sum: `,ret.sum);
    }
}



