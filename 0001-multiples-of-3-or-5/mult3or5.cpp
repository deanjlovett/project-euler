#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

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
int mult3or5(int32_t below = 1000){
    int sum = 0;
    for(int i=3; i<below; ++i){
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
     sum5 =  5 *  c5 * ( c5+1)/2

      c15 = (below-1)/15;         // count of div by 15
    sum15 = 15 * c15 * (c15+1)/2;

    let's calc for below 31
       c3 = (below-1)/3              = (31-1)/3 = 30/3                =  10
     sum3 =  3 *  c3 * ( c3 + 1)/2   = 3*(10*(10+1)/2 = 3*10*11/2     = 165
       c5 = (below-1)/5              = (31-1)/5 = 30/5                =   6
     sum5 =  5 *  c5 * ( c5 + 1)/2   = 5 * 6 * (6 + 1) = 30 * 7       = 210
      c15 = (below-1)/15             = (31-1)/15 = 30/15              =   2 
    sum15 = 15 * c15 * (c15 + 1)/2   = 15 * 2 * (2 + 1) / 2 = 15 * 3 =   45


                 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
    div by  3          3        6        9       12       15       18       21       24       27       30
    div by  5                5             10             15             20             25             30   
    div by 15                                             15                                           30
div by 3 or 5          3     5  6        9 10    12       15       18    20 21       24 25    27       30

    sum3or5 = sum3 + sum5 - sum15; 

*/

int mult3or5_fast(int below = 1000){
    int   c3 = (below-1)/3;          // count of div by 3 less than below
    int sum3 =  3 *  c3 * ( c3+1)/2; // n(n+1)/2

    int   c5 = (below-1)/5;          // count of div by 5
    int sum5 =  5 *  c5 * ( c5+1)/2;

    int  c15 = (below-1)/15;          // count of div by 15
    int sum15 = 15 * c15 * (c15+1)/2;

    return sum3 + sum5 - sum15;
}


void coutStuff(int below, int sum, int fast_sum) {
    cout << "below: "<< below  << "  sum: " << sum << "  fast sum: " << fast_sum <<  "  diff: " << sum-fast_sum << endl;
}

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
    int test_v=0;
    vector <string> h_flags;
    h_flags.push_back("-?");
    h_flags.push_back("-h");
    h_flags.push_back("--help");
    bool h_flag = false;

    vector <int> valid_input_values;

    cout << "argc: " << argc << endl;
    cout << "argv[0]: " << argv[0] << " <<< executable name" << endl; 
    for (int i=1; i<argc; ++i) {
        cout << "argv[" << i << "]: " << argv[i];
        if ((test_v = atoi(argv[i])) <= 0) {
            if( !h_flag && std::find(h_flags.begin(),h_flags.end(),argv[i]) != h_flags.end() ){
                h_flag=true;
                cout << " <<< usage flag";
            } else {
                cout << " <<< ignoring";
            }
        } else {
            valid_input_values.push_back(test_v);
        }
        cout << endl;
    }
    cout << endl;

    if( argc > 1){
        if( h_flag ){
            cout<< endl;
            cout<< "usage: " << argv[0] << " [some numbers sepeated by spaces] " << endl;
            cout<< endl;
            cout<< "       -?, -h, --help prints this messaged" << endl;
            cout<< "       ignores args that aren't numbers or one of the help/usage flags" << endl;
            cout<< endl;
            cout<< "       prints the the sum of all the multiples of 3 or 5 below values entered" << endl;
            cout<< endl;
            exit(0);
        }
        for(int input_v : valid_input_values) {
            coutStuff(input_v,mult3or5(input_v),mult3or5_fast(input_v));
        }
    }
    int below=1000;
    if( valid_input_values.size() == 0 ){
        coutStuff(below,mult3or5(below),mult3or5_fast(below));
    }
    return 0;
}