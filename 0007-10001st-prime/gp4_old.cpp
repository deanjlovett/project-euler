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

  while(chk_sqr<=test_prime){
    ++chk_idx_stop;
    chk_sqr = primes[chk_idx_stop+1];
    chk_sqr *= chk_sqr;
  }
  for( int j=2; j<primes.size(); ++j ){
      if( j > chk_idx_stop ){
          return true;
      }
      if( 0 == test_prime % primes[j] ) {
        return false;
      }
  }
  return true;
}
void check_n_push(int test_prime,int &chk_idx_stop,int &chk_sqr){
    if ( check_prime(test_prime,chk_idx_stop,chk_sqr) ){
      primes.push_back(test_prime);
    }
}
int getPrimeAtIndex(int target_index){
  int prime=-1;
  if (primes.size()>target_index){
    return primes[target_index];
  }
  int test_prime = 11, 
    chk_idx_stop = -1, 
    chk_sqr = 4;

  time_t last_time = time(NULL);
  time_t first_time = last_time;

  // while(true){
  int i=0,iprint=1;
  for( ; primes.size()<target_index; test_prime += 4) {
    check_n_push( test_prime, chk_idx_stop, chk_sqr );
    test_prime += 2;
    check_n_push( test_prime, chk_idx_stop, chk_sqr );

    if( ++i >= iprint ){
      // cout << i << endl;
      time_t this_time = time(NULL);
      if( this_time-last_time < 5 ){
        // iprint = iprint * 2; //<<= 1;
        iprint <<= 1;
      }else{
        i=1;
        time_t diff_time = this_time-last_time; 
        if(diff_time>10){
          iprint >>= 1;
        }
        last_time=this_time;
        time_t total_time = last_time-first_time;
        std::cout.imbue(std::locale(""));
        cout <<        "index: " << primes.size() 
             << "  test_prime: " << test_prime 
             << "  diff: " << diff_time
             << "  ip: " << iprint
             << "  runtime: " << total_time/60 <<" minutes, " << total_time % 60 << " seconds" << endl;
      }
    }
  }
  return prime;
}
//==========================
//==========================

