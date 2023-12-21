import math

p = [2,3,5,7,11,13,17,19,23,29]

def getprime (target_prime_index:int)->int:
    print('target_prime_index: ', target_prime_index)

    if len(p) >= target_prime_index :
        return p[target_prime_index-1]
    
    lastPrime = p[ -1 ]
    test_prime = lastPrime+2
    while len(p) < target_prime_index:
        itIsPrime = True
        stop = math.ceil(math.sqrt(test_prime)) + 1

        for tp in p:
            if tp >= stop:
                break
            if test_prime % tp == 0:
                itIsPrime = False
                break

        if itIsPrime:
            p.append(test_prime)
            print('push next prime: ', test_prime)
            lastPrime = test_prime

        test_prime += 2

nums = []
nums.append(101)
# nums.append(10001)

for target in nums:
    val = getprime(target)
    print('target index:', target, 'value:',val)


