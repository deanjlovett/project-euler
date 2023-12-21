/*
    // first pass:
    let sum=0;
    for(let i=3; i<below;++i){
        if( i%3 === 0 || i%5 === 0 ){
            sum += i;
        }
    }
    return sum;

    // alternate: faster only walk through multiples of threes and fives
    let sum=0;
    for(auto i=3; i<below; i+=3){
        sum += i;
    }
    for(auto i=5; i<below; i+=5){
        if( i%3 != 0){
            sum += i;
        }
    }

    // calc in constant time
    //     sum = sum3 + sum5 - sum15; 
    //  why?
    //  sum3 will also include sum15
    //  sum5 will also include sum15
    //  we've double counted the sum15 items
    //  just subtract that extra sum15
    //
    // int math.  division will truncate
       c3 = (below-1)/3;          // count of div by 3 less than below
     sum3 =  3 *  c3 * ( c3+1)/2; // n(n+1)/2

       c5 = (below-1)/5;          // count of div by 5
     sum5 =  5 *  c5 * ( c5-1)/2

      c15 = (below-1)/5;          // count of div by 15
    sum15 = 15 * c15 * (c15-1)/2;

    let's calc for below 31
       c3 = (below-1)/3              = (31-1)/3 = 30/3                =  10
     sum3 =  3 *  c3 * ( c3 + 1)/2   = 3*(10*(10+1)/2 = 3*10*11/2     = 165
       c5 = (below-1)/5              = (31-1)/5 = 30/5                =   6
     sum5 =  5 *  c5 * ( c5 + 1)/2   = 5 * 6 * (6 + 1) = 30 * 7       = 210
      c15 = (below-1)/5              = (31-1)/15 = 30/15              =   2 
    sum15 = 15 * c15 * (c15 + 1)/2   = 15 * 2 * (2 + 1) / 2 = 15 * 3 =   45


                 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
    div by  3          3        6        9       12       15       18       21       24       27       30
    div by  5                5             10             15             20             25             30   
    div by 15                                             15                                           30
div by 3 or 5          3     5  6        9 10    12       15       18    20 21       24 25    27       30

    sum3or5 = sum3 + sum5 - sum15; 

*/

function mult3or5_fast(below){
    c3   = (below-1)/3;          // count of div by 3 less than below
    sum3 =  3 *  c3 * ( c3+1)/2; // n(n+1)/2

    c5   = (below-1)/5;          // count of div by 5
    sum5 =  5 *  c5 * ( c5+1)/2;

    c15   = (below-1)/15;          // count of div by 15
    sum15 = 15 * c15 * (c15+1)/2;

    return sum3 + sum5 - sum15;
}


function mult3or5(below){
    let sum=0;
    for(let i=3; i<below;++i){
        if( i%3 === 0 || i%5 === 0 ){
            sum += i;
        }
    }
    return sum;
}

let target = 1000;
let ret = mult3or5(target);
console.log(ret);