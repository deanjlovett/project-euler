#include <cmath>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <list>
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
/* 
  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16 
  0 --------------------- 6
          2   3       5    
      1               5    
  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
          2   3       5       7              11      13              17      19              23                      29 
      1                       7              11      13              17      19              23                      29 

  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
  0  31  32  33  34  35  36  37  38  39  40  41  42  43  44  45  46  47  48  49  50  51  52  53  54  55  56  57  58  59  60
  0  61   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
  0  91   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
  0 121   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
  0 151   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30
  0 181   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30

      1                       7              11      13              17      19              23                      29 
     31                      37              41      43              47     _49_             23                      29 
     61                      67              71      73             _77_     79              83                      89 
    _91_                     97             101     103             107     109             113                    _119_ 
   _121_                    127             131    _133_            137     139            _143_                     149 
      1                     157            _161_    163             167     169              23                     179 
      1                    _187_            191     193             197     199            _203_                    209 

210 / 7 = 30
 7 x  7 =  49
 7 x 11 =  77
 7 x 13 =  91
 7 x 17 = 119
 7 x 19 = 133
 7 x 23 = 161
 7 x 29 = 203

210 / 11 = 19.09
11 x 11 = 121
11 x 13 = 143
11 x 17 = 187

210 / 13 = 16.15
13 x 13 = 169
*/
std::vector<long> p = {2,3,5,7,11,13,17,19,23,29};
long last_idx=0;

size_t len(std::vector<long> mv) { return mv.size();}

// bool validate_prime_range( long test_prime, long idx ){
// bool validate_prime_range( long test_prime, long idx, long &chk_idx_stop, long &chk_sqr ){

bool validate_prime_range( long test_prime, long idx, long &last_idx, long &chk_stop ){
	chk_stop = trunc( sqrt( (double)test_prime ) )+1;

	vector<long>::iterator it;
  last_idx = idx;
	for( it = p.begin()+idx; it != p.end(); ++it,++last_idx){
		if(                  *it  > chk_stop ) return true;
		else if( test_prime % *it == 0    ) return false;
	}
	return true;

  // while(chk_sqr <= test_prime){
  //   ++chk_idx_stop;
  //   chk_sqr = primes[chk_idx_stop+1];
  //   chk_sqr *= chk_sqr;
  // }

	// vector<long>::iterator it;
  // long j = idx;
	// for( it = p.begin()+idx; it != p.end(); ++it, ++j ){
	// 	if(           j > chk_idx_stop ) { return  true; }
	// 	else if( test_prime % *it == 0 ) { return false; }
	// }
	// return true;
}

std::string getPrimeAsHex(long prev, long curr) {
  std::string ret;
  const long mask=0xff;
  const char* arr = "0123456789abcdef_";
  long work=curr;
  long last=prev;
  int extra = 0;
  int lc = 1;
  while(work>0){
    if( (work & mask) < (last & mask) ) extra=lc;
    ++lc;
    
    long right =      work & 0x000f;
    long left  = (work>>4) & 0x000f;
    work >>= 8;
    last >>= 8;
    char marr[5]="  ZZ";
    // marr[0] = ' ';
    // marr[1] = ' ';
    marr[2] = arr[left];
    marr[3] = arr[right];
    // marr[4] = 0;
    // snprintf(marr,5,"  %c%c",arr[left],arr[right]);
    ret = marr + ret;
  }
  for(int i=0;i<extra;++i) ret += " <<";
  return ret;
}

