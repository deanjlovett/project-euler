#include <iostream>
// #include <deque>

using namespace std;

/**
 * @brief mult3or5. 
 * 
 * Returms sum of positive ints divisible by 3 or 5 below the given value
 * 
 * @param below 
 * @return int 
 * 
 */
int mult3or5(auto below = 1000){
    auto sum = 0;
    for(auto i=3; i<below; ++i){
        if( i%3 == 0 || i%5 == 0 ){
            sum += i;
        }
    }
    return sum;
}

/*
    // first pass:
    int sum=0;
    for(let i=3; i<below;++i){
        if( i%3 === 0 || i%5 === 0 ){
            sum += i;
        }
    }
    return sum;

    O(n) opertions

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
    O(n) opertions, but almost twice as fast as the previous
    
    but now 8/15 as many: 5/15 as many to grab div by 3, 3/15 as many to grab div by 5


    O(c) is possible

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
/**
 * @brief main
 * 
 * @param argc 
 * @param argv 
 * @return int
 * 
 * Simple drive for mult3or5
 */
int main(int argc, char** argv) {
    cout << "argc: " << argc << endl;
    for (int i=0; i<argc; ++i) {
        cout << "argv[" << i << "]: " << argv[i] << endl;
    }
    cout << endl;

    // struct Pair{
    //     int below;
    //     int sum;
    //     Pair(int b, int s):below(b),sum(s){};
    //     friend ostream& operator<<(ostream& os, const Pair& p){
    //         os << 'below: ' p.below  << '  sum: ' << p.sum ;
    //         return os;
    //     }
    // };
    // deque<Pair> dq;

    void coutStuff(auto below, auto sum){
        cout << 'below: '<< below  << '  sum: ' << sum << endl;
    }

    auto below = 1000;
    auto count = 0;

    if( argc < 2){
        for(auto i=1;i<argc;++i){
            if( (below = atoi(argv[i]) > 0 ){
                ++count;
                coutStuff(below,mult3or5(below));
                // cout << 'below: ' below  << '  sum: ' << mult3or5(below);
            }
        }
    }
    if( count == 0 ){
        coutStuff(below,mult3or5(below));
        // cout << 'below: ' below  << '  sum: ' << mult3or5(below);
    }
    return 0;
}