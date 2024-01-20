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

// notes to myself about adding a dynamic array
//
// stolen from this post:
// https://stackoverflow.com/questions/3536153/c-dynamically-growing-array

typedef struct {
  int *array;
  size_t used;
  size_t size;
} Array;

void initArray(Array *a, size_t initialSize) {
  a->array = malloc(initialSize * sizeof(int));
  a->used = 0;
  a->size = initialSize;
}

void insertArray(Array *a, int element) {
  // a->used is the number of used entries, because a->array[a->used++] updates a->used only *after* the array has been accessed.
  // Therefore a->used can go up to a->size 
  if (a->used == a->size) {
    a->size *= 2;
    a->array = realloc(a->array, a->size * sizeof(int));
  }
  a->array[a->used++] = element;
}

void freeArray(Array *a) {
  free(a->array);
  a->array = NULL;
  a->used = a->size = 0;
}
// Using it is just as simple:
//
Array a;
int i;

initArray(&a, 5);  // initially 5 elements
for (i = 0; i < 100; i++) {
  insertArray(&a, i);  // automatically resizes as necessary
}
printf("%d\n", a.array[9]);  // print 10th element
printf("%d\n", a.used);  // print number of elements
freeArray(&a);