long getPrimeAtIndex3(long target_index){

	std::cout << "getPrimeAtIndex3" << endl;
	std::cout << "target_index: " << target_index << endl;

	time_t first_time = time(NULL);
	time_t last_time = first_time;
	long i=0, iprint=1;

  long 
    bs = 2 * 3,
    next_bs = bs * 5,
    idx = 2,
    idx_stop = 0,
    idx_prime = p[idx];

  // long 
  //   chk_idx_stop = -1, 
  //   chk_sqr = 4;
  // long last_idx=-1,chk_stop=0;
  last_idx=-1;
  long chk_stop=0;

  // chk_idx_stop,chk_sqr
  long k=1,kprint=1;

  // printf("while(p.size():%ld < target_index:%ld){\n\n",p.size(),target_index);

  // ofstream bfile;
  // bfile.open("0000.ppb2",ios::binary);
  //
  // loop through and print out the the last 2 bytes of each prime.
  //


	while(p.size() < target_index){
    // printf("while(p.size():%ld < target_index:%ld){\n",p.size(),target_index);

    // printf("  top of while( p.size():%ld < target_index:%ld)\n",p.size(),target_index);
    // std::cout << "  idx:" << idx << endl << endl;

    string sfilename="primes";
    for(int i=0;i<=idx;++i){
      sfilename += "." + std::to_string(p[i]);
    }
    sfilename += ".txt";

    ofstream ofile;
    ofile.open(sfilename,ios::out);
    ofile << "# of primes: " << p.size() << endl;
    long prev = 0;
    for(long curr : p){
      ofile << std::to_string(curr) << "    " << getPrimeAsHex(prev,curr) << endl;
      prev = curr;
    }
    ofile.close();

    ++idx;
		long test_idx = idx;
		idx_stop  = p.size();
		idx_prime = p[idx];
		bs        = next_bs;
		next_bs   = bs * idx_prime;
		// long next_bs_stop = trunc(sqrt((double)next_bs)) + 1;
    cout << endl;
    printf("  test_idx:%ld = idx:%ld\n",test_idx, idx);
		printf("  idx_stop  = p.size(),       %ld  %ld\n",idx_stop,  p.size() );
		printf("  idx_prime = p[idx],         %ld  %ld\n",idx_prime,  p[idx] );
		printf("  bs        = next_bs,        %ld  %ld\n",bs, next_bs );
		printf("  next_bs   = bs * idx_prime, %ld  %ld\n\n",next_bs, bs * idx_prime );


		// std::cout << "  " << idx << " " << p[idx] << " len(p): " << len(p) << endl;

		// printf("  for(long i=1; i<idx_prime:%ld; ++i) {\n",idx_prime);

		for(long i=1; i<idx_prime; ++i) {
		    // printf("\n    i:%ld < idx_prime:%ld\n\n",i,idx_prime);
				long inc = bs*i;
				long test_prime = 1 + inc;
        // printf("    inc:%ld  test_prime:%ld\n",inc,test_prime);

				if( validate_prime_range(test_prime,idx,last_idx,chk_stop) ){
						p.push_back(test_prime);
            // cout << "        prime push:"<<test_prime <<endl;
				}
        // printf("    for( long j=idx:%ld; j<idx_stop:%ld; ++j ){\n",idx,idx_stop);
				for( long j=idx; j<idx_stop; ++j ){
					test_prime = p[j] + inc;
          // printf("\n      j:%ld  p[j]:%ld  inc:%ld  test_prime:%ld\n\n",j,p[j],inc,test_prime);
					if(validate_prime_range(test_prime,idx,last_idx,chk_stop)){
						p.push_back(test_prime);
            // cout << "        prime push:"<<test_prime <<endl;

						///////////////////////////
						if( ++k >= kprint ){
							// cout << "  k:"<< k << "  kprint:" << kprint << endl;
							time_t this_time = time(NULL);
							if( this_time-last_time < 5 ){
                // cout << endl;
								// cout << "  this_time-last_time = " << this_time-last_time << " < 5 ...  i: " << i << endl;
                // cout << "  kprint = " << kprint << "    kprint <<= 1" << endl;
								//iprint = iprint * 2; //<<= 1;

								kprint <<= 1;
                // cout << "  kprint = " << kprint << endl;

							}else{
                // cout << endl;
								// cout << "this_time-last_time = " << this_time-last_time << " >= 5" << endl;
								k=1;
								time_t diff_time = this_time-last_time; 
								if(diff_time>10){
									kprint >>= 1;
								}
								last_time=this_time;
								time_t total_time = last_time-first_time;
								std::cout.imbue(std::locale(""));
								cout <<"primes size: " << p.size();
								cout << "  test_prime: " << test_prime // last_idx,chk_stop
                    << "  idx: " << idx << "  " << p[idx] << " " << i << " " << j << "  lidx: " << last_idx << "  kstop: " << chk_stop 
                    // << "  idx: " << idx << "  chk_idx_stop: " << chk_idx_stop
										<< "  tdiff:" << diff_time
										<< "  kp: " << kprint;
                printf("  rt: %ld days, %02ld:%02ld:%02ld", total_time/3600/24, (total_time/3600)%24, (total_time/60)%60, total_time % 60);
                cout << endl;

										// << "  runtime: " << total_time/3600 <<" hours, "<< (total_time/60)%60 <<" minutes, " << total_time % 60 << " seconds" << endl;
							}
						}
						///////////////////////////


					}
          // cout << "     for( long j=idx; j<idx_stop; ++j ) <<<< END of loop: j:" << j << " < idx_stop:" << idx_stop << endl;
				}
        // cout << "     for( long j=idx; j<idx_stop; ++j ) <<<< exited the loop.  idx_stop:" << idx_stop << endl;
        // cout << "  for(long i=1; i<idx_prime; ++i) <<<< END of loop:  i:" << i << " < idx_prime:" << idx_prime<<  endl;
		}
    // cout << "  for(long i=1; i<idx_prime; ++i) <<<< exited the loop.  idx_prime:" << idx_prime <<  endl;
    // cout << endl;
    // cout << "  p.size():" << p.size() << " ?< target_index:" << target_index << endl;




		///////////////////////////
    //return p[target_index];
    // cout << "while(p.size() < target_index){ <<<< END of loop" << endl;
	}

  // int prime=-1;
  // if (primes.size()>target_index){
  //   return primes[target_index];
  // }
  // for( 
  //   int test_prime = 11, chk_idx_stop = 2, chk_sqr = 25;
  //   primes.size()<target_index;
  //   test_prime += 2
  // ) {
  //   if ( check_prime3(test_prime,chk_idx_stop,chk_sqr)){
  //     primes.push_back(test_prime);
  //   }
  //   test_prime += 4;
  //   if ( check_prime3(test_prime,chk_idx_stop,chk_sqr)){
  //     primes.push_back(test_prime);
  //   }
  // }
  return p[target_index];
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
    cout << "the target index: " << target << endl; 
    cout << "the target prime: " << the_prime << endl;
    cout << endl;

    string sfilename="primes";
    for(int i=0;i<=last_idx;++i){
      sfilename += "." + std::to_string(p[i]);
    }
    sfilename += ".txt";

    ofstream ofile;
    ofile.open(sfilename,ios::trunc);
    ofile << "# of primes: " << p.size() << endl;
    for(long l : p){
      ofile << std::to_string(l) << endl;
    }
    ofile.close();


    long ind=1;
    long end=p.size();
    bool makeabreak=true;
    //auto p=primes;
    for( auto it=p.begin(); it != p.end(); ++it,++ind){
        // if( ind<6 || (target-ind)<6 ){
        if( ind<7 || (end-ind)<6 ){
            cout << "  p[ " << ind << " ]: " << *it << endl;
        }
        else if( makeabreak ) {
            makeabreak = false;
            cout << endl;
        }
    }
    return 0;
}