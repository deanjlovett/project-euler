#include <iostream>
#include  <cstdlib>
#include <vector> 

// #include <iterator> // not needed
// #include <set>      // not needed 
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

    // cout << "outer loop:" << endl;

    for( int i=3; p.size()<target; i+=2){
        // if( 0 == i%100 ) {
        if( i == 11 || i == 101 || i == 1001 || i == 10001 || i == 100001 || i == 200001 ) {
            cout << "    working... testing " << i <<endl;
        }

        // for( int j=1;j<p.size();++j)

        // cout << "  i: " << i << endl;
        // cout << "  inner loop: " << endl;

        bool isItPrime = true;
        // for( int j : p | std::views::drop(1) ){
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