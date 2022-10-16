/*
Project Euler

015-lattice-paths

Starting in the top left corner of a 2×2 grid, 
and only being able to move to the right and down, 
there are exactly 6 routes to the bottom right corner.

How many such routes are there through a 20×20 grid?
*/

"use strict";

// todo: djl 2022-10-16
// use the new-ish util.js stuff
// let __ = require('../util');

//let isDebug = false;

let x = -1;
let y = -1;

let arr = [];
/* 
  "thinking onto paper"

  1  1  1  1  1  1
  1  2  3  4  5  6
  1  3  6 10 15 21
  1  4 10 20 35 55

  smells like pascal triangle

*/

function getlatticepaths(endx,endy){  
    arr = new Array(endx+1)
        .fill(
            new Array(endy+1).fill(1)
        );

    arr.forEach(e => console.log('  ',e));

    arr.forEach((ex,ix,xarr)=>{
        xarr[ix] = new Array(endy+1).fill(1);
        if(ix!==0){
            ex.forEach((ey,iy,yarr)=>{
                if(iy!==0){
                    xarr[ix][iy] = xarr[ix][iy-1] + xarr[ix-1][iy];
                }
            });
        }
    });
    // console.log();
    // console.log('arr: [');
    // arr.forEach(e => console.log('  ',e));
    // console.log(']');
    return arr[endx][endy];
}

const myArgs = process.argv.slice(2);
console.log('calling args: ',myArgs)
for( ; myArgs.length >= 1; myArgs.shift()){
    let teststr = myArgs[0].toLowerCase();
    let test = parseInt(myArgs[0]);
    if( !isNaN(test)){
        if( x === -1) {
            x = test;
        }else if( y === -1){
            y = test;
        }
    }
    else if( myArgs.length >= 2 ) {
        let testint = parseInt(myArgs[1]);
        if(!isNan(testint)){
            if( widthstrarr.includes(myArgs[0])){
                x = testint;
            }
            else if( heightstrarr.includes(myArgs[0])){
                y = testint;
            }
        }
    }
    else{
        console.log('usage: node latticepath.js [x [y]]');
        console.log('       x :  width of grid');
        console.log('                 ( default value is 20, twenty )');
        console.log('       y : height of grid');
        console.log('                 ( default value of x)');
        console.log('       if both x & y are absent, both will default to 20, twenty )');

        return(0);
    }    
}
if( x == -1 && y == -1){
    x = y = 20;
}else if( x === -1 ){
    x = y;
}else if( y === -1 ){
    y = x;
}
console.log(' x: ',x);
console.log(' y: ',y);

let ret=getlatticepaths(x,y);

console.log('number of lattice paths : ', ret);

/* 
function getlatticepaths(endx,endy){  
    // if( isDebug ){
    //    console.log(`inside getlatticepaths( endx: ${endx}, endy: ${endy} )`);
    // }
    arr = new Array(endx+1).fill(new Array(endy+1).fill(1));
    console.log('arr: ', arr);
    console.log();
    console.log('arr: [');
    arr.forEach(e => console.log('  ',e));
    console.log(']');

    arr.forEach((ex,ix,xarr)=>{
        xarr[ix] = new Array(endy+1).fill(1);

        console.log('  =================================');
        console.log('  inside arr.forEach((ex,i,xarr)=>{');
        console.log('      ex: ', ex );
        console.log('      ix: ', ix );
        console.log('    xarr: ', xarr );
        if(ix!==0){
            ex.forEach((ey,iy,yarr)=>{
                console.log('    ---------------------------------');
                console.log('    inside ex.forEach((ey,iy,yarr)=>{');
                console.log('           ix: ', ix, '  iy: ', iy );
                if(iy!==0){
                    console.log('                    ey: ', ey);
                    console.log(`    xarr[ix  :${ix}][iy-1:${iy-1}]: `, xarr[ix][iy-1]);
                    console.log(`    xarr[ix-1:${ix-1}][iy  :${iy}]: `, xarr[ix-1][iy]);
                    xarr[ix][iy] = xarr[ix][iy-1] + xarr[ix-1][iy];
                }
            });
        }
        console.log('          ex: ', ex);
        console.log(`  xarr[ix:${ix}]: `, xarr[ix]);
    });
    console.log();
    console.log('arr: [');
    arr.forEach(e => console.log('  ',e));
    console.log(']');



    return arr[endx][endy];
}

const myArgs = process.argv.slice(2);
console.log('calling args: ',myArgs)
let helpstrarr =   ['-h','--help'];
let debugstrarr =  ['-d','--debug'];
let widthstrarr =  ['-x'];
let heightstrarr = ['-y'];
for( ; myArgs.length >= 1; myArgs.shift()){
    let teststr = myArgs[0].toLowerCase();
    let test = parseInt(myArgs[0]);
    if( !isNaN(test)){
        if( x === -1) {
            x = test;
        }else if( y === -1){
            y = test;
        }
    }
    else if( debugstrarr.includes(teststr) ){
        isDebug = true;
        console.log('debug set to TRUE')
    }
    else if( myArgs.length >= 2 ) {
        let testint = parseInt(myArgs[1]);
        if(!isNan(testint)){
            if( widthstrarr.includes(myArgs[0])){
                x = testint;
            }
            else if( heightstrarr.includes(myArgs[0])){
                y = testint;
            }
        }
    }
    else{
        // let shelp = myArgs[0].toLowerCase();
        // if( shelp === '-h' || '--help')
        console.log('usage: node latticepath.js [x [y]] [-x width] [-y height] [-d | --debug] [-h | --help');
        console.log('       x | width:  width of grid');
        console.log('                 ( default value is 20, twenty )');
        console.log('       y | height: height of grid');
        console.log('                 ( default value is 20, twenty )');
        console.log('       -d or --debug: extra debugging outup');
        return(0);
    }    
}
if( x == -1 && y == -1){
    x = y = 20;
}else if( x === -1 ){
    x = y;
}else if( y === -1 ){
    y = x;
}
console.log(' x: ',x);
console.log(' y: ',y);

let ret=getlatticepaths(x,y);

console.log('number of lattice paths : ', ret);


*/