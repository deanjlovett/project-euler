'use strict';

/*
Project Euler

https://projecteuler.net/problem=4

Largest palindrome product

Problem 4

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

*/

/*
debugging boilerplate
*/
const dline = '========================';
const sline = '------------------------';

let isConLog = true;
let isDebugLog = false;

function progdot(){
    if(isConLog)
        process.stdout.write('.');
}
function clog(...args){
    if(isConLog)
        console.log(...args);
}
function dlog(...args){
    if(isDebugLog && isConLog)
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

function isPalindrome(n){
    // clog(`inside isPalindrome(n:${n})`)
    let s = '' + n;
    let i = 0;
    let j = s.length-1;
    let sa = s.split('')
    // clog(sa)
    for(; i < j; ++i,--j){
        if(sa[i] != sa[j]){
            return false;
        }else{
            // clog(`near miss: ${n}`)
        }
    }
    return true;
}

function lpp(){
    let test = 0;
    // by brute force
    let i=1;
    let j=1;
    let foundit = false;
    let largest = 0;
    let sl = '';
    // for(i=999; i>=100 && !foundit; --i){
    for(i=1; i<=999 && !foundit; ++i){
            // clog(`i:${i}`);
        // for(j=999; j>=100; --j){
        for(j=1; j<=999; ++j){
            // clog(`i:${i}, j:${j}`)
            // process.stdout.write('.');
            test = i*j;
            if(isPalindrome(test)){
                // foundit = true;
                if( test>largest){
                    largest = test;
                    sl = `Palindrome product: ${test} = ${i} * ${j}`;
                    dlog(sl)
                }
                //break;
            }
        }
        // clog(``);
    }
    clog(sl);

    return 0;
}


/*
driver
*/

function parseCommandLineArgs(){
    let isError = false;
    let unknownArgs = [];
    const myArgs = process.argv.slice(2);
    let debugstrarr=['-d','--debug'];
    let verbosearr=['-v','--verbose'];
    for( ; myArgs.length >= 1; myArgs.shift()){
        // let test=parseInt(myArgs[0]);
        if( debugstrarr.includes(myArgs[0].toLowerCase()) ){
            isDebugLog = true;
            isConLog = true; // what the hell, turn it on here
            dlog('calling args: ',myArgs)
            dlog('debug set to TRUE')
        }
        else if( verbosearr.includes(myArgs[0].toLowerCase()) ){
            isDebugLog = true;  // what the hell, turn it on here
            isConLog = true;
            clog('calling args: ',myArgs)
            clog('debug set to TRUE')
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
            console.log('usage: node lpp.js [-d] [--debug] [-v] [--verbose]');
            console.log('       -d or --debug. : extra debugging output');
            console.log('       -v or --verbose: extra chatty output');
            console.log();
            return(false);
        }
    }
    return true;
}

if( ! parseCommandLineArgs() ) return(0);
lpp();
