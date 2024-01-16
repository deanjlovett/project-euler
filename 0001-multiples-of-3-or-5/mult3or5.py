import math
import sys
#
#  first pass solution
#   get it done... even it is slow
#
def mult3or5(below:int)->int:
    sum = 0
    sum_03 = 0
    sum_05 = 0
    sum_15 = 0
    sum_x  = 0
    # print(f"inside def mult3or5(below:int == {below})->int:")
    # print(f"for i in range(below-1):{range(below)}")
    for i in range(below):
        if i % 3 == 0 or i % 5 == 0:
            sum += i
        #debug
        # if (i%3) == 0 :
        #     sum    += i
        #     sum_03 += i
        #     sum_x  += i
        # if (i%5) == 0 :
        #     sum    += i
        #     sum_05 += i
        #     sum_x  += i
        # if (i%15) == 0 :
        #     sum    -= i
        #     sum_15 += i
        #     sum_x  -= i
        #debug
    #debug
    # print(f"sum_03:{sum_03}")
    # print(f"sum_05:{sum_05}")
    # print(f"sum_15:{sum_15}")
    # print(f"sum_03+sum_05-sum_15:{((sum_03+sum_05)-sum_15)}")
    # print(f"               sum_x:{sum_x}")
    # print(f"                 sum:{sum}")
    return sum

#    // calc in constant time
#    //     sum = sum3 + sum5 - sum15; 
#    //  why?
#    //  sum3 will also include sum15
#    //  sum5 will also include sum15
#    //  we've double counted the sum15 items
#    //  just subtract that extra sum15
#    //
#    // int math.  division will truncate
#       c3 = (below-1)/3;          // count of div by 3 less than below
#     sum3 =  3 *  c3 * ( c3+1)/2; // n(n+1)/2
#
#       c5 = (below-1)/5;          // count of div by 5
#     sum5 =  5 *  c5 * ( c5-1)/2
#
#      c15 = (below-1)/5;          // count of div by 15
#    sum15 = 15 * c15 * (c15-1)/2;
#
#    let's calc for below 31
#       c3 = (below-1)/3              = (31-1)/3 = 30/3                =  10
#     sum3 =  3 *  c3 * ( c3 + 1)/2   = 3*(10*(10+1)/2 = 3*10*11/2     = 165
#       c5 = (below-1)/5              = (31-1)/5 = 30/5                =   6
#     sum5 =  5 *  c5 * ( c5 + 1)/2   = 5 * 6 * (6 + 1) = 30 * 7       = 210
#      c15 = (below-1)/5              = (31-1)/15 = 30/15              =   2 
#    sum15 = 15 * c15 * (c15 + 1)/2   = 15 * 2 * (2 + 1) / 2 = 15 * 3 =   45
#
#
#                    1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
#        div by  3         3        6        9       12       15       18       21       24       27       30
#        div by  5               5             10             15             20             25             30   
#        div by 15                                            15                                           30
#    div by 3 or 5         3     5  6        9 10    12       15       18    20 21       24 25    27       30
#
#    sum3or5 = sum3 + sum5 - sum15; 

def sum_nto1(n:int)->int: # n(n+1)/2 == sum of n..1
    return (n*(n+1))//2

def fast_mult3or5(below:int)->int:
    #print(f"inside mult3or5_fast(below:int == {below})")
    mb = below-1

    c3    =  mb // 3       # count of div by 3 less than below
    c5    =  mb // 5       # count of div by 5
    c15   =  mb // 15      # count of div by 15
    sum3  =  3 * sum_nto1( c3)
    sum5  =  5 * sum_nto1( c5)
    sum15 = 15 * sum_nto1(c15)

    return sum3 + sum5 - sum15 

    # c3    =      math.trunc( (below-1) /  3 )      # count of div by 3 less than below
    # sum3  =  3 * math.trunc( c3 * ( c3+1)/2 ); # n(n+1)/2 == sum of n..1
    # c5    =      math.trunc( (below-1) /  5 )      # count of div by 5
    # sum5  =  5 * math.trunc((c5 * (c5+1))/2 ) # n(n+1)/2 == sum of n..1
    # c15   =      math.trunc( (below-1) / 15 )      # count of div by 15
    # sum15 = 15 * math.trunc(c15 * (c15+1)/2 )  # n(n+1)/2 == sum of n..1

def fizzbuzz(stop:int) -> None :
    print("FizzBuzz time !!!")
    print()
    for n in range(stop+1):
        s = ""
        if n%3==0:
            s = "Fizz"
        if n%5==0:
            s += "Buzz"
        if len(s)==0:
            s = str(n)
        print(s)

def fizzbuzz_simple(stop:int) -> None :
    print("FizzBuzz time !!!")
    print()
    for n in range(stop+1):
        b3 = n%3==0
        b5 = n%5==0
        if b3 and b5:
            print("FizzBuzz") 
        elif b3:
            print("Fizz")
        elif b5:
            print("Buzz")
        else:
            print(str(n))


def do_mult3or5_stuff(below):
    r_mult3or5      =      mult3or5(below)
    r_fast_mult3or5 = fast_mult3or5(below)
    print()
    print(f"Find the sum of all the multiples of 3 or 5 below {below}")
    print()
    print(f"slow O(n) method: {r_mult3or5}" )
    print()
    print(f"fast O(c) method: {r_fast_mult3or5}" )
    print()
    print(f"fast-slow methods: {r_fast_mult3or5-r_mult3or5}" )
    print()

def print_usage():
    print()
    print(f"usage: mult3or5 [--fizzbuzz] [some number]")
    print()
    print("  if fizzbuzz flag then pring standard fizzbuzz for 'some number'")
    print("  else print the sum of all the multiples of 3 or 5 below 'some number'")
    print()
    print("  if [some number] is not provided, 1000 will be used.")
    print()
    exit(0)


below = 1000
if len(sys.argv) == 1:
    do_mult3or5_stuff(below)

else: #  len(sys.argv) > 1:
    argone = sys.argv[1].lower()

    if argone.isdigit():
        below = int(argone)
        do_mult3or5_stuff()

    elif argone in ["-f","--fb","--fizzbuzz"]:
        if len(sys.argv)>2 and sys.argv[2].isdigit:
            fizzbuzz(int(sys.argv[2]))
        else:
            fizzbuzz(below)

    else:
        print_usage()
        # print()
        # print(f"argument '{argone}' is not a number or parsable as a number. Using {below}")
        # if argone in ["-?","-h","--help"]:
    
