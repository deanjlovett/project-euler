/*
https://projecteuler.net/problem=13

Project Euler
Large Sum
Problem #13

Work out the first ten digits of the sum of the following one-hundred 50-digit numbers.

*/

"use strict";
const {readFileSync,stats, stat} = require('fs');

let _isDebug = false;
function debug_log(...args){
    if(_isDebug) console.log(...args);
}

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

let filenames = [];

const myArgs = process.argv.slice(2);
debug_log('calling args: ',myArgs)
filenames = myArgs.reduce(
    (a,ef,i,arr)=>{
        a.push(ef);
        return a;
    },[]
);

debug_log('filenames: ', filenames);
if( filenames.length === 0 ){
    const defaultfile = 'data.txt';
    debug_log('no filenames passed in from command line.');
    debug_log('using: ',defaultfile );
    filenames.push(defaultfile);
}

debug_log();

filenames.forEach((e)=>{
    debug_log(`inside filenames.forEach((e: ${e})=>{`)
    
    let arr = syncReadFile(e);
    
    debug_log(`  let arr = syncReadFile(e: ${e});`)
    debug_log('     arr:')
    debug_log(arr);

    let lrgsm = '' + large_sum( arr );
    let ret = lrgsm.slice(0,10);
    console.log('first 10 digits of large sum: ');
    debug_log('0123456789');
    console.log( ret );
    console.log();
});
