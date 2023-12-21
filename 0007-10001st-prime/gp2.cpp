#include <iostream>
#include <cstdlib>
#include <vector>

#include <cmath>

using namespace std;

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


    for( int test_prime=3; p.size()<target; test_prime += 2){
        // if( test_prime == 11 || test_prime == 101 || test_prime == 1001 || test_prime == 10001 || test_prime == 100001 || test_prime == 200001 ) {
            cout << "    working... testing " << test_prime <<endl;
        // }

        bool isItPrime = true;
        // bool first=true;
        int stop = ceil( sqrt(double(test_prime)));
        for( int j=1; j<p.size(); ++j ){
            if( p[j]>stop ){
                cout << "    stopping early at index: [" << j << "] of [" 
                    <<  p.size() << "]. test value["<< test_prime 
                    << "], stop value: "<< stop << " " << stop*stop << endl;
                break;
            }
            // cout << "    p[ j: " << j << " ]: " << p[j] << " << testing test_prime % p[j] "<<endl;
            if( 0 == test_prime % p[j] ) {
                isItPrime = false;
                // cout << "    test_prime: " << test_prime << " is div by: " << p[j] << " !  " << test_prime << " is NOT prime!" << endl;
                break;
            }
        }
        if( !isItPrime ) 
            continue;

        // cout << "    test_prime: " << test_prime << " is prime" << endl;
        p.push_back(test_prime);
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