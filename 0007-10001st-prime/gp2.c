#include <iostream>
#include  <cstdlib>
#include <vector> 

using namespace std;
/*
Project Euler

10001st prime

Problem 7

https://projecteuler.net/problem=7

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

What is the 10 001st prime number?

Answer:  104743
Completed on Fri, 9 Sep 2022, 21:39

*/

int main(int argc, char** argv){
    cout << "argc: " << argc << endl;
    for (int i=0; i<argc; ++i) {
        cout << "argv[" << i << "]: " << argv[i] << endl;
    }
    cout << endl;

    int target = 11;

    if( argc>1 ){
        int test = atoi(argv[1]);
        if( test>0) {
            target = test;
        }
    }

    int stopit = target+1;
    std::vector<int> p;
    p.push_back(2);

    for( int i=3; p.size()<target; i+=2){
        if( i == 11 || i == 101 || i == 1001 || i == 10001 || i == 100001 || i == 200001 ) {
            cout << "    working... testing " << i <<endl;
        }

        bool isItPrime = true;
        bool first=true;
        for( int j=1; j<p.size(); ++j ){
            // cout << "    p[ j: " << j << " ]: " << p[j] << " << testing i % p[j] "<<endl;
            if( 0 == i % p[j] ) {
                isItPrime = false;
                // cout << "    i: " << i << " is div by: " << p[j] << " !  " << i << " is NOT prime!" << endl;
                break;
            }
        }
        if( !isItPrime ) 
            continue;

        // cout << "    i: " << i << " is prime" << endl;
        p.push_back(i);
    }
    cout << endl;
    int ind=1;
    bool makeabreak=true;
    for( auto it=p.begin(); it != p.end(); ++it,++ind){
        if( ind<6 || target-ind<6 ){
            cout << "  p[ " << ind << " ]: " << *it << endl;
        }
        else if( makeabreak ) {
            makeabreak = false;
            cout << endl;
        }
    }
    return 0;
}