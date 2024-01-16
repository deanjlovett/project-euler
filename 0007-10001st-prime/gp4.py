import math
import sys

p = [2,3,5,7,11,13,17,19,23,29]
# p = [2,3,5]

#        0 1 2
# p = [  2,3,5]
#      1     5
# 
#              6=2*3
#
# check for 5 *= 5 
# check for 25
# largest possible test prim = 2*3*5 = 30
#
#              6+1, 6+5
#                7   11
#                       12+1, 12+5
#                         13    17
#                                  18+1, 18+5
#                                    19    23
#                                             24+1, 24+5
#                                               25    29
#                                               ^^
# check for 25 *= 5 
# check for 125
#
# last possible prime 29 = 2*3*5-1= 30-1
#           0 1 2 3  4  5  6  7  8  9
#    p = [  2,3,5,7,11,13,17,19,23,29]
#         1       7,11,13,17,19,23,29]
#
#   30=2*3*5
# check for 7 *= 7 
# check for 49
# largest possible test prim = 2*3*5*7 = 210
#
#           30+1, ... , 30+19, ... , 30+29
#             31           49           59
#                          ^^
# check for  49 *= 7 
# check for 343
#
# last possible prime 209 = 2*3*5*7-1= 210-1
#           0 1 2 3  4  5  6  7  8  9
#    p = [  2,3,5,7,11,13,17,19,23,29 ... 209
#         1         11,13,17,19,23,29 ... 209 
# 11, 121, 1331
#
# last possible prime 2309 = 2*3*5*7*11-1= 2310-1
#           0 1 2 3  4  5  6  7  8  9
#    p = [  2,3,5,7,11,13,17,19,23,29 ... 2309
#         1            13,17,19,23,29 ... 2309
# 13, 169, 2197
#

def validate_prime_list(p:list[int]) -> bool:
    largest_prime = p[-1]
    large_stop = math.ceil(math.sqrt(float(largest_prime))) + 1
    for n in p[2:]:
        stop = math.ceil(math.sqrt(float(n))) + 1
        for test in p[:-1]:
            if test>stop:
                break
            if n%test==0:
                print("n:",n,"is divisible by:",test,", n%test ==",n%test)
                return False
    return True

def validate_prime_range(pos_prime:int, p:list[int], idx:int) -> bool:
    # print("=================================================")
    # print(f"inside validate_prime_range(pos_prime:{pos_prime},p[],idx:{idx}")
    # print(p)
    # stop = math.floor(math.sqrt(float(pos_prime)))
    stop = math.ceil( math.sqrt( float(pos_prime) ) )
    # ret = True
    for n in p[idx:]:
        # print("    -----------------------------")
        # print(f"   n:{n}, stop:{stop}")
        if n>stop:
            return True
            #return ret
        if pos_prime % n == 0 :
            # print(f"   n:{n}, stop:{stop}, {pos_prime} is not prime")
            return False
            #ret = False
        # print(f"   n:{n}, stop:{stop}")
    return True
    # return ret




def getprime (target_prime_index:int)->int:
    print('target_prime_index: ', target_prime_index)

    if len(p) >= target_prime_index :
        return p[target_prime_index-1]
    #    0 1 2 3  4  5  6  7  8  9
    # p = [2,3,5,7,11,13,17,19,23,29]
    #    1     7,11,13,17,19,23,29]
    bs = 2*3
    next_bs = bs*5
    idx = 2
    idx_stop = 0 #
    idx_prime = p[idx]
    filter = 1

    while len(p) < target_prime_index:
        idx += 1
        test_idx = idx
        idx_stop = len(p)
        idx_prime = p[idx]
        bs        = next_bs
        next_bs = bs * idx_prime
        next_bs_stop = math.ceil(math.sqrt(next_bs)) + 1

        print(idx, p[idx], "len(p):",len(p))

        filter = p[idx] * p[test_idx]
        for i in range(1,idx_prime):
            inc = bs*i
            test_prime = 1 + inc
            if validate_prime_range(test_prime,p,idx):
                p.append(test_prime)
            for j in range(idx,idx_stop):
                test_prime = p[j] + inc
                if validate_prime_range(test_prime,p,idx):
                    p.append(test_prime)
    return p[target_prime_index]

nums = []

if len(sys.argv)>1:
    if sys.argv[1].isdigit():
        nums.append(int(sys.argv[1]))
else:
    nums.append(11)
# nums.append(10001)

for target in nums:
    val = getprime(target)
    print(' target index:', target, 'value:',val)
    print('largest index:', len(p)-1, 'value:', p[-1])
    print()
    # print(p)
    print()
    print("vailidating prime list")
    if validate_prime_list(p):
        print("validated!")


