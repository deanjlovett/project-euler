
let p = [2,3];
console.log('     p: ', p);
console.log('p.length: ', p.length);
function getprime(targetPrime){
    let lastPrime=3;
    console.log('targetPrime: ', targetPrime)
    let sqrttarget = Math.ceil(Math.sqrt(targetPrime));
    console.log('sqrt(target): ', sqrttarget)
    for(let j=5; p.length < targetPrime; j+=2){
        // console.log('  j: ', j);
        let stop = Math.ceil(Math.sqrt(j));
        //console.log('sqrt(target): ', stop)
    
        let itIsPrime=true;
        for( let i=0; i<p.length && p[i]<stop; ++i){
//        for( let i=0; i<p.length; ++i){
            // console.log('    i: ', i);
            if( j % (p[i]) === 0 ){
                itIsPrime = false;
                break;
            }
        }
        if( itIsPrime ){
            p.push(j);
            console.log('push next prime: ', j);
            lastPrime=j;
        }
    }
    console.log('      p.length: ', p.length );
    console.log(' p[p.length-1]: ', p[p.length-1]);
    let pop = p.pop();
    console.log('           pop: ', pop );
    console.log('     lastPrime: ', lastPrime );
    p.push(pop);
    return lastPrime;
}

let target = 10;
console.log('target: ', target)
const myArgs = process.argv.slice(2);
console.log('   myArgs: ', myArgs);
if( myArgs.length >= 1 ) {
    console.log('myArgs[0]: ', myArgs[0]);
    let tp = parseInt(myArgs[0])
    if( ! (tp === 0) ){
        target = tp;
        console.log('target: ', target)
    }
}

let ret = getprime(target);
console.log('Ans: ', ret);