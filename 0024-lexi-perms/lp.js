'use strict';
let __ = require('./util');

/*
Project Euler

Lexicographic permutations

Problem 24

https://projecteuler.net/problem=24

A permutation is an ordered arrangement of objects. 
For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. 
If all of the permutations are listed numerically or alphabetically,
 we call it lexicographic order. The lexicographic permutations of 
 0, 1 and 2 are:

012   021   102   120   201   210

What is the millionth lexicographic permutation 
of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?

*/

/*
solution
*/
let n=0;
let val='';
function lp(s,target){
    let strlen = s.length;
    let save = `${s}`; // make a new copy of s
    let elems = s.split('');
    __.clog(`elems:`);
    __.clog(elems);
    function recurse(pre,el,d){
        let dd = d+1;
        let dspace = ' '.repeat(dd);

        // __.clog(`${dspace} recurse(pre:${pre}, el:${el.join('')}, d:${d})`);
        el.reduce((a,e,idx,arr)=>{
            // __.clog(`${dspace} el.reduce(a,e:${e},idx:${idx},arr)`);
            // __.clog(`${dspace} arr.length: ${arr.length}`);
            if( val.length>0) return;
            let na = arr.slice();
            na.splice(idx,1);
            // __.clog(`${dspace} na:${na.join('')}`);
            if( na.length > 0 ){
                recurse(pre + '' + e, na,dd);
            }else{
                ++n;
                __.clog(`${dspace} test:${pre + '' +e}  n:${n}`);

                if(n==target && val.length==0){
                    val = pre + '' +e;
                }
            }
            return;
        },[]);
    }
    recurse('',elems,1);
    __.clog(`val: `);
    __.clog(val);

    return val;
}

function lp_compute_it(s,n){
    let strlen = s.length;
    let save = `${s}`; // make a new copy of s
    let elems = s.split('');
    __.clog(`elems:`);
    __.clog(elems);
    let facts = [];
    for(let i=9;i>=0;--i){ facts.push(__.factorial(i));}
    __.clog(`facts:`);
    __.clog(facts);

    n = parseInt(n);

    let remainder = parseInt(n);
    let buildit ='';
    let countUp = 0;
    facts.forEach((e,idx) => {
        __.clog(`============`)
        __.clog(`old     elems: `, elems.join());
        __.clog(`old remainder: `,remainder)
        __.clog(`old  count up: `,countUp)
        __.clog(`            e: `,e)

        let count = 0;
        if( e<remainder) count = Math.trunc(remainder/e);

        __.clog(`        count:`,count)
        
        remainder -= count * e;
        countUp += count * e;
        
        // if(count>elems.length-1)count-=elems.length; 
        let v = elems[count];
        elems.splice(count,1);
        __.clog(`            v: `,v);
        buildit += v;
        __.clog(`       so far: `,buildit);
        __.clog(`new  count up: `,countUp)
        __.clog(`new remainder: `,remainder)
        __.clog(`new     elems: `, elems.join());


    });
        

    return buildit;
}


/*
 1! =         1
 2! =         2
 3! =         6
 4! =        24
 5! =       120
 6! =       720
 7! =     5 040
 8! =    40 320
 9! =   362 880
10! = 3 628 800

0-123-456-789
           2
          6
-------------
        24
       120
      720
------------
    5-040
   40-320
.-362-880
3 628 800
0                 1000000
...................362880
1                  637120     |0.23456789| => 1
...................362880 
             left: 274240     274240/40320 = 6.8xx
1

10...
....................40320           766080
12...
....................40320           806400
13...
....................40320           846720
14...
....................40320           887040
15...
....................40320           927360
16...                         |0.2345.789| => 6
....................40320           967680
             left:  32320     32320/5040 = 6.4

16________....................|0.2345.789|

160...
.....................5040           977760
162...
.....................5040           982800
163...
.....................5040           987840
164...
.....................5040           992880
165...                     
.....................5040           997920
167...                        |0.2345..89| => 7
.....................5040           997920

167_______....................|0.2345..89|


1650..
....720           998640
1652.....                  0..34..789 => 2
....720           999360

16520.
....120           999480   520, 520/120 = 4.3
16523..
....120           999600
16524..
....120           999720
16527..
....120           999840
16528..
....120           999960   40, 40/24 = 1.xx
16529...                   0..34..78. => 9
.... 24           999984   16   16/6 = 2.xx
165293....                 0...4..78. => 3
......6           999990   10   
1652930...
......6           999996    4   
1652934...                 0......78. => 4
......2           999998    4   
16529340
......2           999998    4   
165293407
......2           999998    4   
1652934087
......2           999998    4   





0 -> 9
  12->89
1
  023->89
2
  0134->89 

0 1 2 3 4 5 6 7 8 9
-------------
0 1 2 3 4 5 6 7 8 9
                x y swap
0 1 2 3 4 5 6 7 9 8
------------- roll right
0 1 2 3 4 5 6 8 7 9
                x y swap
0 1 2 3 4 5 6 8 9 7

0 1 2 3 4 5 6 9 7 8

0 1 2 3 4 5 6 9 8 7
------------
0 1 2 3 4 5 7 6 8 9

0 1 2 3 4 5 8 6 7 9

0 1 2 3 4 5 9 6 7 8
------------




*/


/*
driver
*/

if(!__.parseCommandLineArgs('solution')){
    return 0;
}
let strarr = __.getStringsFromCommandLine();
if(strarr.length === 0){
    strarr.push('0123456789');
    strarr.push('1000000');
}

while(strarr.length>0){
    let s = strarr.shift();
    let n = strarr.shift();
    // if(!'0123456789'.includes(s.charAt(0))) s = s.substring(1);
    let nth_perm = lp(s,n)
    let anth_perm = lp_compute_it(s,n);
    __.clog(`lexi string: ${s}`);
    __.clog(`          n: ${n}`);
    __.clog(`   nth_perm: ${nth_perm}`);
    __.clog();

    __.clog(`lexi string: ${s}`);
    __.clog(`          n: ${n}`);
    __.clog(`   nth_perm: ${anth_perm}`);
    __.clog();
}

