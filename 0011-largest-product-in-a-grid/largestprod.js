/*
Project Euler

[0011-largest-product-in-a-grid]  

Largest product in a grid

Problem 11
In the 20×20 grid below, four numbers along a diagonal line have been marked in red.

08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08
49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00
81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65
52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91
22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80
24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50
32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70
67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21
24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72
21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95
78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92
16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57
86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58
19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40
04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66
88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69
04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36
20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16
20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54
01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48

The product of these numbers is 26 × 63 × 78 × 14 = 1788696.

What is the greatest product of four adjacent numbers in the 
same direction (up, down, left, right, or diagonally) in the 20×20 grid?
*/

"use strict";
const {readFileSync,stats, stat} = require('fs');

let _isDebug = false;
function debug_log(...args){
    if(_isDebug) console.log(...args);
}


function maxprod(thisgrid){
    let grid = JSON.parse(JSON.stringify(thisgrid));
    // console.log();
    // console.log(grid);
    let maxprod = 0;
    let maxproditems ='';
/*
ir,ic * ir,ic+1 * ir,ic+2 * ir,ic+3
loop ir to ir<length
    loop ic to ic<length-3
        loop is=0 to 3
*/
    let isFirst = true;
    let itemsinsum ='';
    let itemcoord='';

    isFirst = true;
    // horiz
    debug_log();
    debug_log('horizontal');
    for( let ir=0; ir<grid.length; ++ir ){
        for( let ic=0; ic<grid[ir].length-3; ++ic){
            let prod=1;
            itemsinsum='';
            itemcoord='';
            for( let is=0; is<4; ++is){
                let item = grid[ir][ic+is];
                prod *= item
                itemsinsum += ' ' + item;
                itemcoord += ` (${ir},${ic+is})`;
            }
            if( isFirst ){
                isFirst = false;
                debug_log(`                             first coord: ${itemcoord}`);

            }
            if(prod>maxprod){
                maxprod = prod;
                maxproditems = itemsinsum;
                debug_log(`maxprod: ${maxprod} = ${maxproditems}   coord: ${itemcoord}`);
            }
        }
    }

    isFirst = true;
    // vert
    debug_log();
    debug_log('vertical');
    for( let ir=0; ir<grid.length-3; ++ir ){
        for( let ic=0; ic<grid[ir].length; ++ic){
            let prod=1;
            itemsinsum='';
            itemcoord='';
            for( let is=0; is<4; ++is){
                let item = grid[ir+is][ic]; 
                prod *= item
                itemsinsum += ' ' + item;
                itemcoord += ` (${ir+is},${ic})`;
            }
            if( isFirst ){
                isFirst = false;
                debug_log(`                             first coord: ${itemcoord}`);

            }
            if(prod>maxprod){
                maxprod = prod;
                maxproditems = itemsinsum;
                debug_log(`maxprod: ${maxprod} = ${maxproditems}   coord: ${itemcoord}`);
            }
        }
    }

    isFirst = true;
    // easy diagonal
    debug_log();
    debug_log('easy diagonal');
    for( let ir=0; ir<grid.length-3; ++ir ){
        for( let ic=0; ic<grid[ir].length-3; ++ic){
            let prod=1;
            itemsinsum='';
            itemcoord='';
            for( let is=0; is<4; ++is){
                let item = grid[ir+is][ic+is]; 
                prod *= item
                itemsinsum += ' ' + item;
                itemcoord += ` (${ir+is},${ic+is})`;
            }
            if( isFirst ){
                isFirst = false;
                debug_log(`                             first coord: ${itemcoord}`);
            }
            if(prod>maxprod){
                maxprod = prod;
                maxproditems = itemsinsum;
                debug_log(`maxprod: ${maxprod} = ${maxproditems}   coord: ${itemcoord}`);
            }
        }
    }
/*
ir+3,ic * ir+2,ic+1 * ir+1,ic+2 * ir,ic+3
loop ir to ir<length-3
    loop ic to ic<length-3
        loop is=0 to 3, ir=3 to 0 
*/
    isFirst = true;
    // hard diagonal
    debug_log();
    debug_log('hard diagonal');
    for( let ir=3; ir<grid.length; ++ir ){
        for( let ic=0; ic<grid[ir].length-3; ++ic){
            let prod=1;
            itemsinsum='';
            itemcoord='';
            for( let is=0; is<4; ++is){
                let item = grid[ir-is][ic+is]; 
                prod *= item
                itemsinsum += ' ' + item;
                itemcoord += ` (${ir-is},${ic+is})`;
            }
            if( isFirst ){
                isFirst = false;
                debug_log(`                             first coord: ${itemcoord}`);
            }
            if(prod>maxprod){
                maxprod = prod;
                maxproditems = itemsinsum;
                debug_log(`maxprod: ${maxprod} = ${maxproditems}   coord: ${itemcoord}`);
            }
        }
    }
    debug_log();

    return maxprod;
}

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/).filter(e => isNaN(e));
    debug_log(arr); 

    for( let i=0; i<arr.length; ++i ){
        arr[i] = arr[i]
            .split(' ')
            .reduce( (a,e,i,ar)=>{ a.push(parseInt(e)); return a; },[]);            

        // let parsed = arr[i].split(' ');
        // for( let j=0; j<parsed.length; ++j ){
        //     parsed[j] = parseInt(parsed[j])
        // }
        // arr[i] = parsed;        
    }
    debug_log(arr);     
    return arr;
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
    const defaultfile = 'grid.txt';
    debug_log('no filenames passed in from command line.');
    debug_log('using: ',defaultfile );
    filenames.push(defaultfile);
    // console.log('filenames: ', filenames);
}

filenames.forEach((e)=>{
    let arr = syncReadFile(e)
    let ret = maxprod( arr );
    console.log('max prod: ', ret );
});

/*
ir,ic * ir,ic+1 * ir,ic+2 * ir,ic+3
loop ir to ir<length
    loop ic to ic<length-3
        loop is=0 to 3

ir,ic * ir+1,ic * ir+2,ic * ir+3,ic
loop ir to ir<length-3
    loop ic to ic<length
        loop is=0 to 3

ir,ic * ir+1,ic+1 * ir+2,ic+2 * ir+3,ic+3
loop ir to ir<length-3
    loop ic to ic<length-3
        loop is=0 to 3

ir+3,ic * ir+2,ic+1 * ir+1,ic+2 * ir,ic+3
loop ir to ir<length-3
    loop ic to ic<length-3
        loop is=0 to 3, ir=3 to 0 
*/
