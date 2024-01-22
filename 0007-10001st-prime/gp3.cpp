#include <cmath>
#include <cstdlib>
#include <iostream>
#include <stdio.h>
#include <time.h>
#include <vector>

using namespace std;

std::vector<int> primes={2,3,5,7};

bool check_prime(int test_prime,int &chk_idx_stop,int &chk_sqr){
  //bool check_prime(int test_prime,int *pchk_stop,int &chk_sqr){
  // int stop = ceil( sqrt(double(test_prime)));

  while(chk_sqr<test_prime){
    ++chk_idx_stop;
    chk_sqr = primes[chk_idx_stop];
    chk_sqr *= chk_sqr;
  }
  for( int j=2; j<primes.size(); ++j ){
      if( j > chk_idx_stop ){
          break;
      }
      if( 0 == test_prime % primes[j] ) {
        return false;
      }
  }
  return true;
}
int getPrimeAtIndex(int target_index){
  int prime=-1;
  if (primes.size()>target_index){
    return primes[target_index];
  }
  int test_prime = 11, 
    chk_idx_stop = 2, 
    chk_sqr = 25;

  time_t last_time = time(NULL);

  // for( ; primes.size()<target_index; test_prime += 2) {
  int i=1,iprint=1;
  while(true){
    if ( check_prime(test_prime,chk_idx_stop,chk_sqr) ){
      primes.push_back(test_prime);
    }
    test_prime += 4;
    if ( check_prime(test_prime,chk_idx_stop,chk_sqr) ){
      primes.push_back(test_prime);
    }
    if( primes.size()>=target_index ) {
      break;
    }
    test_prime += 2;
    if( i>=iprint ){
      time_t this_time = time(NULL);
      if( this_time-last_time < 5 ){
        iprint = iprint * 2; //<<= 1;
      }else{
        i=1;
        last_time=this_time;
        cout <<        "index:" << primes.size() 
             << ", test_prime:" << test_prime << endl;
      }
    }
  }
  return prime;
}

bool check_prime2(int test_prime,int &chk_idx_stop,int &chk_sqr){
  // int stop = ceil( sqrt(double(test_prime)));

  auto v=primes;
  auto stop=v.cbegin() + chk_idx_stop;
  
  while(chk_sqr<test_prime){
    ++chk_idx_stop;
    ++stop;
    chk_sqr = *stop;
    chk_sqr *= chk_sqr;
  }
  
  for( auto it = v.cbegin() + 2; it != v.end(); ++it ){
    if( *it > *stop){
      break;
    }
    if( 0 == test_prime % *it) {
      return false;
    }
  }
  return true;
}

int getPrimeAtIndex2(int target_index){
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
    auto the_prime = getPrimeAtIndex(target);

    cout << endl;
    int ind=1;
    bool makeabreak=true;
    auto p=primes;
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