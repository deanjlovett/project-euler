#include <iostream>
#include <cstdlib>
#include <vector>

#include <cmath>

using namespace std;

std::vector<int> primes={2,3,5,7};

bool check_prime(int test_prime,int &chk_idx_stop,int &chk_sqr){
  // int stop = ceil( sqrt(double(test_prime)));

  while(chk_sqr<test_prime){
    chk_sqr = primes[++chk_idx_stop]*primes[chk_idx_stop];
  }
  for( int j=2; j<primes.size(); ++j ){
      if( primes[j]>chk_idx_stop ){
          break;
      }
      if( 0 == test_prime % primes[j] ) {
        return false;
      }
  }
  return true;
}

auto getPrimeAtIndex(int target_index){
  int prime=-1;
  if (primes.size()>target_index){
    return primes[target_index];
  }
  for( 
    int test_prime = 11, chk_idx_stop = 2, chk_sqr = 25;
    primes.size()<target_index;
    test_prime += 2
  ) {
    if ( check_prime(test_prime,chk_idx_stop,chk_sqr)){
      primes.push_back(test_prime);
    }
    test_prime += 4;
    if ( check_prime(test_prime,chk_idx_stop,chk_sqr)){
      primes.push_back(test_prime);
    }
  }
  return prime;
}

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
        //     cout << "    working... testing " << test_prime <<endl;
        // }
        bool print_debug = false;
        // if( ((p.size()>>12)<<12) == p.size() ) {
        //     print_debug = true;
        //     cout << "    working... testing " << test_prime 
        //          << "    p.size(): " << p.size() << endl;
        // }

        bool isItPrime = true;
        // bool first=true;
        int stop = ceil( sqrt(double(test_prime)));
        for( int j=1; j<p.size(); ++j ){
            if( p[j]>stop ){
                break;
            }

            // if( p[j]>stop && print_debug){
            //     cout << "    stopping early at index: [" << j << "] of [" 
            //         <<  p.size() << "]. test value["<< test_prime 
            //         << "], stop value: "<< stop << " " << stop*stop << endl;
            //     break;
            // }
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