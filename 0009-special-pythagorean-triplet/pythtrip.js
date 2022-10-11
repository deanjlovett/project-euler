'use strict';
let __ = require('../util');
/*
Project Euler

Special Pythagorean Triplet

Problem 9

https://projecteuler.net/problem=9

Find Pythagorean triplet where a &lt; b &lt; c, a^2 + b^2 = c^2 and a+b+c == 1000

*/


/*
function to solve the problem
*/
function calcdiff(b,c){
    let tsum=1000;
    let csmbs = c*c - b*b;
    let  sqrt = Math.sqrt(csmbs);
    let tsqrt = Math.trunc( sqrt );
    let a = tsum - b - c;
    return tsqrt-a;
}
function pythtrip(){
    // 
    // a + b + c = 1000
    // a^2 + b^2 = c^2
    // est.:   3 < a < 333
    // est.: 292 < b < 500
    // est.: 414 < c < 500

    let c = 499;
    let b = 498;
    let a = 0



    let first_b = 0;
    let last_b = 0;

    let tsum = 1000;

    let foundIt = false;
    let ret ={};
    let innerloopcount = 0;
    for( ;c > 413; --c){
        b=c-1;
        __.clog(`c:${c}  b:${b}`);

        // todo: speed up
        // try leaving early: 
        // by check first and last possible 'b' value, first
        // for tsqrt - a. if both are positive or both negative don't bother
        // 
        // todo: speed up
        // try to calc next 'b' guess base on the first and last 'sqrt - a' 

        first_b = c-1;
        last_b = 292;
        
        for(;b > 292; --b){

            ++innerloopcount;
            __.progdot();

            let csmbs = c*c - b*b;
            let  sqrt = Math.sqrt(csmbs);
            let tsqrt = Math.trunc( sqrt );
            a = tsum - b - c;
            // if( b === c-1 || b===292+1 || Math.abs(tsqrt - a)==1){

            //     if( b === c-1 ){__.clog();__.clog('start');}
            //     if(  b===292+1){__.clog();__.clog('stop');}
            //     __.clog();
            //     __.clog(`    tsqrt:`, tsqrt);
            //     __.clog(`        a:`, a);
            //     __.clog(`tsqrt - a:`, tsqrt - a);
            //     __.clog();
            // }
            if( tsqrt - a === 0 ){
                ret = {a:a, b:b, c:c};

                __.clog();
                __.clog(`possible triple:`, ret);
                __.clog(`a*a + b*b = `, a*a + b*b );
                __.clog(`      c*c = `, c*c );

                if( a*a + b*b === c*c ){
                    __.clog(`found it. a:`, a)

                    foundIt = true;
                    break;
                }else{
                    __.clog(`false alarm! giving up on combo: c:${c}, b:${b}`);
                    __.clog(`skipping this many b values:`, b-292);
                    __.clog();
                    break;
                }
            }
        }
        __.clog();
        if(foundIt) break;
    }

    let ret4 = {a:a*4, b:b*4, c:c*4};

    __.clog();
    __.clog('tried this many triplet:', innerloopcount);
    __.clog();
    __.clog(`pyth triple * 4:`, ret4); 

    ret = {a:a, b:b, c:c};

    __.clog();
    __.clog(`    pyth triple:`, ret); 
    __.slog(`    pyth triple:`, ret); 

    let prod = a*b*c;

    __.slog(`    pyth triple prod:`, prod); 
    __.clog(`    pyth triple prod:`, prod); 
    __.clog();
    return prod;
}

/*
driver
*/

if( ! __.parseCommandLineArgs('pythtrip') ) 
  return(0);

pythtrip();

