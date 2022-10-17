/*
Project Euler

067-max-path-sum-2

By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

3
7 4
2 4 6
8 5 9 3

(3)
(7) 4
 2 (4) 6
 8  5 (9) 3

That is, 3 + 7 + 4 + 9 = 23.

Find the maximum total from top to bottom in triangle.txt (right click and 'Save Link/Target As...'), a 15K text file containing a triangle with one-hundred rows.

NOTE: This is a much more difficult version of Problem 18. 
It is not possible to try every route to solve this problem, 
as there are 299 altogether!
If you could check one trillion (1012) routes every second 
it would take over twenty billion years to check them all.  
There is an efficient algorithm to solve it. ;o)
*/

"use strict";
const {readFileSync,stats, stat} = require('fs');

let isDebug = false;


//
// algorithm used:
//
// loop accros 2nd to last row
// look at the child nodes.
// add the largest of the two child nodes to that node.
// move to the next node to the right
// when row is completed, repeat for the next row up
//
// at the end the top most row will have the sum for the max sum path
//
// O(n^2) operations, where n is the number of rows in the tree
//
// note: tree reading is not robust.  There cannot be a blank line at the end
//
// todo: djl, 2022-10-16
//  make tree reading more robust
//

function maxpathsum2(thisTree){
    let tree = JSON.parse(JSON.stringify(thisTree));
    // console.log();
    // console.log(tree);
    tree.reverse();
    for( let ir=1; ir<tree.length; ++ir ){
        for( let ic=0; ic<tree[ir].length; ++ic){
            tree[ir][ic] += 
            tree[ir-1][ic  ] > tree[ir-1][ic+1] ? 
            tree[ir-1][ic  ] : 
            tree[ir-1][ic+1];
        }
    }
    tree.reverse();
    console.log('max path sum: ', tree[0][0])
    console.log();
    return tree[0][0];
}

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    console.log(arr); 

    for( let i=0; i<arr.length; ++i ){
        if(arr[i].length===0 ){
            continue;
        }
        let tmp = 
        arr[i] = arr[i]
            .split(' ')
            .reduce( (a,e,i,ar)=>{ a.push(parseInt(e)); return a; },[]);            

        // let parsed = arr[i].split(' ');
        // for( let j=0; j<parsed.length; ++j ){
        //     parsed[j] = parseInt(parsed[j])
        // }
        // arr[i] = parsed;        
    }
    console.log(arr);     
    return arr;
}

let filenames = [];

const myArgs = process.argv.slice(2);
console.log('calling args: ',myArgs)
filenames = myArgs.reduce(
    (a,ef,i,arr)=>{
        a.push(ef);
        return a;
    },[]
);

const defaultfile = 'triangle-small.txt';
const defaultfile_bigdata = 'triangle-large.txt'
console.log('filenames: ', filenames);
if( filenames.length === 0 ){
    console.log('no filenames passed in from command line.');
    console.log('using: ',defaultfile );
    console.log('using: ',defaultfile_bigdata );
    filenames.push(defaultfile);
    filenames.push(defaultfile_bigdata)
    // console.log('filenames: ', filenames);
}

filenames.forEach((e)=>{
    let arr = syncReadFile(e)
    maxpathsum2( arr );
});