bool check_prime2(int test_prime,int &chk_idx_stop,int &chk_sqr){
  //bool check_prime(int test_prime,int *pchk_stop,int &chk_sqr){
  // int stop = ceil( sqrt(double(test_prime)));

  while(chk_sqr<=test_prime){
    cout << "  chk_sqr <= test_prime :: " << chk_sqr << " <= " << test_prime << endl;
    cout << "    chk_idx_stop == " << chk_idx_stop << "  primes[chk_idx_stop]: " << primes[chk_idx_stop] << endl;
    ++chk_idx_stop;
    cout << "    chk_idx_stop == " << chk_idx_stop << "  primes[chk_idx_stop]: " << primes[chk_idx_stop] << endl;
    chk_sqr = primes[chk_idx_stop+1];
    chk_sqr *= chk_sqr;
    cout << "         chk_sqr == " << chk_sqr << endl << endl;
  }
  for( int j=2; j<primes.size(); ++j ){
      if( j > chk_idx_stop ){
          break;
      }
      cout << "    checking p[" << j << "]: " << primes[j] << endl;

      if( 0 == test_prime % primes[j] ) {
        cout << "      test_prime: " << test_prime << " has " << primes[j] << " as a factor." << endl;

        return false;
      }
  }
  return true;
}
void check_n_push2(int test_prime,int &chk_idx_stop,int &chk_sqr){
    cout << "  -----------------------------" << endl;
    cout << "  test_prime :: " << test_prime << endl;
    if ( check_prime2(test_prime,chk_idx_stop,chk_sqr) ){
      primes.push_back(test_prime);
      cout << "    pushed onto prime list :: " << test_prime << endl << endl;
    } else {
      cout << "    discarded. " << test_prime << " is not prime." << endl << endl;
    }
}
int getPrimeAtIndex2(int target_index){
  int prime=-1;
  if (primes.size()>target_index){
    return primes[target_index];
  }
  int test_prime = 11, 
    chk_idx_stop = -1, 
    chk_sqr = 4;

  time_t last_time = time(NULL);

  // while(true){
  int i=1,iprint=1;
  for( ; primes.size()<target_index; test_prime += 4) {
    cout << "  =============================" << endl;

    check_n_push2( test_prime, chk_idx_stop, chk_sqr );

    test_prime += 2;
    check_n_push2( test_prime, chk_idx_stop, chk_sqr );

    // if( primes.size()>=target_index ) {
    //   break;
    // }
    // test_prime += 4;
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

//==========================
bool check_prime3(int test_prime,int &chk_idx_stop,int &chk_sqr){
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

typedef long myint;
std::vector<long> p = {2,3,5,7,11,13,17,19,23,29};

size_t len(std::vector<long> mv) { return mv.size();}

bool validate_prime_range(long pos_prime, std::vector<long> p, long idx){
	long stop = trunc( sqrt( (double)pos_prime ) )+1;
	vector<long>::iterator it;
	for( it = p.begin()+idx; it != p.end(); ++it){
		if(                  *it  > stop ) return true;
		else if( pos_prime % *it == 0    ) return false;
	}
	return true;
}


long getPrimeAtIndex3(long target_index){

	std::cout << "getPrimeAtIndex3" << endl;

	time_t first_time = time(NULL);
	time_t last_time = first_time;
	long i=0, iprint=1;


  long 
    bs = 2 * 3,
    next_bs = bs * 5,
    idx = 2,
    idx_stop = 0,
    idx_prime = p[idx];

  printf("while(p.size():%ld < target_index:%ld){\n",p.size(),target_index);

	while(p.size() < target_index){
    ++idx;
		long test_idx = idx;
		idx_stop  = p.size();
		idx_prime = p[idx];
		bs        = next_bs;
		next_bs   = bs * idx_prime;
		// long next_bs_stop = trunc(sqrt((double)next_bs)) + 1;

		std::cout << "  " << idx << " " << p[idx] << " len(p): " << len(p) << endl;

		printf("  for(long i=1; i<idx_prime:%ld; ++i) {/n",idx_prime);

		for(long i=1; i<idx_prime; ++i) {
				long inc = bs*i;
				long test_prime = 1 + inc;
				if( validate_prime_range(test_prime,p,idx) ){
						p.push_back(test_prime);
				}
				for( long j=idx; j<idx_stop; ++j ){
					test_prime = p[j] + inc;
					if(validate_prime_range(test_prime,p,idx)){
						p.push_back(test_prime);

						///////////////////////////
						if( ++i >= iprint ){
							// cout << i << endl;
							time_t this_time = time(NULL);
							if( this_time-last_time < 5 ){
								// cout << i << endl;
								// iprint = iprint * 2; //<<= 1;
								iprint <<= 1;
							}else{
								i=1;
								time_t diff_time = this_time-last_time; 
								if(diff_time>10){
									iprint >>= 1;
								}
								last_time=this_time;
								time_t total_time = last_time-first_time;
								std::cout.imbue(std::locale(""));
								cout <<        "index: " << primes.size() 
										<< "  test_prime: " << test_prime 
										<< "  diff: " << diff_time
										<< "  ip: " << iprint
										<< "  runtime: " << total_time/60 <<" minutes, " << total_time % 60 << " seconds" << endl;
							}
						}
						///////////////////////////


					}
				}
		}



		///////////////////////////
    return p[target_index];
	}

  int prime=-1;
  if (primes.size()>target_index){
    return primes[target_index];
  }
  for( 
    int test_prime = 11, chk_idx_stop = 2, chk_sqr = 25;
    primes.size()<target_index;
    test_prime += 2
  ) {
    if ( check_prime3(test_prime,chk_idx_stop,chk_sqr)){
      primes.push_back(test_prime);
    }
    test_prime += 4;
    if ( check_prime3(test_prime,chk_idx_stop,chk_sqr)){
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
            cout << "using " << target << endl;
        }
    }else{
      cout << "No command line args. Using " << target << endl;
    }
    cout << endl;
    cout << "Size of        int&: " << sizeof(int&)      << " bytes" << endl;
    cout << "Size of        int*: " << sizeof(int*)      << " bytes" << endl;
    cout << "Size of        bool: " << sizeof(bool)      << " bytes" << endl;
    cout << "Size of        char: " << sizeof(char)      << " byte" << endl;
    cout << "Size of       short: " << sizeof(short)     << " bytes" << endl;
    cout << "Size of         int: " << sizeof(int)       << " bytes" << endl;
    cout << "Size of        long: " << sizeof(long long) << " bytes" << endl;
    cout << "Size of   long long: " << sizeof(long long) << " bytes" << endl;
    cout << "Size of       float: " << sizeof(float)     << " bytes" << endl;
    cout << "Size of      double: " << sizeof(double)    << " bytes" << endl;
    cout << "Size of long double: " << sizeof(double)    << " bytes" << endl;
    cout << endl;

    auto the_prime = getPrimeAtIndex3(target);

    cout << endl;
    int ind=1;
    bool makeabreak=true;
    //auto p=primes;
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