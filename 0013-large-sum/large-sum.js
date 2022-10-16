/*
Project Euler

Large sum

Problem 13

https://projecteuler.net/problem=13

file:./readm.html

Work out the first ten digits of the sum of the following one-hundred 50-digit numbers:

Answer:  5537376230
Completed on Sun, 18 Sep 2022, 05:53

*/

"use strict";
const {readFileSync,stats, stat} = require('fs');
let __ = require('../util');

let debug_log = __.dlog;

//
// solve the problem
//
// easy using javascript's built in BigInt class.
//

function large_sum(arr1){
    let bnsum = BigInt(0);
    let arr2 = arr1.map(e => BigInt(e));
    debug_log(); 
    debug_log(`inside large_sum(arr)`); 
    debug_log(); 
    debug_log('data as BigInts:');
    debug_log(arr2);

    let ret = arr1
        .map(e => BigInt(e))
        .reduce((a,e)=>a+e,BigInt(0))

    return ret;
}


//
// drivers... stuff to read in data and call the function large_sum()
//

//
// todo: djl, 2022-10-16 
//
// move syncReadFile to util.js
//

function syncReadFile(filename) {
    debug_log(); 
    debug_log(`inside syncReadFile(filename: ${filename})`); 

    const contents = readFileSync(filename, 'utf-8');
    debug_log('  raw content as strings:');
    debug_log(contents); 

//    let arr1 = contents.split(/\r?\n/).filter(e => isNaN(e));

    let arr1 = contents.split(/\r?\n/);//.filter(e => isNaN(e));
    debug_log('  raw data as strings:');
    debug_log(arr1); 

    return arr1;
}
const defaultfile = 'data.txt';
let msg=[
    'Work out the first ten digits of the sum of the given one-hundred 50-digit numbers.',
    '',
    'If no file names are given...',
    `The following file name will be used: ${defaultfile}`
];

if(!__.parseCommandLineArgs('large-sum',msg)){
    return 0;
}
let strarr = __.getStringsFromCommandLine();

let filenames = strarr;

__.vlog();
__.vlog('calling args that are strings, and possibly filenames: ', filenames);
if( filenames.length === 0 ){
    __.vlog();
    __.vlog('no filenames passed in from command line.');
    __.vlog('using: ',defaultfile );
    filenames.push(defaultfile);
}
__.vlog();

__.clog();
filenames.forEach((e)=>{
    debug_log(`inside filenames.forEach((e: ${e})=>{`)
    
    let arr = syncReadFile(e);
    
    debug_log(`  let arr = syncReadFile(e: ${e});`)
    debug_log('     arr:')
    debug_log(arr);

    let lrgsm = '' + large_sum( arr );
    let ret = lrgsm.slice(0,10);
    __.clog('first 10 digits of large sum:', parseInt(ret));
    __.slog(ret)
});
