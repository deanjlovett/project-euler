'use strict';
let __ = require('../util');
/*
Project Euler

https://projecteuler.net/problem=4

Largest palindrome product

Problem 4

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

Find the largest palindrome made from the product of two 3-digit numbers.

*/

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
            __.dlog(`near miss: ${n}`)
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
    __.vlog(`Largest Palindromic Products found as we walk through the numbers...`)
    for(i=1; i<=999 && !foundit; ++i){
        __.dlog(`i:${i}`);
        // for(j=999; j>=100; --j){
        for(j=1; j<=999; ++j){
            __.dlog(`i:${i}, j:${j}`)
            // process.stdout.write('.');
            test = i*j;
            if(isPalindrome(test)){
                // foundit = true;
                if( test>largest){
                    largest = test;
                    sl = `${test} = ${i} * ${j}`;
                    __.vlog('Largest so far: '+ sl)
                }
                //break;
            }
        }
        __.dlog(``);
    }
    __.dlog(sl);

    return sl;
}

//
// faster algorithm.  counting down from 999 * 999
//

function lpp2(){
    let test = 0;
    // by brute force
    let i=1;
    let j=1;
    let lowkey = 999;
    let foundit = false;
    let jbreakval = 0;
    let largest = 0;
    let previous = 0;
    let sl = '';
    __.vlog(`Largest Palindromic Products found as we walk through the numbers...`)

    for(i=999; i>=1 ; --i){
        __.dlog(`i:${i}`);

        if(jbreakval === 999){ // if the inner loop last gave up at the start, then just give up period
            __.vlog(`i:${i-1}, j:${j}  BREAK out of outer loop. Previous Test:`,test)
            __.vlog(`i:${i}, j:${j}  BREAK out of outer loop.  Current Test:`,i*j, `We have found the largest:`, largest)
            __.vlog(`We will not find a value larger that this:`,i*j, ` as we walk the rest of the values.`)

            break;
        }

        for(j=999; j>=i; --j){
            __.dlog(`i:${i}, j:${j}`)

            test = i*j;
            if(isPalindrome(test)){
                foundit = true;
                if( test>largest){
                    largest = test;
                    sl = `${test} = ${i} * ${j}`;
                    if( i+j<lowkey){
                        lowkey=i+j;
                    }
                    __.vlog('Largest so far: '+ sl)
                }
            }
            if(test<largest){
                __.vlog(`i:${i}, j:${j}  BREAK out of inner loop. test:`, test)
                jbreakval = j;
                break;
            }
        }
        __.dlog(``);
    }
    __.dlog(sl);

    return sl;
}


/*
driver
*/


if( ! __.parseCommandLineArgs('lpp') ) return(0);
let largest = lpp();

__.clog()
__.clog('Find the largest palindrome made from the product of two 3-digit numbers:')
__.clog()
__.clog('Naive, brute force... counting up')
__.clog()
__.clog('Largest Palindrome Product: ' + largest);
__.slog(largest);

let largest2 = lpp2();
__.clog()
__.clog('Find the largest palindrome made from the product of two 3-digit numbers:')
__.clog()
__.clog('less Naive, brute force... counting down')
__.clog('stopping when we realize the test values are moving away from the Max found so far.')
__.clog()
__.clog('Largest Palindrome Product: ' + largest2);
__.slog(largest2);
